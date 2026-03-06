"""
Gestionnaire central des notifications.
Branche les alertes proactives sur les toasts bureau et/ou WhatsApp.
"""
from core.logger import get_logger
from core.event_bus import bus
from core.config import settings

logger = get_logger("notifications")


async def _on_proactive_alert(payload: dict):
    """Redirige chaque alerte vers les canaux actifs (toast, WhatsApp)."""
    text = payload.get("text", "")
    source = payload.get("source", "jarvis")
    if not text:
        return

    # 1. Toast bureau (toujours si activé)
    from modules.notifications.toast import show_toast
    show_toast(title=f"J.A.R.V.I.S — {source.capitalize()}", message=text)

    # 2. WhatsApp si numéro par défaut configuré
    if settings.wa_default_phone and settings.wa_notify_on_alerts.lower() == "true":
        from modules.notifications.whatsapp import send_whatsapp
        send_whatsapp(to=settings.wa_default_phone, message=f"[JARVIS] {text}")


def start():
    """Démarre le gestionnaire de notifications — abonné aux alertes proactives."""
    bus.subscribe("alerts.proactive", _on_proactive_alert)
    logger.info("Gestionnaire de notifications démarré (Toast + WhatsApp).")
