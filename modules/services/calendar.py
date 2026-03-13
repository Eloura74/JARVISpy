import os
import datetime
import json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from typing import Dict, Any, List

from core.logger import get_logger

logger = get_logger("services.calendar")

class GoogleCalendarService:
    """
    Connecteur officiel pour interagir avec Google Calendar.
    Gère l'authentification OAuth2 locale et les requêtes (lecture/écriture).
    """
    # Permissions demandées (lecture et écriture sur l'agenda)
    SCOPES = ['https://www.googleapis.com/auth/calendar']

    def __init__(self, credentials_path="credentials.json", token_path="token.json"):
        self.credentials_path = credentials_path
        self.token_path = token_path
        self.creds = None
        self.service = None
        self._authenticate()

    def _authenticate(self):
        """Charge le token ou lance le flux d'authentification navigateur."""
        try:
            # Vérification credentials.json
            if not os.path.exists(self.credentials_path):
                logger.error(f"❌ ERREUR: Le fichier {self.credentials_path} est introuvable!")
                logger.error("📋 Solution: Téléchargez credentials.json depuis Google Cloud Console")
                logger.error("   1. https://console.cloud.google.com/apis/credentials")
                logger.error("   2. Créez un ID client OAuth 2.0 (Application de bureau)")
                logger.error("   3. Téléchargez le JSON et renommez-le en 'credentials.json'")
                self.service = None
                return
            
            logger.info(f"✓ Fichier {self.credentials_path} trouvé")
            
            # Token déjà existant ?
            if os.path.exists(self.token_path):
                logger.info(f"✓ Token existant trouvé: {self.token_path}")
                self.creds = Credentials.from_authorized_user_file(self.token_path, self.SCOPES)
            
            # S'il n'y a pas de token ou s'il est expiré
            if not self.creds or not self.creds.valid:
                if self.creds and self.creds.expired and self.creds.refresh_token:
                    logger.info("🔄 Rafraîchissement du token Google Calendar...")
                    try:
                        self.creds.refresh(Request())
                        logger.info("✓ Token rafraîchi avec succès")
                    except Exception as refresh_error:
                        logger.warning(f"⚠️ Échec du rafraîchissement: {refresh_error}")
                        logger.info("🗑️ Suppression du token expiré pour forcer nouvelle authentification...")
                        if os.path.exists(self.token_path):
                            os.remove(self.token_path)
                        self.creds = None
                
                # Si pas de credentials valides, on lance l'authentification
                if not self.creds or not self.creds.valid:
                    logger.info("🌐 Ouverture du navigateur pour l'authentification Google OAuth2...")
                    logger.info("   Veuillez autoriser l'accès à votre calendrier dans le navigateur")
                    # Le port 0 permet de trouver un port libre automatiquement
                    flow = InstalledAppFlow.from_client_secrets_file(self.credentials_path, self.SCOPES)
                    self.creds = flow.run_local_server(port=0)
                    logger.info("✓ Authentification réussie")

                # Sauvegarde du nouveau token pour les prochaines exécutions
                with open(self.token_path, 'w') as token:
                    token.write(self.creds.to_json())
                logger.info(f"✓ Token sauvegardé: {self.token_path}")

            self.service = build('calendar', 'v3', credentials=self.creds)
            logger.info("✅ Connexion Google Calendar établie avec succès")
            
        except Exception as e:
            logger.error(f"❌ Erreur d'authentification Google Calendar: {str(e)}")
            logger.error(f"   Type d'erreur: {type(e).__name__}")
            import traceback
            logger.error(f"   Traceback: {traceback.format_exc()}")
            self.service = None

    def get_upcoming_events(self, max_results: int = 10) -> str:
        """
        Récupère les prochains événements à venir dans le calendrier principal.
        """
        if not self.service:
            return "Erreur: Service Google Calendar non authentifié (credentials.json manquant)."

        try:
            # Récupération de l'heure actuelle en format ISO
            now = datetime.datetime.utcnow().isoformat() + 'Z' 
            
            logger.debug(f"Récupération des {max_results} prochains événements...")
            events_result = self.service.events().list(
                calendarId='primary',
                timeMin=now,
                maxResults=max_results,
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            events = events_result.get('items', [])
            formatted_events = []
            
            for event in events:
                start = event['start'].get('dateTime', event['start'].get('date'))
                end = event['end'].get('dateTime', event['end'].get('date'))
                formatted_events.append({
                    "id": event.get("id"),
                    "summary": event.get("summary", "Sans titre"),
                    "start": start,
                    "end": end,
                    "location": event.get("location", ""),
                    "description": event.get("description", "")
                })
                
            return json.dumps(formatted_events, ensure_ascii=False) if formatted_events else "Aucun événement prévu."
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des événements: {str(e)}")
            return f"Erreur lors de l'accès à l'agenda: {str(e)}"

    def prepare_calendar_action(self, summary: str, start_time: str, type: str = "create", event_id: str = None) -> str:
        """
        Affiche l'événement dans le HUD sans l'enregistrer. 
        À utiliser pour demander confirmation à l'utilisateur.
        """
        result = {
            "status": "pending",
            "summary": summary,
            "start": start_time,
            "type": type,
            "id": event_id,
            "confirmRequired": True
        }
        from core.event_bus import bus
        import asyncio
        if bus.main_loop:
            asyncio.run_coroutine_threadsafe(bus.emit("system.calendar", result), bus.main_loop)
        return "L'affichage de confirmation a été envoyé à Monsieur."

    def create_event(self, summary: str, start_time: str, end_time: str, description: str = "") -> str:
        """
        Crée un nouvel événement dans le calendrier principal.
        Format d'heure attendu : ISO 8601, ex: '2026-03-06T14:00:00+01:00'
        """
        if not self.service:
            return {"error": "Service Google Calendar non authentifié."}
            
        try:
            event_body = {
                'summary': summary,
                'description': description,
                'start': {
                    'dateTime': start_time,
                    'timeZone': 'Europe/Paris', # À rendre dynamique ou paramétrable ? On met Paris par défaut
                },
                'end': {
                    'dateTime': end_time,
                    'timeZone': 'Europe/Paris',
                },
            }
            
            logger.info(f"Création d'un événement Calendar : {summary} (du {start_time} au {end_time})")
            event = self.service.events().insert(calendarId='primary', body=event_body).execute()
            
            logger.info(f"Événement créé avec succès : {event.get('htmlLink')}")
            
            result = {
                "status": "success",
                "link": event.get('htmlLink'),
                "id": event.get('id'),
                "summary": summary,
                "start": start_time,
                "type": "create"
            }
            
            # Notifier le bus pour l'UI
            import asyncio
            from core.event_bus import bus
            if bus.main_loop:
                asyncio.run_coroutine_threadsafe(bus.emit("system.calendar", result), bus.main_loop)

            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erreur lors de la création de l'événement: {str(e)}")
            return f"Erreur: {str(e)}"

    def update_event(self, event_id: str, summary: str = None, start_time: str = None, end_time: str = None, description: str = None) -> str:
        """
        Met à jour un événement existant via son ID.
        """
        if not self.service:
            return "Service Google Calendar non authentifié."
            
        try:
            # Récupération de l'événement actuel
            event = self.service.events().get(calendarId='primary', eventId=event_id).execute()
            
            if summary: event['summary'] = summary
            if description: event['description'] = description
            if start_time:
                event['start'] = {'dateTime': start_time, 'timeZone': 'Europe/Paris'}
            if end_time:
                event['end'] = {'dateTime': end_time, 'timeZone': 'Europe/Paris'}
                
            logger.info(f"Mise à jour de l'événement {event_id} : {summary or 'inchangé'}")
            updated_event = self.service.events().update(calendarId='primary', eventId=event_id, body=event).execute()
            
            result = {
                "status": "success",
                "link": updated_event.get('htmlLink'),
                "id": updated_event.get('id'),
                "summary": summary or event.get('summary'),
                "start": start_time or event['start'].get('dateTime'),
                "type": "update"
            }

            from core.event_bus import bus
            import asyncio
            if bus.main_loop:
                asyncio.run_coroutine_threadsafe(bus.emit("system.calendar", result), bus.main_loop)

            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erreur lors de la mise à jour: {str(e)}")
            return f"Erreur: {str(e)}"

    def delete_event(self, event_id: str) -> str:
        """
        Supprime un événement via son ID.
        """
        if not self.service:
            return "Service Google Calendar non authentifié."
            
        try:
            # Récupération de l'événement pour avoir les détails dans le log UI avant suppression
            event = self.service.events().get(calendarId='primary', eventId=event_id).execute()
            
            logger.info(f"Suppression de l'événement Calendar : {event_id}")
            self.service.events().delete(calendarId='primary', eventId=event_id).execute()
            
            result = {
                "status": "success", 
                "message": "Événement supprimé.",
                "type": "delete",
                "id": event_id,
                "summary": event.get('summary')
            }

            from core.event_bus import bus
            import asyncio
            if bus.main_loop:
                asyncio.run_coroutine_threadsafe(bus.emit("system.calendar", result), bus.main_loop)

            return json.dumps(result)
        except Exception as e:
            logger.error(f"Erreur lors de la suppression: {str(e)}")
            return f"Erreur: {str(e)}"

# Instance globale (qui va s'auto-authentifier au démarrage si possible)
# On ne met pas d'erreur bloquante si le fichier n'est pas là, pour ne pas casser l'appli.
calendar_service = GoogleCalendarService()
