from google import genai
from google.genai import types
from typing import List, Dict, Any

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus
from modules.memory.manager import memory, remember_info, forget_info

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
            "Va droit au but. N'esquisse jamais de longues listes ou d'explications superflues sauf si le mot 'détaille' est prononcé.\n"
            "Tu possèdes une mémoire SQLite à long terme. Si l'utilisateur te donne une nouvelle information personnelle "
            "importante (nom, préférence, ville, fait à retenir) ou te demande de retenir quelque chose, "
            "utilise l'outil `remember_info`. Pour corriger/oublier, utilise `forget_info`.\n"
            "Voici ce que tu sais actuellement de l'utilisateur et du contexte (FAITS MÉMORISÉS) :\n"
            "{facts_context}"
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
            from modules.system.monitor import get_system_health_report, get_heavy_processes
            from modules.services.calendar import calendar_service
            from modules.services.vision import vision_service
            from modules.services.gmail import gmail_service
            from modules.services.homeassistant import ha_service
            from modules.services.moonraker import (
                get_printer_status, get_print_progress,
                pause_print, resume_print, cancel_print, emergency_stop
            )
            from modules.services.bambu import (
                get_bambu_status, get_bambu_progress,
                pause_bambu, resume_bambu, stop_bambu
            )
            
            # Mise à jour des instructions pour indiquer qu'il maîtrise les fenêtres et la correction STT
            self.system_instruction += (
                " Tu as le pouvoir absolu sur le système Windows. Tu peux trouver et 'ouvrir', 'fermer', "
                "'réduire', 'agrandir' et 'déplacer' les fenêtres des applications. "
                "CRITIQUE: Le module de transcription vocale fait souvent des erreurs phonétiques (ex: 'Fadila' pour 'FileZilla', "
                "'codex' pour 'VS Code', 'calculatisse' pour 'Calculatrice'). Corrige-les intelligemment. "
                "Cependant, ATTENTION: 'Windsurf' (IDE) et 'WindTerm' (Terminal) sont DEUX logiciels DISTINCTS et valides. "
                "S'il demande explicitement 'Windsurf', n'essaie pas de le corriger par WindTerm, passe bien la chaîne 'Windsurf'."
            )
            
            # Récupération dynamique des faits pour le prompt système
            all_facts = memory.get_all_facts()
            facts_text = "\n".join([f"- {k}: {v}" for k, v in all_facts.items()]) if all_facts else "(Aucun fait mémorisé)"
            final_sys_instruction = self.system_instruction.replace("{facts_context}", facts_text)
            
            self.client = genai.Client(api_key=settings.gemini_api_key)
            
            # Récupération de l'historique SQLite
            history_rows = memory.get_recent_history(limit=10)
            gemini_history = []
            for msg in history_rows:
                # Gemini attend 'user' ou 'model' pour google.genai API -> types.Content
                role = "model" if msg["role"] == "assistant" else "user"
                gemini_history.append(
                    types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])])
                )
            
            # Démarrage d'une session de chat pour conserver l'historique
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                history=gemini_history,
                config=types.GenerateContentConfig(
                    system_instruction=final_sys_instruction,
                    temperature=0.7,
                    tools=[
                        find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
                        get_system_time, get_battery_status,
                        list_directory, read_file, write_to_file,
                        open_file_or_url, interactive_web_search, close_web_results,
                        remember_info, forget_info,
                        get_system_health_report, get_heavy_processes,
                        calendar_service.get_upcoming_events, calendar_service.create_event,
                        vision_service.analyze_surroundings,
                        gmail_service.get_unread_emails_summary, gmail_service.mark_email_as_read,
                        ha_service.get_entity_state, ha_service.call_service, ha_service.list_entities,
                        get_printer_status, get_print_progress,
                        pause_print, resume_print, cancel_print, emergency_stop,
                        get_bambu_status, get_bambu_progress,
                        pause_bambu, resume_bambu, stop_bambu
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
        from modules.services.calendar import calendar_service
        from modules.services.vision import vision_service
        from modules.services.gmail import gmail_service
        from modules.services.homeassistant import ha_service
        from modules.services.moonraker import (
            get_printer_status, get_print_progress,
            pause_print, resume_print, cancel_print, emergency_stop
        )
        from modules.services.bambu import (
            get_bambu_status, get_bambu_progress,
            pause_bambu, resume_bambu, stop_bambu
        )
        
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
            "close_web_results": close_web_results,
            "get_upcoming_events": calendar_service.get_upcoming_events,
            "create_event": calendar_service.create_event,
            "analyze_surroundings": vision_service.analyze_surroundings,
            "get_unread_emails_summary": gmail_service.get_unread_emails_summary,
            "mark_email_as_read": gmail_service.mark_email_as_read,
            "get_entity_state": ha_service.get_entity_state,
            "call_service": ha_service.call_service,
            "list_entities": ha_service.list_entities,
            "get_printer_status": get_printer_status,
            "get_print_progress": get_print_progress,
            "pause_print": pause_print,
            "resume_print": resume_print,
            "cancel_print": cancel_print,
            "emergency_stop": emergency_stop,
            "get_bambu_status": get_bambu_status,
            "get_bambu_progress": get_bambu_progress,
            "pause_bambu": pause_bambu,
            "resume_bambu": resume_bambu,
            "stop_bambu": stop_bambu,
        }
            
        main_loop = asyncio.get_running_loop()
        bus.main_loop = main_loop # Stocké pour les helpers synchrones (comme web.py)
        
        def blocking_call():
            # Google-genai exécute AUTOMATIQUEMENT les fonctions dans ce thread via Automatic Function Calling
            response = self.chat_session.send_message(text)
            
            # S'il y a toujours des fonctions en attente (normalement non car le SDK gère l'aller-retour complet)
            if response.function_calls:
                 logger.warning("Des appels de fonctions n'ont pas été gérés automatiquement par le SDK.")
                 
            # 3. Sauvegarder l'interaction dans Memory (SQLite)
            # Puisque tout s'est bien passé, on archive
            memory.store_message(role="user", content=text)
            memory.store_message(role="assistant", content=response.text)
                        
            return response.text
            
        return await asyncio.to_thread(blocking_call)
        
    def start(self):
        """Abonne le module aux événements nécessaires"""
        bus.subscribe("audio.speech_recognized", self._handle_user_input)
        bus.subscribe("ui.text_input", self._handle_user_input)
        bus.subscribe("ws.ui.text_input", self._handle_user_input) # Ajout du relai WS depuis /api/server.py
        logger.info("Module Brain actif et à l'écoute.")

# Instance globale du Cerveau
brain_instance = Brain()
