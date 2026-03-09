import httpx
from core.config import settings
from core.logger import get_logger

logger = get_logger("services.moonraker")

class MoonrakerClient:
    """
    Client HTTP léger pour l'API REST Moonraker (Klipper).
    Toutes les requêtes passent par ici avec timeout court pour ne pas bloquer JARVIS.
    """
    TIMEOUT = 4.0  # secondes — Klipper est local, donc rapide

    @property
    def base_url(self) -> str:
        return settings.moonraker_url.rstrip('/')

    @property
    def is_configured(self) -> bool:
        return bool(settings.moonraker_url)

    async def get(self, path: str) -> dict:
        """Effectue un GET asynchrone sur l'API Moonraker."""
        if not self.is_configured:
            return {"error": "MOONRAKER_URL non configuré."}
        try:
            url = f"{self.base_url}{path}"
            async with httpx.AsyncClient(timeout=self.TIMEOUT) as client:
                resp = await client.get(url)
                resp.raise_for_status()
                return resp.json()
        except Exception as e:
            logger.error(f"Moonraker GET {path}: {e}")
            return {"error": str(e)}

    async def post(self, path: str, body: dict | None = None) -> dict:
        """Effectue un POST asynchrone sur l'API Moonraker."""
        if not self.is_configured:
            return {"error": "MOONRAKER_URL non configuré."}
        try:
            url = f"{self.base_url}{path}"
            async with httpx.AsyncClient(timeout=self.TIMEOUT) as client:
                resp = await client.post(url, json=body or {})
                resp.raise_for_status()
                return resp.json()
        except Exception as e:
            logger.error(f"Moonraker POST {path}: {e}")
            return {"error": str(e)}

# Instance singleton partagée entre les modules status/control
moonraker_client = MoonrakerClient()
