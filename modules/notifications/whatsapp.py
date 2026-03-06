"""
Client Python vers le microservice Node.js whatsapp-web.js.
Appelle http://localhost:3001 — peut s'utiliser comme outil Gemini.
"""
import httpx
from core.config import settings
from core.logger import get_logger

logger = get_logger("notifications.whatsapp")

WA_BRIDGE_URL = "http://localhost:3001"

def _bridge_available() -> bool:
    try:
        r = httpx.get(f"{WA_BRIDGE_URL}/status", timeout=2.0)
        return r.json().get("connected", False)
    except Exception:
        return False

def _resolve_contact(name_or_number: str) -> tuple[str, str]:
    """
    Résout un nom ou numéro en numéro WhatsApp.
    Retourne (number, display_name). Si déjà un numéro, retourne tel quel.
    """
    cleaned = name_or_number.strip()

    # Détection numéro : commence par + ou ne contient que des chiffres/espaces
    digits_only = cleaned.replace(" ", "").replace("+", "")
    if cleaned.startswith("+") or digits_only.isdigit():
        return cleaned, cleaned

    # Recherche par nom complet d'abord, puis par mots séparés
    search_terms = [cleaned]
    words = cleaned.split()
    if len(words) > 1:
        search_terms += words  # Fallback sur prénom seul, nom seul, etc.

    for term in search_terms:
        try:
            r = httpx.get(
                f"{WA_BRIDGE_URL}/contacts/search",
                params={"q": term},
                timeout=5.0,
            )
            contacts = r.json()
            if contacts:
                best = contacts[0]
                number = "+" + best["id"]
                return number, best["name"]
        except Exception as e:
            logger.warning(f"Résolution contact WA '{term}': {e}")
            break  # Si le bridge est down, inutile de réessayer

    return "", cleaned

def send_whatsapp(to: str, message: str) -> str:
    """
    Envoie un message WhatsApp. NE PAS demander un numéro de téléphone —
    'to' peut être un prénom/nom exactement comme dit par l'utilisateur
    (ex: 'Michel Spie', 'Maman', 'Papa'). Le système résout le contact automatiquement.
    Laisser 'to' vide pour utiliser le destinataire par défaut configuré.
    message: texte du message.
    """
    # Résolution par nom OU numéro par défaut si vide
    raw = to.strip() or settings.wa_default_phone
    if not raw:
        return "Numéro ou nom WhatsApp non renseigné. Configurez-le dans Paramètres → Modules."

    phone, display = _resolve_contact(raw)
    if not phone:
        return f"Contact '{raw}' introuvable dans WhatsApp. Vérifiez l'orthographe ou utilisez le numéro."

    try:
        r = httpx.post(
            f"{WA_BRIDGE_URL}/send",
            json={"to": phone, "message": message},
            timeout=10.0,
        )
        r.raise_for_status()
        logger.info(f"WhatsApp envoyé à {display} ({phone})")
        return f"Message WhatsApp envoyé à {display}."
    except httpx.ConnectError:
        return "Bridge WhatsApp non démarré. Lancez: node services/whatsapp_bridge/index.js"
    except Exception as e:
        logger.error(f"Erreur WhatsApp send: {e}")
        return f"Erreur envoi WhatsApp: {str(e)}"

def get_whatsapp_status() -> str:
    """Vérifie si le bridge WhatsApp est connecté et retourne son statut."""
    try:
        r = httpx.get(f"{WA_BRIDGE_URL}/status", timeout=3.0)
        data = r.json()
        connected = data.get("connected", False)
        return "WhatsApp connecté et prêt." if connected else "WhatsApp non connecté. Scannez le QR code."
    except Exception:
        return "Bridge WhatsApp non démarré."
