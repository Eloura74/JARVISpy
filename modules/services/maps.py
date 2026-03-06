"""
Module Cartographie via Google Maps API
Fournit le temps de trajet avec trafic en temps réel pour JARVIS.
"""
import httpx
from core.config import settings
from core.logger import get_logger

logger = get_logger("services.maps")

BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json"

def _get_api_key() -> str:
    key = settings.google_maps_api_key
    if not key:
        logger.warning("Clé API Google Maps manquante. Le service trajet ne fonctionnera pas.")
    return key

def _get_origin(origin: str) -> str:
    """Utilise la ville par défaut si l'origine n'est pas spécifiée."""
    if not origin:
        origin = settings.default_city
    return origin

def get_travel_time(destination: str, origin: str = "") -> str:
    """
    Calcule le temps de trajet en tenant compte du trafic actuel.
    Si l'origine est vide, utilise la ville par défaut des paramètres.
    """
    api_key = _get_api_key()
    if not api_key:
        return "Clé API Google Maps non configurée."
        
    start_point = _get_origin(origin)
    if not start_point:
        return "Lieu de départ (origine) non précisé et aucune ville par défaut configurée."

    try:
        response = httpx.get(
            BASE_URL,
            params={
                "origins": start_point,
                "destinations": destination,
                "key": api_key,
                "language": "fr",
                "departure_time": "now",  # Activation du mode trafic temps réel
                "traffic_model": "best_guess"
            },
            timeout=5.0
        )
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") != "OK":
            logger.error(f"Erreur API Google Maps: {data.get('status')} - {data.get('error_message', '')}")
            return "Une erreur est survenue lors du calcul de l'itinéraire via Google Maps."

        # Analyse du premier résultat
        element = data["rows"][0]["elements"][0]
        status = element.get("status")
        
        if status == "ZERO_RESULTS":
            return f"Aucun itinéraire trouvé entre {start_point} et {destination}."
        elif status != "OK":
            return f"Problème d'itinéraire ({status})."
            
        distance = element["distance"]["text"]
        duration = element["duration"]["text"]
        
        # S'il y a du trafic, Google renvoie 'duration_in_traffic'
        if "duration_in_traffic" in element:
            duration_traffic = element["duration_in_traffic"]["text"]
            return f"Temps de trajet prévu vers {destination} au départ de {start_point} : {duration_traffic} (Trafic actuel inclus). Distance : {distance}."
        else:
            return f"Temps de trajet prévu vers {destination} au départ de {start_point} : {duration}. Distance : {distance}."
            
    except httpx.HTTPError as e:
        logger.error(f"Erreur HTTP Maps: {e}")
        return "Impossible de joindre le système de trafic actuellement."
    except Exception as e:
        logger.error(f"Erreur Maps: {e}")
        return "Une erreur inattendue est survenue avec le calcul de trajet."
