import cv2
import base64
import time
import json
import platform
from typing import Optional, Tuple
from core.logger import get_logger
from core.config import settings

logger = get_logger("services.vision")

class VisionService:
    """
    Module gérant l'accès à la webcam via OpenCV.
    Permet de capturer une image à la demande pour l'IA ou de détecter une présence humaine localement.
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

    def _init_camera(self, low_res=True) -> bool:
        """Initialise la connexion à la caméra si nécessaire."""
        if not self.is_enabled:
            logger.warning("La vision par ordinateur est désactivée dans les paramètres.")
            return False

        if self._cam is None or not self._cam.isOpened():
            logger.info(f"Initialisation de la caméra OpenCV (Index: {self.camera_index})...")
            self._cam = cv2.VideoCapture(self.camera_index)
            
            if low_res:
                # Paramétrer une résolution basse pour économiser les ressources et les tokens
                self._cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
                self._cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
            
            # Attendre que le capteur s'allume
            time.sleep(0.5)

        if not self._cam.isOpened():
            logger.error("Impossible d'ouvrir la caméra.")
            return False
            
        return True

    def _release_camera(self):
        """Libère les ressources matérielles de la caméra."""
        if self._cam is not None:
            self._cam.release()
            self._cam = None

    def capture_frame(self) -> Optional[Tuple[str, str]]:
        """
        Capture une frame, la compresse en JPEG, et l'encode en Base64.
        """
        try:
            if not self._init_camera():
                return None

            # Vider le buffer
            for _ in range(3):
                self._cam.grab()

            ret, frame = self._cam.read()
            if not ret:
                logger.error("Erreur capture frame.")
                return None

            # Compression JPEG Qualité 75
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 75]
            result, encimg = cv2.imencode('.jpg', frame, encode_param)

            if not result:
                return None

            base64_data = base64.b64encode(encimg).decode('utf-8')
            return base64_data, "image/jpeg"
        finally:
            self._release_camera()

    def analyze_surroundings(self) -> str:
        """Outil pour l'IA : capture et description de l'environnement."""
        if not self.is_enabled:
            return "ÉCHEC: Caméra désactivée."
            
        now = time.time()
        if now - self._last_capture_time < 3:
            return "Veuillez patienter entre deux captures."
            
        self._last_capture_time = now
        res = self.capture_frame()
        if not res:
            return "ÉCHEC: Caméra inaccessible."
            
        base64_data, mime_type = res
        return json.dumps({
            "status": "success_vision",
            "message": f"Photo capturée sur {platform.system()}.",
            "inlineData": {
                "data": base64_data,
                "mimeType": mime_type
            }
        })

    def detect_presence(self) -> bool:
        """
        Détection rapide de présence humaine via Haar Cascades (Local).
        Retourne True si un visage est détecté.
        """
        try:
            if not self._init_camera(low_res=True):
                return False
                
            ret, frame = self._cam.read()
            if not ret:
                return False
                
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            face_cascade = cv2.CascadeClassifier(cascade_path)
            
            faces = face_cascade.detectMultiScale(
                gray, 
                scaleFactor=1.3, 
                minNeighbors=5, 
                minSize=(30, 30)
            )
            
            return len(faces) > 0
        except Exception as e:
            logger.error(f"Erreur présence: {e}")
            return False
        finally:
            self._release_camera()

# Singleton
vision_service = VisionService()
