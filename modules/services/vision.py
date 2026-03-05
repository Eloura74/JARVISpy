import cv2
import base64
import time
from typing import Optional, Tuple
import json
from core.logger import get_logger
from core.config import settings

logger = get_logger("services.vision")

class VisionService:
    """
    Module gérant l'accès à la webcam via OpenCV.
    Permet de capturer une image à la demande et de l'encoder en base64
    pour qu'elle soit analysable par le modèle Gemini Multimodal.
    """
    def __init__(self):
        self._cam = None
        self._last_capture_time = 0

    @property
    def camera_index(self) -> int:
        return int(settings.camera_index)

    @property
    def is_enabled(self) -> bool:
        return settings.vision_enabled.lower() == "true"

    def _init_camera(self) -> bool:
        """Initialise la connexion à la caméra si nécessaire."""
        if not self.is_enabled:
            logger.warning("La vision par ordinateur est désactivée dans les paramètres.")
            return False

        if self._cam is None or not self._cam.isOpened():
            logger.info(f"Initialisation de la caméra OpenCV (Index: {self.camera_index})...")
            self._cam = cv2.VideoCapture(self.camera_index)
            
            # Paramétrer une résolution basse/moyenne pour économiser les tokens Gemini
            self._cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            self._cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
            
            # Attendre quelques millisecondes que le capteur s'allume
            time.sleep(1)

        if not self._cam.isOpened():
            logger.error("Impossible d'ouvrir la caméra. Vérifiez qu'elle n'est pas utilisée.")
            return False
            
        return True

    def capture_frame(self) -> Optional[Tuple[str, str]]:
        """
        Capture une frame, la compresse en JPEG, et l'encode en Base64.
        Retourne : (base64_string, mime_type) ou None si erreur.
        """
        if not self._init_camera():
            return None

        # Vider le buffer : OpenCV a tendance à renvoyer de vieilles images dans le buffer de capture
        # On lit quelques frames rapidement pour avoir l'image la plus récente au moment où JARVIS le demande
        for _ in range(5):
            self._cam.grab()

        ret, frame = self._cam.read()
        
        # On libère la caméra tout de suite pour ne pas la monopoliser (la LED de la webcam s'éteint)
        # Cela évite de laisser le micro/caméra allumés H24 pour des raisons de vie privée et de perfs
        self._release_camera()

        if not ret:
            logger.error("Erreur lors de la capture de l'image (frame vide).")
            return None

        # Compression JPEG (Qualité moyenne pour réduire la taille de la charge utile Base64)
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 75]
        result, encimg = cv2.imencode('.jpg', frame, encode_param)

        if not result:
            logger.error("Échec de l'encodage JPEG de la frame.")
            return None

        # Encodage Base64
        base64_data = base64.b64encode(encimg).decode('utf-8')
        mime_type = "image/jpeg"
        
        logger.info("Image caméra capturée et encodée avec succès.")
        return base64_data, mime_type

    def _release_camera(self):
        """Libère les ressources matérielles de la caméra."""
        if self._cam is not None:
            self._cam.release()
            self._cam = None

    def analyze_surroundings(self) -> str:
        """
        Outil appelé par l'IA pour voir ce qui l'entoure via la caméra locale.
        Retourne le flux optique en JSON et Base64 pour l'analyse visuelle par le modèle Gemini Flash !
        """
        if not self.is_enabled:
            return "ÉCHEC: Tes yeux informatiques (Webcam) sont désactivés dans les paramètres utilisateur. Tu es aveugle."
            
        # Si on a pris une photo il y a moins de 5 secondes, on évite le spam
        now = time.time()
        if now - self._last_capture_time < 5:
            return "Veuillez patienter quelques secondes avant la prochaine capture pour éviter les surcharges matérielles."
            
        self._last_capture_time = now
        
        logger.info("J.A.R.V.I.S utilise ses yeux OpenCV pour observer l'environnement...")
        res = self.capture_frame()
        if not res:
            return "ÉCHEC: Impossible de capter un retour vidéo sur la caméra MAMAN spécifiée. Elle est peut-être utilisée par un autre logiciel."
            
        base64_data, mime_type = res
        
        # Le SDK Gemini peut traiter des structures imbriquées d'images si on les convertit au format adéquat
        # Normalement le Multimodal API v2 / google-genai s'attend à un dictionnaire clair.
        import platform
        return json.dumps({
            "status": "success_vision",
             "message": f"Voici une photo capturée par tes capteurs optiques à l'instant même (Sur Windows {platform.system()}). Décris ce que tu vois et répond à la requête de M. le Directeur !",
             "inlineData": {
                 "data": base64_data,
                 "mimeType": mime_type
             }
        })

# Instance Singleton globale
vision_service = VisionService()
