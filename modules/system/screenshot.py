"""
Capture d'écran Windows via mss — renvoi JPEG base64 compressé pour Gemini Vision.
"""
import base64
import io
import json
import mss
from PIL import Image
from core.logger import get_logger

logger = get_logger("system.screenshot")

def analyze_screen(monitor_index: int = 1) -> str:
    """
    Capture et analyse l'écran Windows avec Gemini Vision.
    Appelle cet outil quand l'utilisateur dit: 'regarde mon écran', 'analyse ce que je vois',
    'lis ce document', 'explique cette erreur à l'écran', 'traduis ce texte'.
    monitor_index: 1=écran principal, 2=second écran.
    """
    try:
        with mss.mss() as sct:
            monitors = sct.monitors  # [0]=tous, [1+]=écrans individuels
            idx = min(monitor_index, len(monitors) - 1)
            screenshot = sct.grab(monitors[idx])

        img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")

        # Redimensionner pour limiter les tokens (max 1280px largeur)
        if img.width > 1280:
            ratio = 1280 / img.width
            img = img.resize((1280, int(img.height * ratio)), Image.LANCZOS)

        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=55, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode()

        logger.info(f"Screenshot: monitor {idx} ({img.width}x{img.height})")
        return json.dumps({
            "type": "screen_capture",
            "mime_type": "image/jpeg",
            "data": b64,
            "resolution": f"{img.width}x{img.height}",
        })
    except Exception as e:
        logger.error(f"Erreur screenshot: {e}")
        return f"Impossible de capturer l'écran: {str(e)}"
