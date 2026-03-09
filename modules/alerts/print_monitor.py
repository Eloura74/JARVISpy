"""
Monitor imprimantes — surveille Bambu Lab et Moonraker en arrière-plan.
Émet une alerte TTS DIRECTE (sans passer par Gemini) pour économiser les tokens.
"""
import asyncio
from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("alerts.print")

# Dernier état connu de chaque imprimante
_last_state: dict = {"bambu": None, "moonraker": None}

# Messages templates directs → TTS sans Gemini (économie tokens)
_STATE_MESSAGES = {
    "FINISH": "Monsieur, votre impression est terminée.",
    "FAILED": "Attention Monsieur, l'impression a échoué. Intervention requise.",
    "PAUSE": "Monsieur, l'impression a été mise en pause automatiquement.",
}

async def _check_bambu():
    """Vérifie l'état Bambu Lab et alerte si changement significatif."""
    from core.config import settings
    if not (settings.bambu_ip and settings.bambu_serial):
        return

    try:
        from modules.services.bambu.client import bambu_client
        state = bambu_client.get_state()
        current = state.get("gcode_state")
        previous = _last_state.get("bambu")

        if current != previous and previous is not None:
            message = _STATE_MESSAGES.get(current)
            if message:
                printer_name = "Bambu Lab"
                if current == "FINISH":
                    file_name = state.get("subtask_name", "")
                    message = f"Monsieur, l'impression '{file_name}' sur {printer_name} est terminée."
                logger.info(f"Alerte Bambu: {previous} → {current}")
                await bus.emit("alerts.proactive", {"text": message, "source": "bambu"})

        _last_state["bambu"] = current
    except Exception as e:
        logger.error(f"print_monitor bambu: {e}")


async def _check_moonraker():
    """Vérifie l'état Moonraker et alerte si changement significatif."""
    from core.config import settings
    if not settings.moonraker_url:
        return

    try:
        from modules.services.moonraker.client import moonraker_client
        data = await moonraker_client.get("/printer/objects/query?print_stats")
        if "error" in data:
            return

        stats = data.get("result", {}).get("status", {}).get("print_stats", {})
        current = stats.get("state")
        previous = _last_state.get("moonraker")

        if current != previous and previous is not None:
            message = _STATE_MESSAGES.get(current.upper() if current else "")
            if message:
                fname = stats.get("filename", "")
                if current == "complete" and fname:
                    message = f"Monsieur, l'impression '{fname}' sur Klipper est terminée."
                logger.info(f"Alerte Moonraker: {previous} → {current}")
                await bus.emit("alerts.proactive", {"text": message, "source": "moonraker"})

        _last_state["moonraker"] = current
    except Exception as e:
        logger.error(f"print_monitor moonraker: {e}")


async def run(interval_seconds: int = 15):
    """Boucle de surveillance — vérifie toutes les N secondes."""
    logger.info("Monitor imprimantes démarré.")
    while True:
        await asyncio.gather(_check_bambu(), _check_moonraker())
        await asyncio.sleep(interval_seconds)
