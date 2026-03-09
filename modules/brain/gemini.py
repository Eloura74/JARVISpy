from google import genai
from google.genai import types
from typing import List, Dict, Any
import base64

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus
from modules.memory.manager import memory
from modules.memory.context import context_buffer

# Import des nouveaux modules de JARVIS
from modules.brain.tools import JARVIS_TOOLS
from modules.brain.prompts import get_system_instruction

logger = get_logger("brain.gemini")

class Brain:
    """
    Le cerveau de l'assistant J.A.R.V.I.S.
    Orchestre les appels à Gemini 2.5 Flash et l'exécution automatique des outils.
    """
    
    def __init__(self):
        # self.model_name = "gemini-2.5-flash"
        self.model_name = "gemini-3.1-flash-lite-preview"
        self.client = None
        self.chat_session = None
        self._setup()

    def _setup(self):
        """Initialise la session de chat avec les instructions et les outils."""
        if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
            logger.error("Clé API Gemini manquante dans la configuration.")
            return

        try:
            # Construction des instructions système dynamiques (incluant la mémoire)
            system_instruction = get_system_instruction()
            
            # Initialisation du client Google GenAI
            self.client = genai.Client(api_key=settings.gemini_api_key)
            
            # Configuration de la session de chat avec AFC (Automatic Function Calling)
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                history=[],
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.7,
                    tools=JARVIS_TOOLS # Utilisation de la liste centralisée
                )
            )
            logger.info(f"Cerveau J.A.R.V.I.S initialisé avec {self.model_name} (AFC Actif).")
            
        except Exception as e:
            logger.error(f"Erreur d'initialisation du Cerveau : {e}")

    def reset_session(self):
        """Réinitialise la session pour nettoyer le contexte accumulé."""
        logger.info("Réinitialisation de la session de communication...")
        self._setup()

    async def _handle_user_input(self, payload: Dict[str, Any]):
        """Gère l'entrée texte (depuis STT ou UI) et émet la réponse."""
        text = payload.get("text", "")
        if not text: return
            
        logger.info(f"Analyse de la requête : {text}")
        await bus.emit("brain.thinking", {"status": True})
        
        try:
            response_text = await self._generate_response(text)
            await bus.emit("brain.response_generated", {"text": response_text})
        except Exception as e:
            logger.error(f"Erreur de traitement cognitif : {e}")
            await bus.emit("brain.error", {"error": str(e)})
        finally:
            await bus.emit("brain.thinking", {"status": False})

    async def _generate_response(self, text: str) -> str:
        """Appel multi-modal avec injection de contexte sémantique (RAG)."""
        if not self.chat_session:
            return "Désolé Monsieur, mon système cognitif est hors ligne."

        import asyncio
        import json
        
        # 1. Récupération du contexte sémantique (souvenirs liés à la requête)
        semantic_context = await memory.get_relevant_context(text)
        enriched_query = text
        if semantic_context:
            enriched_query = f"{text}\n\n[CONTEXTE MÉMOIRE]\n{semantic_context}"

        def interaction_loop():
            # Initialisation avec l'entrée utilisateur (éventuellement enrichie)
            current_input = enriched_query
            
            while True:
                response = self.chat_session.send_message(current_input)
                
                # Vérification si un outil a renvoyé une image (Vision)
                # Le SDK gère l'exécution des outils, mais si l'un d'eux renvoie 
                # un JSON spécifique 'image_data', nous devons relancer un tour multi-modal.
                
                last_tool_output = None
                try:
                    # On fouille dans les parts de la réponse pour voir si un outil a parlé
                    for part in response.candidates[0].content.parts:
                        if hasattr(part, 'function_response') and part.function_response:
                            res = part.function_response.response
                            if isinstance(res, dict) and res.get("type") == "image_data":
                                last_tool_output = res
                except:
                    pass

                if last_tool_output:
                    # Tour multi-modal : on envoie l'image en tant que contenu
                    logger.info("Traitement d'une donnée visuelle reçue par un outil...")
                    image_part = types.Part.from_bytes(
                        data=base64.b64decode(last_tool_output["data"]),
                        mime_type=last_tool_output["mime_type"]
                    )
                    current_input = [image_part, "Analyse cette image pour répondre à ma commande initiale."]
                    continue # On boucle pour envoyer l'image
                
                # Sinon, c'est une réponse textuelle finale
                final_text = response.text
                
                # Archivage
                memory.store_message(role="user", content=text)
                memory.store_message(role="assistant", content=final_text)
                return final_text
            
        return await asyncio.to_thread(interaction_loop)

    def start(self):
        """Abonne le cerveau aux flux d'événements (Voix, UI, WebSocket)."""
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        bus.subscribe("ws.ui.text_input", self._handle_user_input)
        logger.info("Cerveau J.A.R.V.I.S. à l'écoute.")

# Instance globale
brain_instance = Brain()
