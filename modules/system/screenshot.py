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
    Capture l'écran spécifié pour analyse visuelle par Gemini.
    Appelle cet outil quand l'utilisateur demande d'analyser son écran, de lire un document ouvert
    ou d'expliquer une erreur visuelle.
    
    Args:
        monitor_index: Index de l'écran (1 pour principal, 2 pour secondaire, etc.).
    """
    try:
        with mss.mss() as sct:
            monitors = sct.monitors
            # monitors[0] est l'ensemble des écrans, monitors[1] est le premier écran
            if monitor_index >= len(monitors):
                logger.warning(f"Écran {monitor_index} non trouvé, retour sur l'écran 1")
                monitor_index = 1
                
            screenshot = sct.grab(monitors[monitor_index])

        # Conversion en image PIL
        img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")

        # Redimensionnement optimisé pour l'IA (max 1600px pour plus de détails OCR)
        if img.width > 1600:
            ratio = 1600 / img.width
            img = img.resize((1600, int(img.height * ratio)), Image.LANCZOS)

        # Encodage JPEG progressif haute qualité mais compressé
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=70, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode()

        logger.info(f"Capture écran {monitor_index} réussie ({img.width}x{img.height})")
        
        # Format spécifique pour que le Cerveau reconnaisse l'image
        return json.dumps({
            "type": "image_data",
            "mime_type": "image/jpeg",
            "data": b64,
            "description": f"Capture de l'écran {monitor_index}"
        })
    except Exception as e:
        logger.error(f"Erreur lors de la capture d'écran : {e}")
        return f"Erreur système : impossible de capturer l'écran {monitor_index}."
