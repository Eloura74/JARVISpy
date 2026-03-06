"""
Monitor Gmail — vérifie périodiquement les emails non lus.
Intervalle long (5 min) pour économiser les appels API et les tokens Gemini.
N'appelle Gemini que si un email prioritaire est détecté.
"""
import asyncio
from core.logger import get_logger
from core.event_bus import bus
from core.config import settings

logger = get_logger("alerts.gmail")

_last_unread_count: int | None = None

async def _check_emails():
    """Vérifie le nombre d'emails non lus. Alerte si nouveaux."""
    if settings.gmail_enabled.lower() != "true":
        return

    try:
        from modules.services.gmail import gmail_service
        if not gmail_service.service:
            return

        # Compte rapide — ne lit PAS les contenus (économie tokens)
        results = gmail_service.service.users().messages().list(
            userId='me', q="is:unread in:inbox", maxResults=1
        ).execute()

        count = results.get("resultSizeEstimate", 0)
        global _last_unread_count

        if _last_unread_count is not None and count > _last_unread_count:
            new_count = count - _last_unread_count
            msg = f"Monsieur, vous avez {new_count} nouvel{'s' if new_count > 1 else ''} e-mail{'s' if new_count > 1 else ''} non lu{'s' if new_count > 1 else ''}."
            logger.info(f"Alerte Gmail: {new_count} nouveau(x) email(s)")
            await bus.emit("alerts.proactive", {"text": msg, "source": "gmail"})

        _last_unread_count = count

    except Exception as e:
        logger.error(f"gmail_monitor: {e}")


async def run(interval_seconds: int = 300):
    """Boucle de surveillance Gmail — toutes les 5 minutes par défaut."""
    logger.info("Monitor Gmail démarré.")
    # Délai initial pour laisser le temps à l'auth
    await asyncio.sleep(30)
    while True:
        await _check_emails()
        await asyncio.sleep(interval_seconds)
