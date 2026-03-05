import json
from modules.services.moonraker.client import moonraker_client
from core.logger import get_logger

logger = get_logger("services.moonraker")

def get_printer_status() -> str:
    """
    Retourne l'état complet de l'imprimante Klipper :
    - températures extrudeur et plateau chauffant
    - état du job en cours (printing, standby, error...)
    - vitesse et position XYZ de la tête
    """
    data = moonraker_client.get(
        "/printer/objects/query"
        "?extruder&heater_bed&print_stats&toolhead&display_status"
    )
    if "error" in data:
        return data["error"]

    result = data.get("result", {}).get("status", {})

    extruder = result.get("extruder", {})
    bed = result.get("heater_bed", {})
    stats = result.get("print_stats", {})
    display = result.get("display_status", {})

    summary = {
        "état": stats.get("state", "inconnu"),
        "fichier_en_cours": stats.get("filename", "aucun"),
        "durée_impression": f"{int(stats.get('print_duration', 0) // 60)} min",
        "extrudeur": {
            "temp_actuelle": round(extruder.get("temperature", 0), 1),
            "temp_cible": round(extruder.get("target", 0), 1),
        },
        "plateau": {
            "temp_actuelle": round(bed.get("temperature", 0), 1),
            "temp_cible": round(bed.get("target", 0), 1),
        },
        "avancement_%": round(display.get("progress", 0) * 100, 1),
    }
    return json.dumps(summary, ensure_ascii=False)


def get_print_progress() -> str:
    """
    Retourne le pourcentage d'avancement, le fichier en cours et le temps restant estimé.
    """
    data = moonraker_client.get(
        "/printer/objects/query?print_stats&display_status&virtual_sdcard"
    )
    if "error" in data:
        return data["error"]

    result = data.get("result", {}).get("status", {})
    stats = result.get("print_stats", {})
    display = result.get("display_status", {})
    sdcard = result.get("virtual_sdcard", {})

    state = stats.get("state", "inconnu")
    if state not in ("printing", "paused"):
        return f"Aucune impression en cours (état : {state})."

    progress = display.get("progress", 0)
    elapsed = stats.get("print_duration", 0)  # secondes
    
    # Estimation du temps restant
    if progress > 0.01:
        total_est = elapsed / progress
        remaining = max(0, total_est - elapsed)
        eta_min = int(remaining // 60)
    else:
        eta_min = None

    summary = {
        "fichier": stats.get("filename", "inconnu"),
        "état": state,
        "avancement_%": round(progress * 100, 1),
        "temps_écoulé_min": int(elapsed // 60),
        "temps_restant_estimé_min": eta_min,
    }
    return json.dumps(summary, ensure_ascii=False)
