from modules.services.bambu.client import bambu_client

def _cmd(command: str) -> str:
    """Helper interne — envoie une commande d'impression Bambu Lab."""
    if not bambu_client.is_configured:
        return "Bambu Lab non configurée dans les paramètres."
    sent = bambu_client.publish({
        "print": {"sequence_id": "0", "command": command, "param": ""}
    })
    return sent

def pause_bambu() -> str:
    """Met l'impression Bambu Lab en pause."""
    return "Impression Bambu Lab mise en pause." if _cmd("pause") is True else "Erreur : impossible d'envoyer la commande (MQTT déconnecté ?)."

def resume_bambu() -> str:
    """Reprend l'impression Bambu Lab en pause."""
    return "Impression Bambu Lab reprise." if _cmd("resume") is True else "Erreur : impossible d'envoyer la commande de reprise."

def stop_bambu() -> str:
    """Arrête et annule l'impression Bambu Lab en cours."""
    return "Impression Bambu Lab annulée." if _cmd("stop") is True else "Erreur : impossible d'envoyer la commande d'arrêt."

def set_bambu_extruder_temp(temp: int) -> str:
    """Modifie la température cible de l'extrudeur (buse) pour la Bambu Lab."""
    # Envoi de G-code via MQTT
    command = f"M104 S{temp}\n"
    if not bambu_client.is_configured:
        return "Bambu Lab non configurée."
    # Le payload MQTT Bambu pour le gcode_line
    sent = bambu_client.publish({
        "print": {"sequence_id": "0", "command": "gcode_line", "param": command}
    })
    return f"La température de la buse Bambu Lab est réglée à {temp} degrés." if sent else "Erreur MQTT lors du réglage de la buse."

def set_bambu_bed_temp(temp: int) -> str:
    """Modifie la température cible du lit chauffant pour la Bambu Lab."""
    command = f"M140 S{temp}\n"
    if not bambu_client.is_configured:
        return "Bambu Lab non configurée."
    sent = bambu_client.publish({
        "print": {"sequence_id": "0", "command": "gcode_line", "param": command}
    })
    return f"La température du lit chauffant Bambu Lab est réglée à {temp} degrés." if sent else "Erreur MQTT lors du réglage du lit chauffant."

def show_bambu_camera() -> str:
    """Propose l'ouverture de Bambu Studio car le flux vidéo MQTT n'est pas facilement accessible dans un navigateur."""
    from modules.system.windows import find_and_launch_app
    app_status = find_and_launch_app("Bambu Studio")
    return f"Le flux vidéo natif de la Bambu Lab est chiffré. {app_status}"
