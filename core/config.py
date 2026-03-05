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
    
    # Base de données
    db_path: str = "data/jarvis.db"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
