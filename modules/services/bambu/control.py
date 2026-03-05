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
