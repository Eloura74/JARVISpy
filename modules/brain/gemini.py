from google import genai
from google.genai import types
from typing import List, Dict, Any

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
        self.model_name = "gemini-2.5-flash"
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
        """Appel asynchrone sécurisé à l'API Gemini."""
        if not self.chat_session:
            return "Désolé Monsieur, mon système cognitif est hors ligne."

        import asyncio
        
        def blocking_call():
            # Le SDK gère l'aller-retour complet avec les fonctions automatiquement
            response = self.chat_session.send_message(text)
            
            # Archivage dans la mémoire à long terme
            memory.store_message(role="user", content=text)
            memory.store_message(role="assistant", content=response.text)
            
            # Enregistrement dans le buffer contextuel
            context_buffer.record(action=text[:60])
            
            return response.text
            
        return await asyncio.to_thread(blocking_call)

    def start(self):
        """Abonne le cerveau aux flux d'événements (Voix, UI, WebSocket)."""
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        bus.subscribe("ws.ui.text_input", self._handle_user_input)
        logger.info("Cerveau J.A.R.V.I.S. à l'écoute.")

# Instance globale
brain_instance = Brain()
