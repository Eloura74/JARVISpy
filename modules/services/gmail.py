import os
import json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import base64
from bs4 import BeautifulSoup

from core.logger import get_logger
from core.config import settings
from core.event_bus import bus

logger = get_logger("services.gmail")

class GoogleMailService:
    """
    Connecteur avancé pour l'API Gmail.
    Gère l'authentification OAuth2 (jeton séparé de Calendar)
    et la lecture des emails.
    """
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

    def __init__(self, credentials_path="credentials.json", token_path="token_gmail.json"):
        self.credentials_path = credentials_path
        self.token_path = token_path
        self.creds = None
        self.service = None
        
        # On ne lance l'authentification que si le module est activé dans le GUI
        if settings.gmail_enabled.lower() == "true":
            self._authenticate()
        else:
            logger.debug("Le module Gmail est désactivé dans les paramètres. Authentification sautée.")

    def _authenticate(self):
        """Authentifie le service via OAuth2."""
        try:
            if os.path.exists(self.token_path):
                self.creds = Credentials.from_authorized_user_file(self.token_path, self.SCOPES)
            
            if not self.creds or not self.creds.valid:
                if self.creds and self.creds.expired and self.creds.refresh_token:
                    logger.info("Rafraîchissement du token Gmail...")
                    self.creds.refresh(Request())
                else:
                    if not os.path.exists(self.credentials_path):
                        logger.warning(f"Le fichier {self.credentials_path} est introuvable. "
                                       f"Veuillez l'ajouter (créé via Google Cloud Console) pour utiliser Gmail.")
                        return

                    logger.info("Ouverture du navigateur pour l'authentification Gmail OAuth2...")
                    # Le port 0 trouve un port libre automatiquement
                    flow = InstalledAppFlow.from_client_secrets_file(self.credentials_path, self.SCOPES)
                    self.creds = flow.run_local_server(port=0)

                with open(self.token_path, 'w') as token:
                    token.write(self.creds.to_json())

            self.service = build('gmail', 'v1', credentials=self.creds)
            logger.info("Connexion Gmail API établie avec succès.")
            
        except Exception as e:
            logger.error(f"Erreur d'authentification Gmail: {str(e)}")
            self.service = None

    def _extract_body(self, payload):
        """Extrait le corps textuel d'un email en naviguant dans les parts MIME."""
        body_text = ""
        if 'parts' in payload:
            for part in payload['parts']:
                if part['mimeType'] == 'text/plain':
                    if 'data' in part['body']:
                        data = part['body']['data']
                        body_text += base64.urlsafe_b64decode(data).decode('utf-8')
                elif part['mimeType'] == 'text/html':
                    pass # On privilégie le texte brut s'il existe
                elif 'parts' in part:
                    body_text += self._extract_body(part)
        elif 'body' in payload and 'data' in payload['body']:
            data = payload['body']['data']
            body_text = base64.urlsafe_b64decode(data).decode('utf-8')
            
        # Si seul du HTML est trouvé ou pour nettoyer, on utilise BeautifulSoup
        # L'import de bs4 est fait en haut. Au besoin l'utilisateur installera beautifulsoup4 s'il ne l'a pas.
        # Afin de ne pas casser si bs4 est absent, on peut intercepter l'erreur
        return body_text

    def _clean_text_for_speech(self, text: str) -> str:
        """Nettoie le texte pour éviter que le TTS ne lise des caractères spéciaux."""
        if not text: return ""
        import re
        # Enlever les emojis et caractères spéciaux trop techniques
        text = re.sub(r'[^\w\sàâäéèêëïîôöùûüç.,!?\-\']', ' ', text)
        # Enlever les espaces multiples
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def get_unread_emails_summary(self, max_results: int = 5) -> str:
        """
        Outil appelé par l'IA pour lire les derniers emails NON LUS.
        Met également à jour le HUD via le bus d'événements.
        """
        if settings.gmail_enabled.lower() != "true":
             return "Le module Gmail est désactivé."
             
        if not self.service:
            self._authenticate()
            if not self.service:
                return "Erreur d'authentification Gmail."

        try:
            logger.info("Récupération des emails pour le HUD...")
            results = self.service.users().messages().list(userId='me', q="is:unread in:inbox", maxResults=max_results).execute()
            messages = results.get('messages', [])

            if not messages:
                return "Aucun nouvel e-mail non lu."

            formatted_emails = []
            ui_emails = []
            
            for msg in messages:
                msg_data = self.service.users().messages().get(userId='me', id=msg['id'], format='full').execute()
                payload = msg_data.get('payload', {})
                headers = payload.get('headers', [])
                
                subject = next((header['value'] for header in headers if header['name'].lower() == 'subject'), "Sans Objet")
                sender = next((header['value'] for header in headers if header['name'].lower() == 'from'), "Inconnu")
                date = next((header['value'] for header in headers if header['name'].lower() == 'date'), "")

                body = self._extract_body(payload)[:500]
                
                # Nettoyage pour le TTS
                clean_subject = self._clean_text_for_speech(subject)
                clean_sender = self._clean_text_for_speech(sender.split('<')[0])

                email_obj = {
                    "id": msg['id'],
                    "from": clean_sender,
                    "subject": clean_subject,
                    "date": date,
                    "body_snippet": body.strip()
                }
                formatted_emails.append(email_obj)
                
                # Données pour l'UI
                ui_emails.append({
                    "from": sender.split('<')[0].strip(),
                    "subject": subject,
                    "date": date
                })

            # Notification UI (asynchrone depuis un thread synchrone)
            if hasattr(bus, "main_loop") and bus.main_loop:
                import asyncio
                asyncio.run_coroutine_threadsafe(bus.emit("ui.show_emails", ui_emails), bus.main_loop)
            
            return f"Voici les {len(formatted_emails)} derniers e-mails non lus:\n" + json.dumps(formatted_emails, ensure_ascii=False)
            
        except Exception as e:
            logger.error(f"Erreur Gmail summary: {str(e)}")
            return f"Erreur technique Gmail: {str(e)}"

    def mark_email_as_read(self, email_id: str) -> str:
        """
        Marque un email spécifique comme lu pour le retirer de la pile des non-lus.
        """
        if not self.service:
            return "Service Gmail non authentifié."
        try:
            self.service.users().messages().modify(userId='me', id=email_id, body={'removeLabelIds': ['UNREAD']}).execute()
            return f"L'email {email_id} a bien été marqué comme lu."
        except Exception as e:
            return f"Erreur lors du marquage de l'e-mail: {str(e)}"

# Instance globale
gmail_service = GoogleMailService()
