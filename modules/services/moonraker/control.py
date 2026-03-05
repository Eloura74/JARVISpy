import json
from modules.services.moonraker.client import moonraker_client
from core.logger import get_logger

logger = get_logger("services.moonraker")

def pause_print() -> str:
    """Met l'impression en cours en pause via Moonraker/Klipper."""
    data = moonraker_client.post("/printer/print/pause")
    if "error" in data:
        return f"Erreur lors de la mise en pause : {data['error']}"
    logger.info("Impression mise en pause.")
    return "L'impression a été mise en pause avec succès."


def resume_print() -> str:
    """Reprend l'impression qui était en pause."""
    data = moonraker_client.post("/printer/print/resume")
    if "error" in data:
        return f"Erreur lors de la reprise : {data['error']}"
    logger.info("Impression reprise.")
    return "L'impression a repris avec succès."


def cancel_print() -> str:
    """Annule l'impression en cours (irréversible)."""
    data = moonraker_client.post("/printer/print/cancel")
    if "error" in data:
        return f"Erreur lors de l'annulation : {data['error']}"
    logger.info("Impression annulée.")
    return "L'impression a été annulée."


def emergency_stop() -> str:
    """
    ARRÊT D'URGENCE — Éteint immédiatement les chaufferettes et stoppe les moteurs.
    À n'utiliser qu'en cas de danger.
    """
    data = moonraker_client.post("/printer/emergency_stop")
    if "error" in data:
        return f"Erreur lors de l'arrêt d'urgence : {data['error']}"
    logger.warning("ARRÊT D'URGENCE Klipper déclenché !")
    return "ARRÊT D'URGENCE exécuté. L'imprimante est à l'arrêt."
