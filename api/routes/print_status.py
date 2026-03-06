"""
Endpoint REST léger pour l'état combiné des imprimantes 3D.
Utilisé par le widget GUI — aucun appel Gemini, zéro consommation de tokens.
"""
from fastapi import APIRouter
from core.config import settings
import json

router = APIRouter()

def _parse_status(raw: str) -> dict:
    """Tente de parser le JSON retourné par un module imprimante. Fallback sur dict état."""
    try:
        return json.loads(raw)
    except Exception:
        return {"état": raw[:120]}

@router.get("/api/print-status")
async def get_combined_print_status():
    """Agrège l'état de Bambu Lab et Moonraker pour le widget GUI.
    Retourne toujours les données si l'imprimante est configurée (même en veille)."""
    result = {"bambu": None, "moonraker": None}

    # Bambu Lab
    if settings.bambu_ip and settings.bambu_serial and settings.bambu_access_code:
        try:
            from modules.services.bambu.status import get_bambu_status
            result["bambu"] = _parse_status(get_bambu_status())
        except Exception as e:
            result["bambu"] = {"état": f"Erreur: {str(e)[:60]}"}

    # Moonraker / Klipper
    if settings.moonraker_url:
        try:
            from modules.services.moonraker.status import get_printer_status
            result["moonraker"] = _parse_status(get_printer_status())
        except Exception as e:
            result["moonraker"] = {"état": f"Erreur: {str(e)[:60]}"}

    return result
