from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    """
    Configuration globale de l'application chargée depuis le fichier .env
    """
    app_name: str = "JarvisDecoupe"
    environment: str = "development"
    log_level: str = "INFO"
    
    api_host: str = "127.0.0.1"
    api_port: int = 8000
    
    gemini_api_key: str = ""
    tavily_api_key: str = ""
    kokoro_voice: str = "ff_siwis"
    
    # Nouvelles Intégrations
    vision_enabled: str = "false"
    camera_index: str = "0"
    gmail_enabled: str = "false"
    ha_url: str = ""
    ha_token: str = ""
    moonraker_url: str = ""
    bambu_ip: str = ""
    bambu_serial: str = ""
    bambu_access_code: str = ""
    # Notifications
    toast_enabled: str = "true"
    wa_default_phone: str = ""
    wa_notify_on_alerts: str = "false"
    
    # Nouvelles Intégrations (Services Externes)
    openweather_api_key: str = ""
    google_maps_api_key: str = ""
    default_city: str = ""
    
    # Paramètres de Proactivité
    proactive_enabled: str = "true"
    presence_check_interval: int = 5
    absence_threshold: int = 600
    system_monitor_interval: int = 60
    
    # UI
    ui_theme: str = "matrix"
    
    # Base de données
    db_path: str = "data/jarvis.db"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
