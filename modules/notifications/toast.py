"""
Toast Windows 10/11 via winotify — notifications bureau légères.
Affiche une notification système sans passer par Gemini (0 token).
"""
from core.config import settings
from core.logger import get_logger

logger = get_logger("notifications.toast")

APP_ID = "J.A.R.V.I.S"

def show_toast(title: str, message: str, icon: str = "") -> bool:
    """
    Affiche une notification toast Windows.
    Retourne False silencieusement si winotify n'est pas installé.
    """
    if settings.toast_enabled.lower() != "true":
        return False
    try:
        from winotify import Notification, audio
        toast = Notification(
            app_id=APP_ID,
            title=title,
            msg=message[:200],  # Limite de longueur Windows
        )
        toast.set_audio(audio.Default, loop=False)
        toast.show()
        logger.debug(f"Toast: {title}")
        return True
    except ImportError:
        logger.warning("winotify non installé — pip install winotify")
        return False
    except Exception as e:
        logger.error(f"Toast erreur: {e}")
        return False
