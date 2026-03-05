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
            # Token déjà existant ?
            if os.path.exists(self.token_path):
                self.creds = Credentials.from_authorized_user_file(self.token_path, self.SCOPES)
            
            # S'il n'y a pas de token ou s'il est expiré
            if not self.creds or not self.creds.valid:
                if self.creds and self.creds.expired and self.creds.refresh_token:
                    logger.info("Rafraîchissement du token Google Calendar...")
                    self.creds.refresh(Request())
                else:
                    if not os.path.exists(self.credentials_path):
                        logger.warning(f"Le fichier {self.credentials_path} est introuvable. "
                                       f"Impossible d'activer Google Calendar. "
                                       f"Veuillez le télécharger depuis Google Cloud Console.")
                        return

                    logger.info("Ouverture du navigateur pour l'authentification Google OAuth2...")
                    # Le port 0 permet de trouver un port libre automatiquement
                    flow = InstalledAppFlow.from_client_secrets_file(self.credentials_path, self.SCOPES)
                    self.creds = flow.run_local_server(port=0)

                # Sauvegarde du nouveau token pour les prochaines exécutions
                with open(self.token_path, 'w') as token:
                    token.write(self.creds.to_json())

            self.service = build('calendar', 'v3', credentials=self.creds)
            logger.info("Connexion Google Calendar établie avec succès.")
            
        except Exception as e:
            logger.error(f"Erreur d'authentification Google Calendar: {str(e)}")
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
            
            logger.info(f"Création d'un événement Calendar : {summary}")
            event = self.service.events().insert(calendarId='primary', body=event_body).execute()
            
            return json.dumps({
                "status": "success",
                "link": event.get('htmlLink'),
                "id": event.get('id')
            }, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erreur lors de la création de l'événement: {str(e)}")
            return f"Erreur: {str(e)}"

# Instance globale (qui va s'auto-authentifier au démarrage si possible)
# On ne met pas d'erreur bloquante si le fichier n'est pas là, pour ne pas casser l'appli.
calendar_service = GoogleCalendarService()
