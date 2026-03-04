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
                open_application, get_system_time, get_battery_status,
                list_directory, read_file, write_to_file, open_file_or_url
            )
            from modules.system.web import web_search
            
            self.client = genai.Client(api_key=settings.gemini_api_key)
            
            # Démarrage d'une session de chat pour conserver l'historique
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                config=types.GenerateContentConfig(
                    system_instruction=self.system_instruction,
                    temperature=0.7,
                    tools=[
                        open_application, get_system_time, get_battery_status,
                        list_directory, read_file, write_to_file,
                        open_file_or_url, web_search
                    ] # Injection des capacités système
                )
            )
            logger.info(f"Cerveau J.A.R.V.I.S initialisé avec {self.model_name} et les outils système.")
            
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
            open_application, get_system_time, get_battery_status,
            list_directory, read_file, write_to_file, open_file_or_url
        )
        from modules.system.web import web_search
        
        # Dictionnaire manuel des outils disponibles (pour le mapping)
        tools_map = {
            "open_application": open_application,
            "get_system_time": get_system_time,
            "get_battery_status": get_battery_status,
            "list_directory": list_directory,
            "read_file": read_file,
            "write_to_file": write_to_file,
            "open_file_or_url": open_file_or_url,
            "web_search": web_search
        }
            
        def blocking_call():
            response = self.chat_session.send_message(text)
            
            # Gestion basique du Function Calling (si le LLM a décidé d'utiliser un outil)
            if response.function_calls:
                for fn in response.function_calls:
                    logger.info(f"J.A.R.V.I.S exécute l'outil: {fn.name} avec {fn.args}")
                    
                    if fn.name in tools_map:
                        try:
                            # Exécution de la commande locale
                            tool_result = tools_map[fn.name](**fn.args)
                            logger.debug(f"Résultat de l'outil: {tool_result}")
                        except Exception as tool_e:
                            tool_result = f"Erreur lors de l'exécution: {str(tool_e)}"
                            logger.error(tool_result)
                            
                        # Renvoi du résultat au LLM pour qu'il formule sa réponse finale
                        response = self.chat_session.send_message(
                            [types.Part.from_function_response(
                                name=fn.name,
                                response={"result": tool_result}
                            )]
                        )
                    else:
                        logger.warning(f"Outil inconnu demandé par le LLM: {fn.name}")
                        
            return response.text
            
        return await asyncio.to_thread(blocking_call)
        
    def start(self):
        """Abonne le module aux événements nécessaires"""
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        logger.info("Module Brain actif et à l'écoute.")

# Instance globale du Cerveau
brain_instance = Brain()
