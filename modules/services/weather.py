"""
Module Météo via OpenWeatherMap API
Fournit la météo actuelle et les prévisions simples pour JARVIS.
"""
import httpx
import re
from core.config import settings
from core.logger import get_logger

logger = get_logger("services.weather")

BASE_URL = "http://api.openweathermap.org/data/2.5"

def _get_api_key() -> str:
    key = settings.openweather_api_key
    if not key:
        logger.warning("Clé API OpenWeatherMap manquante. Le service météo ne fonctionnera pas.")
    return key

def _get_city(city: str) -> str:
    """Utilise la ville par défaut si aucune n'est spécifiée."""
    if not city:
        city = settings.default_city
    
    # Nettoyage des éventuels codes postaux (ex: "Istres 13800" -> "Istres")
    # On retire les nombres de 4 ou 5 chiffres en fin de chaîne
    if city:
        city = re.sub(r'\s*\d{4,5}$', '', city).strip()
    return city

def get_current_weather(city: str = "") -> str:
    """
    Récupère la météo en temps réel pour une ville donnée.
    Si la ville est vide, utilise la ville par défaut des paramètres.
    """
    api_key = _get_api_key()
    if not api_key:
        return "Clé API OpenWeatherMap non configurée dans les paramètres."
        
    target_city = _get_city(city)
    if not target_city:
        return "Aucune ville spécifiée et aucune ville par défaut dans les paramètres."

    try:
        response = httpx.get(
            f"{BASE_URL}/weather",
            params={
                "q": target_city,
                "appid": api_key,
                "units": "metric",
                "lang": "fr"
            },
            timeout=5.0
        )
        response.raise_for_status()
        data = response.json()
        
        desc = data["weather"][0]["description"]
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        humidity = data["main"]["humidity"]
        wind = data["wind"]["speed"] * 3.6  # m/s -> km/h
        
        return (
            f"Météo actuelle à {data['name']} : {desc}. "
            f"Température : {temp:.1f}°C (ressenti {feels_like:.1f}°C). "
            f"Humidité : {humidity}%, Vent : {wind:.1f} km/h."
        )
    except httpx.HTTPStatusError as e:
        logger.error(f"Erreur HTTP Météo: {e}")
        if e.response.status_code == 404:
            return f"Je n'ai pas pu trouver les données météo pour '{target_city}'. (Erreur 404)"
        return f"Impossible de récupérer la météo actuellement (erreur {e.response.status_code})."
    except Exception as e:
        logger.error(f"Erreur Météo: {e}")
        return "Une erreur inattendue est survenue avec le service météo."

def get_weather_forecast(city: str = "", days: int = 2) -> str:
    """
    Récupère les prévisions pour les X prochains jours.
    """
    api_key = _get_api_key()
    if not api_key:
        return "Clé API OpenWeatherMap non configurée."
        
    target_city = _get_city(city)
    if not target_city:
        return "Aucune ville spécifiée et aucune ville par défaut."

    # OpenWeather /forecast API (3-hour slots). We take max 'days' into account.
    cnt = days * 8 # 8 slots of 3 hours per day

    try:
        response = httpx.get(
            f"{BASE_URL}/forecast",
            params={
                "q": target_city,
                "appid": api_key,
                "units": "metric",
                "lang": "fr",
                "cnt": cnt
            },
            timeout=5.0
        )
        response.raise_for_status()
        data = response.json()
        
        forecasts = []
        # Extraction simplifiée : on prend un relevé par jour (autour de 12h00 si possible)
        for item in data.get("list", []):
            if "12:00:00" in item["dt_txt"] or len(forecasts) == 0:
                date = item["dt_txt"].split(" ")[0]
                desc = item["weather"][0]["description"]
                temp = item["main"]["temp"]
                
                # Check si on a pas déjà inséré ce jour
                if not any(date in f for f in forecasts):
                    forecasts.append(f"Le {date}: {desc}, {temp:.1f}°C")
                if len(forecasts) >= days:
                    break
                    
        return f"Prévisions pour {data['city']['name']} :\n" + "\n".join(forecasts)
    except httpx.HTTPStatusError as e:
        logger.error(f"Erreur HTTP Météo Prévision: {e}")
        if e.response.status_code == 404:
            return f"Je n'ai pas pu trouver les prévisions météo pour '{target_city}'."
        return f"Impossible de récupérer les prévisions actuellement (erreur {e.response.status_code})."
    except Exception as e:
        logger.error(f"Erreur Météo Prévision: {e}")
        return "Impossible de récupérer les prévisions."
