import cv2
import io
from PIL import Image
from google import genai
from google.genai import types

from core.logger import get_logger
from core.config import settings

logger = get_logger("vision.camera")

def analyze_visual_environment(prompt_specifique: str = "Décris en détail ce que tu vois devant toi.") -> str:
    """
    Outil principal permettant à J.A.R.V.I.S de prendre une capture via la webcam
    pour l'analyser visuellement et répondre à des questions sur son environnement.
    Utilise intelligemment la compression (800x800, JPEG 85%) pour rester léger sur l'API Gemini (Free Tier).
    """
    logger.info("Tentative d'activation de la webcam...")
    
    # 1. Capture matérielle rapide via OpenCV
    # Note: 0 est l'index de la caméra par défaut (webcam principale)
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        logger.error("Impossible d'accéder à la Webcam (Index 0).")
        return "Erreur système : Mes capteurs optiques (Webcam) sont inaccessibles, débranchés ou bloqués par le système."
        
    logger.debug("Webcam ouverte. Stabilisation de l'exposition...")
    
    # On vide le buffer (il faut purger quelques frames pour que l'exposition auto de la caméra s'ajuste)
    for _ in range(5):
        cap.read()
        
    # Capture de la vraie trame
    ret, frame = cap.read()
    
    # On libère IMMEDIATEMENT la ressource matérielle pour la vie privée
    cap.release()
    cv2.destroyAllWindows()
    
    if not ret:
        logger.error("La capture de l'image a échoué.")
        return "Erreur système : J'ai pu accéder au capteur, mais l'image obtenue est corrompue."
        
    logger.debug("Image capturée avec succès. Compression en cours...")
    
    try:
        # 2. Convertir d'OpenCV (BGR) à PIL (RGB)
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(frame_rgb)
        
        # Redimensionnement (pour rester sous les limites des "free tokens" et garantir la rapidité)
        # 800x800 est idéal pour une analyse générale de l'environnement
        pil_img.thumbnail((800, 800), Image.Resampling.LANCZOS)
        
        # Export en tableau d'octets JPEG compressé
        img_byte_arr = io.BytesIO()
        pil_img.save(img_byte_arr, format='JPEG', quality=85)
        img_data = img_byte_arr.getvalue()
        
        # 3. Sous-requête directe à Gemini
        logger.info(f"Analyse multimodale en cours via Gemini - Prompt envoyé: '{prompt_specifique}'")
        if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
             return "Je ne peux pas analyser mon environnement: ma clé API Gemini n'est pas renseignée."
             
        client = genai.Client(api_key=settings.gemini_api_key)
        
        # L'image est passée correctement via google-genai
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt_specifique, types.Part.from_bytes(data=img_data, mime_type="image/jpeg")]
        )
        
        logger.info("Analyse visuelle terminée par le cerveau central.")
        return response.text
        
    except Exception as e:
        logger.error(f"Échec de l'analyse visuelle de Gemini: {e}")
        return f"Erreur critique lors de l'analyse d'image multimodale : {str(e)}"
