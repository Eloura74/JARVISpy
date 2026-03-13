from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import dotenv
from core.config import settings, get_settings
from modules.audio.tts import tts_instance
from modules.memory.manager import memory
from modules.services.vision import vision_service

router = APIRouter()

class SettingsUpdateModel(BaseModel):
    gemini_api_key: str = ""
    tavily_api_key: str = ""
    kokoro_voice: str = "ff_siwis"
    vision_enabled: bool = False
    camera_index: int = 0
    gmail_enabled: bool = False
    ha_url: str = ""
    ha_token: str = ""
    moonraker_url: str = ""
    bambu_ip: str = ""
    bambu_serial: str = ""
    bambu_access_code: str = ""
    toast_enabled: bool = True
    wa_default_phone: str = ""
    wa_notify_on_alerts: bool = False
    openweather_api_key: str = ""
    google_maps_api_key: str = ""
    default_city: str = ""
    proactive_enabled: bool = True
    presence_check_interval: int = 5
    absence_threshold: int = 600
    system_monitor_interval: int = 60
    ui_theme: str = "matrix"

@router.get("/api/settings")
async def get_current_settings():
    """Récupère les paramètres actuels (masqués)."""
    # On retourne les clés masquées pour la sécurité
    gemini_masked = f"{settings.gemini_api_key[:4]}...{settings.gemini_api_key[-4:]}" if len(settings.gemini_api_key) > 8 else ""
    tavily_masked = f"{settings.tavily_api_key[:4]}...{settings.tavily_api_key[-4:]}" if len(settings.tavily_api_key) > 8 else ""
    ha_token_masked = f"{settings.ha_token[:8]}...{settings.ha_token[-8:]}" if len(settings.ha_token) > 20 else ""
    openweather_masked = f"{settings.openweather_api_key[:4]}...{settings.openweather_api_key[-4:]}" if len(settings.openweather_api_key) > 8 else ""
    google_maps_masked = f"{settings.google_maps_api_key[:4]}...{settings.google_maps_api_key[-4:]}" if len(settings.google_maps_api_key) > 8 else ""
    
    return {
        "gemini_api_key": gemini_masked,
        "tavily_api_key": tavily_masked,
        "kokoro_voice": settings.kokoro_voice,
        "vision_enabled": settings.vision_enabled,
        "camera_index": settings.camera_index,
        "gmail_enabled": settings.gmail_enabled,
        "ha_url": settings.ha_url,
        "ha_token": ha_token_masked,
        "moonraker_url": settings.moonraker_url,
        "bambu_ip": settings.bambu_ip,
        "bambu_serial": settings.bambu_serial,
        "toast_enabled": settings.toast_enabled,
        "wa_default_phone": settings.wa_default_phone,
        "wa_notify_on_alerts": settings.wa_notify_on_alerts,
        "openweather_api_key": openweather_masked,
        "google_maps_api_key": google_maps_masked,
        "default_city": settings.default_city,
        # Versions brutes
        "_raw_gemini": settings.gemini_api_key,
        "_raw_tavily": settings.tavily_api_key,
        "_raw_ha_token": settings.ha_token,
        "_raw_openweather": settings.openweather_api_key,
        "_raw_google_maps": settings.google_maps_api_key,
        "proactive_enabled": settings.proactive_enabled,
        "presence_check_interval": settings.presence_check_interval,
        "absence_threshold": settings.absence_threshold,
        "system_monitor_interval": settings.system_monitor_interval,
    }

@router.post("/api/settings")
async def update_settings(update_data: SettingsUpdateModel):
    """Met à jour le fichier .env et recharge la configuration."""
    try:
        env_path = ".env"
        
        # S'il n'y a pas de fichier .env, on le crée
        if not os.path.exists(env_path):
            with open(env_path, "w") as f:
                f.write("")

        # Mise à jour avec dotenv
        if update_data.gemini_api_key and not update_data.gemini_api_key.startswith("AIzaS...") and not update_data.gemini_api_key.startswith("tvly-...") and "..." not in update_data.gemini_api_key:
            dotenv.set_key(env_path, "GEMINI_API_KEY", update_data.gemini_api_key)
            settings.gemini_api_key = update_data.gemini_api_key
            
        if update_data.tavily_api_key and "..." not in update_data.tavily_api_key:
             dotenv.set_key(env_path, "TAVILY_API_KEY", update_data.tavily_api_key)
             settings.tavily_api_key = update_data.tavily_api_key
             
        if update_data.kokoro_voice:
             dotenv.set_key(env_path, "KOKORO_VOICE", update_data.kokoro_voice)
             settings.kokoro_voice = update_data.kokoro_voice
             # On met aussi à jour l'instance en mémoire chaude
             tts_instance.voice = update_data.kokoro_voice

        # Nouvelles clés
        dotenv.set_key(env_path, "VISION_ENABLED", str(update_data.vision_enabled).lower())
        settings.vision_enabled = update_data.vision_enabled
        
        dotenv.set_key(env_path, "CAMERA_INDEX", str(update_data.camera_index))
        settings.camera_index = update_data.camera_index
        
        dotenv.set_key(env_path, "GMAIL_ENABLED", str(update_data.gmail_enabled).lower())
        settings.gmail_enabled = update_data.gmail_enabled
        
        dotenv.set_key(env_path, "HA_URL", update_data.ha_url)
        settings.ha_url = update_data.ha_url
        
        if update_data.ha_token and "..." not in update_data.ha_token:
             dotenv.set_key(env_path, "HA_TOKEN", update_data.ha_token)
             settings.ha_token = update_data.ha_token

        dotenv.set_key(env_path, "MOONRAKER_URL", update_data.moonraker_url)
        settings.moonraker_url = update_data.moonraker_url

        dotenv.set_key(env_path, "BAMBU_IP", update_data.bambu_ip)
        settings.bambu_ip = update_data.bambu_ip
        dotenv.set_key(env_path, "BAMBU_SERIAL", update_data.bambu_serial)
        settings.bambu_serial = update_data.bambu_serial
        if update_data.bambu_access_code and "..." not in update_data.bambu_access_code:
            dotenv.set_key(env_path, "BAMBU_ACCESS_CODE", update_data.bambu_access_code)
            settings.bambu_access_code = update_data.bambu_access_code

        dotenv.set_key(env_path, "TOAST_ENABLED", str(update_data.toast_enabled).lower())
        settings.toast_enabled = update_data.toast_enabled
        dotenv.set_key(env_path, "WA_DEFAULT_PHONE", update_data.wa_default_phone)
        settings.wa_default_phone = update_data.wa_default_phone
        dotenv.set_key(env_path, "WA_NOTIFY_ON_ALERTS", str(update_data.wa_notify_on_alerts).lower())
        settings.wa_notify_on_alerts = update_data.wa_notify_on_alerts

        # Services Externes
        if update_data.openweather_api_key and "..." not in update_data.openweather_api_key:
            dotenv.set_key(env_path, "OPENWEATHER_API_KEY", update_data.openweather_api_key)
            settings.openweather_api_key = update_data.openweather_api_key
            
        if update_data.google_maps_api_key and "..." not in update_data.google_maps_api_key:
            dotenv.set_key(env_path, "GOOGLE_MAPS_API_KEY", update_data.google_maps_api_key)
            settings.google_maps_api_key = update_data.google_maps_api_key
            
        dotenv.set_key(env_path, "DEFAULT_CITY", update_data.default_city)
        settings.default_city = update_data.default_city

        # Proactivité
        dotenv.set_key(env_path, "PROACTIVE_ENABLED", str(update_data.proactive_enabled).lower())
        settings.proactive_enabled = update_data.proactive_enabled
        
        dotenv.set_key(env_path, "PRESENCE_CHECK_INTERVAL", str(update_data.presence_check_interval))
        settings.presence_check_interval = update_data.presence_check_interval
        
        dotenv.set_key(env_path, "ABSENCE_THRESHOLD", str(update_data.absence_threshold))
        settings.absence_threshold = update_data.absence_threshold
        
        dotenv.set_key(env_path, "SYSTEM_MONITOR_INTERVAL", str(update_data.system_monitor_interval))
        settings.system_monitor_interval = update_data.system_monitor_interval

        # Thème UI
        dotenv.set_key(env_path, "UI_THEME", update_data.ui_theme)
        settings.ui_theme = update_data.ui_theme

        return {"status": "success", "message": "Paramètres sauvegardés avec succès. Redémarrage du serveur conseillé pour les clés."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la sauvegarde: {str(e)}")

@router.get("/api/settings/locations")
async def get_favorite_locations():
    """Récupère les adresses favorites (Maison, Travail)."""
    import json
    path = "data/locations.json"
    if not os.path.exists(path):
        return {"home": "", "work": ""}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.post("/api/settings/locations")
async def update_favorite_locations(data: dict):
    """Met à jour les adresses favorites."""
    import json
    path = "data/locations.json"
    # Créer le dossier data si absent
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    return {"status": "success", "message": "Adresses favorites mises à jour."}

@router.get("/api/voices")
async def get_available_voices():
    """Liste les voix disponibles dans le modèle Kokoro charge."""
    try:
        if tts_instance.kokoro is not None:
            return {"voices": tts_instance.kokoro.get_voices()}
        else:
             # Fallback si le modèle n'est pas chargé
             return {"voices": ["ff_siwis", "af_alloy", "am_echo", "am_onyx", "am_santa"]}
    except Exception as e:
        return {"voices": [settings.kokoro_voice]}

@router.get("/api/memory")
async def get_memory_facts():
    """Récupère l'ensemble des faits mémorisés par l'IA."""
    facts = memory.get_all_facts()
    # On transforme le dictionnaire en liste pour l'affichage Frontend
    return [{"key": k, "value": v} for k, v in facts.items()]

@router.delete("/api/memory/{key}")
async def delete_memory_fact(key: str):
    """Supprime un fait spécifique de la mémoire SQLite."""
    success = memory.forget_fact(key)
    if success:
        return {"status": "success", "message": f"Fait '{key}' supprimé."}
    else:
        raise HTTPException(status_code=404, detail="Fait non trouvé.")

@router.get("/api/vision/test")
async def test_vision_camera():
    """Teste la caméra et renvoie la frame en base64 pour affichage JS."""
    # Surcharger momentanément is_enabled pour s'assurer que le test marche même si non sauvegardé
    old_status = vision_service.is_enabled
    settings.vision_enabled = "true" 
    
    res = vision_service.capture_frame()
    
    settings.vision_enabled = str(old_status).lower() # Restaurer état
    
    if not res:
        raise HTTPException(status_code=500, detail="Impossible de capter l'image via OpenCV.")
        
    base64_data, mime_type = res
    return {"status": "success", "image": f"data:{mime_type};base64,{base64_data}"}
