import json
from modules.services.bambu.client import bambu_client

async def get_bambu_status() -> str:
    """
    Retourne l'état complet de l'imprimante Bambu Lab :
    températures, état du job, %, temps restant et numéro de couche.
    """
    if not bambu_client.is_configured:
        return "Bambu Lab non configurée. Renseignez IP, numéro de série et Access Code dans Paramètres → Modules."

    state = bambu_client.get_state()
    if not state:
        return "En attente des données Bambu Lab... (première connexion MQTT en cours)."

    gcode_map = {
        "IDLE": "En veille", "RUNNING": "En impression",
        "PAUSE": "En pause",  "FINISH": "Terminée",
        "FAILED": "Erreur",   "SLICING": "Slicing en cours",
    }
    from core.event_bus import bus
    
    raw = state.get("gcode_state", "IDLE")
    summary = {
        "type": "bambu",
        "état": gcode_map.get(raw, raw),
        "fichier": state.get("subtask_name", "aucun"),
        "avancement_%": state.get("mc_percent", 0),
        "temps_restant_min": state.get("mc_remaining_time", 0),
        "couche": f"{state.get('layer_num', 0)}/{state.get('total_layer_num', 0)}",
        "extrudeur_°C": {
            "actuel": round(state.get("nozzle_temper", 0), 1),
            "cible": round(state.get("nozzle_target_temper", 0), 1),
        },
        "plateau_°C": {
            "actuel": round(state.get("bed_temper", 0), 1),
            "cible": round(state.get("bed_target_temper", 0), 1),
        },
    }
    
    # Signal pour le HUD
    await bus.emit("printer.status", summary)
    return json.dumps(summary, ensure_ascii=False)


async def get_bambu_progress() -> str:
    """
    Retourne uniquement l'avancement de l'impression Bambu Lab en cours.
    Version allégée (économise des tokens Gemini).
    """
    if not bambu_client.is_configured:
        return "Bambu Lab non configurée dans les paramètres."

    state = bambu_client.get_state()
    if not state:
        return "En attente des données Bambu Lab..."

    raw = state.get("gcode_state", "IDLE")
    if raw not in ("RUNNING", "PAUSE"):
        return f"Aucune impression en cours (état: {raw})."

    return json.dumps({
        "fichier": state.get("subtask_name", "inconnu"),
        "état": raw,
        "avancement_%": state.get("mc_percent", 0),
        "temps_restant_min": state.get("mc_remaining_time", 0),
        "couche": f"{state.get('layer_num', 0)}/{state.get('total_layer_num', 0)}",
    }, ensure_ascii=False)
