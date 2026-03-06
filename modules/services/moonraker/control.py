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


def set_moonraker_extruder_temp(temp: float) -> str:
    """Modifie la température cible de l'extrudeur (buse)."""
    script = f"M104 S{temp}"
    data = moonraker_client.post("/printer/gcode/script", {"script": script})
    if "error" in data:
        return f"Erreur lors du réglage de la température de la buse : {data['error']}"
    logger.info(f"Température buse VZBot réglée à {temp}°C.")
    return f"La température de la buse de la VZBot est réglée à {temp} degrés."


def set_moonraker_bed_temp(temp: float) -> str:
    """Modifie la température cible du lit chauffant."""
    script = f"M140 S{temp}"
    data = moonraker_client.post("/printer/gcode/script", {"script": script})
    if "error" in data:
        return f"Erreur lors du réglage de la température du lit : {data['error']}"
    logger.info(f"Température lit chauffant VZBot réglée à {temp}°C.")
    return f"La température du lit chauffant de la VZBot est réglée à {temp} degrés."


def show_moonraker_camera() -> str:
    """Ouvre la caméra de la VZBot dans le navigateur."""
    from core.config import settings
    import webbrowser
    
    ip = settings.moonraker_url
    if not ip:
        return "L'URL de Moonraker n'est pas configurée dans les paramètres."
        
    # URL classique d'une caméra mainsail/fluidd via crowsnest
    cam_url = f"{ip.rstrip('/')}/webcam/?action=stream"
    try:
        webbrowser.open(cam_url)
        return "J'ouvre le flux vidéo de la caméra VZBot sur votre écran."
    except Exception as e:
        logger.error(f"Erreur d'ouverture de caméra: {e}")
        return "Impossible d'ouvrir le navigateur pour afficher la caméra VZBot."
