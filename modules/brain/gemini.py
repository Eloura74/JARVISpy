from google import genai
from google.genai import types
from typing import List, Dict, Any

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("brain.gemini")

class Brain:
    """
    Le cerveau de l'assistant, propulsé par Gemini 2.5 Flash via la nouvelle API google-genai.
    """
    def __init__(self):
        self.model_name = "gemini-2.5-flash"
        self.system_instruction = (
            "Tu es J.A.R.V.I.S., l'intelligence artificielle personnelle. "
            "Tu es formel, professionnel, très respectueux et tu as un léger flegme britannique (un très léger sarcasme amical autorisé). "
            "Tu vouvoies toujours l'utilisateur et l'appelles 'Monsieur'. "
            "RÈGLE ABSOLUE: Tes réponses doivent être EXTRÊMEMENT COURTES (1 à 2 phrases maximum) pour économiser la bande passante et les tokens. "
            "Va droit au but. N'esquisse jamais de longues listes ou d'explications superflues sauf si le mot 'détaille' est prononcé."
        )
        self.client = None
        self.chat_session = None
        self._setup()

    def _setup(self):
        """Initialise le modèle Gemini API avec les outils systèmes"""
        if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
            logger.error("Clé API Gemini manquante. Le Brain ne fonctionnera pas correctement.")
            return

        try:
            from modules.system.windows import (
                find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
                get_system_time, get_battery_status,
                list_directory, read_file, write_to_file, open_file_or_url
            )
            from modules.system.web import interactive_web_search, close_web_results
            
            # Mise à jour des instructions pour indiquer qu'il maîtrise les fenêtres et la correction STT
            self.system_instruction += (
                " Tu as le pouvoir absolu sur le système Windows. Tu peux trouver et 'ouvrir', 'fermer', "
                "'réduire', 'agrandir' et 'déplacer' les fenêtres des applications. "
                "CRITIQUE: Le module de transcription vocale fait souvent des erreurs phonétiques (ex: 'Fadila' pour 'FileZilla', "
                "'winter me' pour 'WindTerm', 'codex' pour 'VS Code'). UTILISE TON INTELLIGENCE pour DÉDUIRE le vrai "
                "nom du logiciel voulu et envoie LE BON NOM (corrigé) aux appels de fonctions."
            )
            
            self.client = genai.Client(api_key=settings.gemini_api_key)
            
            # Démarrage d'une session de chat pour conserver l'historique
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                config=types.GenerateContentConfig(
                    system_instruction=self.system_instruction,
                    temperature=0.7,
                    tools=[
                        find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
                        get_system_time, get_battery_status,
                        list_directory, read_file, write_to_file,
                        open_file_or_url, interactive_web_search, close_web_results
                    ] # Injection des capacités système complètes
                )
            )
            logger.info(f"Cerveau J.A.R.V.I.S initialisé avec {self.model_name} et les outils système avancés.")
            
        except Exception as e:
            logger.error(f"Erreur lors de l'initialisation de Gemini: {e}")

    async def _handle_user_input(self, payload: Dict[str, Any]):
        """
        Gestionnaire interne appelé lors de la réception de texte.
        """
        text = payload.get("text", "")
        if not text:
            return
            
        logger.info(f"Traitement de l'entrée: {text}")
        
        # Envoi à l'interface qu'on est en train de réfléchir
        await bus.emit("brain.thinking", {"status": True})
        
        try:
            response_text = await self._generate_response(text)
            logger.debug(f"Réponse générée: {response_text[:50]}...")
            
            # Émission de la réponse pour qu'elle soit parlée ou affichée
            await bus.emit("brain.response_generated", {"text": response_text})
            
        except Exception as e:
            logger.error(f"Erreur de génération: {e}")
            await bus.emit("brain.error", {"error": str(e)})
        finally:
            await bus.emit("brain.thinking", {"status": False})

    async def _generate_response(self, text: str) -> str:
        """Méthode d'appel à l'API Gemini encapsulée, avec gestion des fonctions"""
        if not self.chat_session:
            return "Je suis désolé, Monsieur, mais mon accès cognitif est déconnecté."
            
        import asyncio
        from modules.system.windows import (
            find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
            get_system_time, get_battery_status,
            list_directory, read_file, write_to_file, open_file_or_url
        )
        from modules.system.web import interactive_web_search, close_web_results
        
        # Dictionnaire manuel des outils disponibles (pour le mapping)
        tools_map = {
            "find_and_launch_app": find_and_launch_app,
            "close_application": close_application,
            "manage_window_state": manage_window_state,
            "move_window_to_screen": move_window_to_screen,
            "get_system_time": get_system_time,
            "get_battery_status": get_battery_status,
            "list_directory": list_directory,
            "read_file": read_file,
            "write_to_file": write_to_file,
            "open_file_or_url": open_file_or_url,
            "interactive_web_search": interactive_web_search,
            "close_web_results": close_web_results
        }
            
        main_loop = asyncio.get_running_loop()
        bus.main_loop = main_loop # Stocké pour les helpers synchrones (comme web.py)
        
        def blocking_call():
            # Google-genai exécute AUTOMATIQUEMENT les fonctions dans ce thread
            response = self.chat_session.send_message(text)
            
            # S'il y a toujours des fonctions en attente (normalement non car le SDK gère l'aller-retour complet)
            if response.function_calls:
                 logger.warning("Des appels de fonctions n'ont pas été gérés automatiquement par le SDK.")
                        
            return response.text
            
        return await asyncio.to_thread(blocking_call)
        
    def start(self):
        """Abonne le module aux événements nécessaires"""
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        logger.info("Module Brain actif et à l'écoute.")

# Instance globale du Cerveau
brain_instance = Brain()
