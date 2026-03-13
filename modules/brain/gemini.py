from google import genai
from google.genai import types
from typing import List, Dict, Any, Optional
import base64
import asyncio

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus
from modules.memory.manager import memory
from modules.memory.context import context_buffer

# Import des nouveaux modules de JARVIS
from modules.brain.tools import JARVIS_TOOLS, TOOLS_MAPPING
from modules.brain.prompts import get_system_instruction

logger = get_logger("brain.gemini")

class Brain:
    """
    Le cerveau de l'assistant J.A.R.V.I.S.
    Orchestre les appels à Gemini 3.1 Flash-Lite (Async via .aio) et l'exécution automatique des outils.
    """
    
    def __init__(self):
        self.model_name = "gemini-3.1-flash-lite-preview"
        self.client: Optional[genai.Client] = None
        self.chat_session: Any = None
        self._is_ready = asyncio.Event()

    async def _setup(self):
        """Initialisation asynchrone de la session via l'interface .aio du client."""
        if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
            logger.error("Clé API Gemini manquante.")
            return

        try:
            # 1. Client Standard (contient l'interface .aio)
            self.client = genai.Client(api_key=settings.gemini_api_key)
            
            # 2. Session Async via client.aio
            # Note: chats.create renvoie un objet AsyncChat, il ne faut pas l'awaiter.
            self.chat_session = self.client.aio.chats.create(
                model=self.model_name,
                history=[],
                config=types.GenerateContentConfig(
                    system_instruction=get_system_instruction(),
                    temperature=0.7,
                    tools=JARVIS_TOOLS,
                    automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True)
                )
            )
            self._is_ready.set()
            logger.info(f"Cerveau J.A.R.V.I.S (Async .aio) prêt : {self.model_name}.")
        except Exception as e:
            logger.error(f"Erreur fatale d'initialisation du Cerveau : {e}")

    async def reset_session(self):
        """Réinitialise la session de communication."""
        logger.info("Réinitialisation de la session...")
        self._is_ready.clear()
        await self._setup()

    async def _handle_user_input(self, payload: Dict[str, Any]):
        """Callback asynchrone pour les entrées utilisateur."""
        text = payload.get("text", "")
        if not text: return
            
        logger.info(f"[BRAIN] Requête reçue : {text}")
        asyncio.create_task(self._process_cognition(text))

    async def _process_cognition(self, text: str):
        """Pipeline de pensée asynchrone."""
        await bus.emit("brain.thinking", {"status": True})
        
        try:
            response_text = await self._generate_response(text)
            if response_text:
                await bus.emit("brain.response_generated", {"text": response_text})
        except Exception as e:
            logger.error(f"[BRAIN] Échec cognitif : {e}")
            await bus.emit("brain.error", {"error": str(e)})
        finally:
            await bus.emit("brain.thinking", {"status": False})

    async def _generate_response(self, text: str) -> str:
        """Génération multi-modale en streaming avec support AFC (Async)."""
        if not self._is_ready.is_set():
            logger.warning("[BRAIN] Attente de l'initialisation de la session...")
            await asyncio.wait_for(self._is_ready.wait(), timeout=10.0)

        # 1. RAG (Contextual Context)
        semantic_context = await memory.get_relevant_context(text)
        if semantic_context:
            logger.debug(f"[BRAIN] Contexte RAG récupéré (tronqué): {semantic_context[:300]}...")
        
        current_input = f"{text}\n\n[CONTEXTE MÉMOIRE]\n{semantic_context}" if semantic_context else text
        
        while True:
            full_text = ""
            current_sentence = ""
            last_tool_output = None
            
            # Liste des appels d'outils demandés par Gemini dans cette passe
            pending_tool_calls = []

            # Tentatives de reconnexion en cas de 503/429 (Saturation API)
            max_retries = 5
            for attempt in range(max_retries):
                try:
                    logger.debug(f"[BRAIN] Streaming (.aio) vers {self.model_name} (Tentative {attempt+1}/{max_retries})...")
                    
                    # Flux asynchrone Gemini avec Circuit Breaker (Timeout)
                    stream = await asyncio.wait_for(
                        self.chat_session.send_message_stream(current_input), 
                        timeout=15.0
                    )
                    async for chunk in stream:
                        if getattr(chunk, 'text', None):
                            txt = chunk.text
                            full_text += txt
                            current_sentence += txt
                            
                            # STREAMING DÉSACTIVÉ pour fluidité maximale
                            # On accumule tout et on envoie uniquement la phrase complète à la fin
                        
                        # Récupération MANUELLE des appels d'outils demandés par le LLM
                        if getattr(chunk, 'function_calls', None):
                            for fc in chunk.function_calls:
                                pending_tool_calls.append(fc)
                    
                    # Si on arrive ici, le flux s'est terminé avec succès
                    break

                except asyncio.TimeoutError:
                    logger.warning(f"[BRAIN] Timeout (15s) de l'API Gemini. Nouvelle tentative...")
                    if attempt < max_retries - 1:
                        wait_time = (attempt + 1) * 3
                        await asyncio.sleep(wait_time)
                        continue
                    return "Désolé Monsieur, les serveurs cognitifs ne répondent pas. J'ai annulé l'opération pour éviter de bloquer le système."
                except Exception as e:
                    err_str = str(e)
                    if "503" in err_str or "429" in err_str or "Service Unavailable" in err_str:
                        if attempt < max_retries - 1:
                            wait_time = (attempt + 1) * 3 # 3s, 6s, 9s, 12s...
                            logger.warning(f"[BRAIN] API saturée ({err_str[:50]}). Nouvelle tentative dans {wait_time}s...")
                            await asyncio.sleep(wait_time)
                            continue
                    
                    logger.error(f"[BRAIN] Erreur critique durant le streaming : {e}")
                    return "Désolé Monsieur, les serveurs de pensée sont actuellement saturés. Veuillez retenter votre commande dans quelques secondes."

            # --- TRAITEMENT POST-STREAMING ET OUTILS MANUELS ---
            if pending_tool_calls:
                tool_responses = []
                for fc in pending_tool_calls:
                    func_name = fc.name
                    args = dict(fc.args) if fc.args else {}
                    logger.info(f"[BRAIN] 🔧 Exécution manuelle de l'outil : {func_name}")
                    
                    try:
                        func = TOOLS_MAPPING.get(func_name)
                        if not func:
                            logger.error(f"[BRAIN] Outil inconnu : {func_name}")
                            res = f"Erreur: Outil {func_name} non trouvé dans J.A.R.V.I.S."
                        else:
                            if asyncio.iscoroutinefunction(func):
                                res = await func(**args)
                            else:
                                res = await asyncio.to_thread(func, **args)
                            logger.info(f"[BRAIN] ✅ Résultat de {func_name} obtenu.")
                            
                        # Interception spéciale pour la Vision (qui renvoie un dict d'image bypassant le LLM texte standard)
                        if isinstance(res, dict) and res.get("type") == "image_data":
                            last_tool_output = res
                            tool_responses.append(types.Part.from_function_response(name=func_name, response={"status": "Image capturée, analyse en cours"}))
                        else:
                            # Conversion sécurisée en dictionnaire pour eviter les erreurs de sérialisation API
                            safe_res = {"result": res} if not isinstance(res, dict) else res
                            tool_responses.append(types.Part.from_function_response(name=func_name, response=safe_res))
                    except Exception as e:
                        logger.error(f"[BRAIN] Erreur exécution outil {func_name}: {e}")
                        tool_responses.append(types.Part.from_function_response(name=func_name, response={"error": str(e)}))
                
                # S'il y a une capture visuelle, on redirige l'input, sinon on pousse les retours de fonctions
                if last_tool_output:
                    logger.info("[BRAIN] Passage en mode analyse visuelle...")
                    image_part = types.Part.from_bytes(
                        data=base64.b64decode(last_tool_output["data"]),
                        mime_type=last_tool_output["mime_type"]
                    )
                    current_input = [image_part, "Analyse cette image pour répondre à ma commande initiale."]
                else:
                    # On injecte les retours de fonctions comme prochain message
                    current_input = tool_responses
                
                # On boucle pour que le LLM lise ces retours et finalise sa phrase
                continue

            # --- SI AUCUN OUTIL N'A ÉTÉ APPELÉ, LA PHRASE EST TERMINEE ---
            # STREAMING COMPLÈTEMENT DÉSACTIVÉ - on envoie la phrase complète d'un coup
            if full_text.strip():
                await bus.emit("brain.stream_fragment", {"text": full_text.strip()})
            
            if full_text:
                memory.store_message(role="user", content=text)
                memory.store_message(role="assistant", content=full_text)
            
            return full_text

    def start(self):
        """Lance l'initialisation et s'abonne aux événements."""
        asyncio.create_task(self._setup())
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        bus.subscribe("ws.ui.text_input", self._handle_user_input)
        logger.info("Cerveau J.A.R.V.I.S. en cours d'activation...")

# Instance globale
brain_instance = Brain()
