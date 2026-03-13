import requests
import datetime
import asyncio
import json
import os
from typing import Optional, Dict, Any, Union
from core.logger import get_logger
from core.config import settings
from core.event_bus import bus

logger = get_logger("services.maps")

class MapsService:
    """
    Service d'interaction avec Google Maps Platform (Directions API).
    Gère le calcul d'itinéraires réels avec polyline et trafic.
    """
    
    def __init__(self):
        self.base_url = "https://maps.googleapis.com/maps/api/directions/json"

    @property
    def api_key(self) -> str:
        return settings.google_maps_api_key

    def get_travel_info(self, destination: str, origin: str = "maison", arrival_time: Optional[str] = None) -> Dict[str, Any]:
        """
        Calcule l'itinéraire réel (polyline) et l'heure de départ conseillée.
        """
        if not self.api_key:
            return {"error": "Clé API Google Maps manquante."}

        # Résolution des favoris
        loc_path = "data/locations.json"
        favs = {}
        if os.path.exists(loc_path):
            try:
                with open(loc_path, "r", encoding="utf-8") as f:
                    favs = json.load(f)
            except: pass
        
        synonyms = {"maison": "home", "domicile": "home", "travail": "work", "bureau": "work", "job": "work"}
        search_origin = synonyms.get(origin.lower(), origin.lower())
        search_dest = synonyms.get(destination.lower(), destination.lower())

        real_origin = favs.get(search_origin, origin)
        real_dest = favs.get(search_dest, destination)

        # Parsing heure
        target_dt = None
        if arrival_time:
            try:
                now = datetime.datetime.now()
                clean_time = arrival_time.lower().replace('h', ':').strip()
                if clean_time.endswith(':'): clean_time += '00'
                h, m = map(int, clean_time.split(':'))
                target_dt = now.replace(hour=h, minute=m, second=0, microsecond=0)
                if target_dt < now: target_dt += datetime.timedelta(days=1)
            except: pass

        params = {
            "origin": real_origin,
            "destination": real_dest,
            "key": self.api_key,
            "mode": "driving",
            "language": "fr",
            "traffic_model": "best_guess"
        }

        if target_dt:
            # Estimation départ pour avoir l'impact du trafic à l'heure voulue
            params["departure_time"] = int((target_dt - datetime.timedelta(minutes=45)).timestamp())
        else:
            params["departure_time"] = "now"

        try:
            logger.info(f"Requête Directions: {real_origin} -> {real_dest}")
            response = requests.get(self.base_url, params=params)
            data = response.json()

            if data["status"] != "OK":
                return {"error": f"Erreur Google Maps: {data.get('error_message', data['status'])}"}

            # Récupération de tous les itinéraires disponibles
            routes = data.get("routes", [])
            if not routes:
                return {"error": "Aucun itinéraire trouvé"}
            
            route = routes[0]  # Itinéraire principal
            leg = route["legs"][0]
            
            # Temps avec trafic (si dispo)
            duration_text = leg["duration_in_traffic"]["text"] if "duration_in_traffic" in leg else leg["duration"]["text"]
            duration_seconds = leg["duration_in_traffic"]["value"] if "duration_in_traffic" in leg else leg["duration"]["value"]
            
            result = {
                "origin": leg["start_address"],
                "destination": leg["end_address"],
                "distance": leg["distance"]["text"],
                "duration": duration_text,
                "duration_seconds": duration_seconds,
                "polyline": route["overview_polyline"]["points"],
                "api_key": self.api_key
            }
            logger.info(f"Itinéraire résolu : {result['distance']} en {result['duration']}. Polyline (début): {result['polyline'][:20]}...")

            if target_dt:
                departure_dt = target_dt - datetime.timedelta(seconds=duration_seconds + 300)
                result["suggested_departure"] = departure_dt.strftime("%H:%M")
                result["arrival_target"] = target_dt.strftime("%H:%M")

            # Émission pour le widget (qui a besoin du polyline)
            if hasattr(bus, 'main_loop') and bus.main_loop:
                bus.main_loop.create_task(bus.emit("maps.travel_info", result))
            else:
                asyncio.create_task(bus.emit("maps.travel_info", result))

            # Ajout des itinéraires alternatifs si disponibles
            alternatives = []
            if len(routes) > 1:
                for i, alt_route in enumerate(routes[1:3], 1):  # Max 2 alternatives
                    alt_leg = alt_route["legs"][0]
                    alt_duration = alt_leg["duration_in_traffic"]["text"] if "duration_in_traffic" in alt_leg else alt_leg["duration"]["text"]
                    alt_distance = alt_leg["distance"]["text"]
                    alternatives.append({
                        "route_number": i + 1,
                        "duration": alt_duration,
                        "distance": alt_distance,
                        "via": alt_route.get("summary", f"Itinéraire {i+1}")
                    })
            
            result["alternatives"] = alternatives

            # Résultat épuré pour le LLM (sans le polyline énorme et sans la clé API)
            llm_result = {
                "destination": result["destination"],
                "distance": result["distance"],
                "duration": result["duration"],
            }
            if target_dt:
                llm_result["suggested_departure"] = result["suggested_departure"]
            
            # Ajout des alternatives pour le LLM
            if alternatives:
                llm_result["alternatives"] = alternatives
                llm_result["alternatives_count"] = len(alternatives)

            return llm_result

        except Exception as e:
            logger.error(f"Erreur service Maps: {e}")
            return {"error": str(e)}

# Singleton
maps_service = MapsService()
