import asyncio
import threading
import queue
import sounddevice as sd
from kokoro_onnx import Kokoro
from typing import Dict, Any
from typing import Dict, Any

from core.logger import get_logger
from core.event_bus import bus
from core.config import settings

logger = get_logger("audio.tts")

class TextToSpeech:
    """
    Module vocal de JARVIS. Prononce à voix haute les réponses générées.
    Utilise Kokoro-ONNX pour une voix neuronale extrêmement réaliste et 100% locale.
    """
    def __init__(self):
        self.queue = queue.Queue()
        self.loop = None
        self._worker_thread = threading.Thread(target=self._tts_worker, daemon=True)
        # Voix chargée depuis la configuration
        self.voice = settings.kokoro_voice
        
        # Initialisation du modèle Kokoro ONNX
        try:
            model_path = "models/kokoro/kokoro-v1.0.onnx"
            voices_path = "models/kokoro/voices-v1.0.bin"
            logger.info("Chargement du modèle vocal Kokoro en mémoire...")
            self.kokoro = Kokoro(model_path, voices_path)
            logger.info("Modèle Kokoro chargé avec succès.")
        except Exception as e:
            logger.error(f"Erreur initialisation Kokoro TTS: {e}")
            self.kokoro = None

    def _tts_worker(self):
        """Thread travailleur dédié pour gérer la génération et la lecture audio, un par un."""
        logger.info("Moteur Kokoro TTS prêt dans son worker thread.")

        while True:
            text = self.queue.get()
            if text is None:
                break
                
            try:
                main_loop = getattr(bus, 'main_loop', None)
                # Notification de début de parole (pour couper le micro STT)
                if main_loop and not main_loop.is_closed():
                    main_loop.call_soon_threadsafe(
                        lambda: asyncio.create_task(bus.emit("audio.tts_started", {}))
                    )
                    
                if self.kokoro:
                    logger.debug("Génération audio Kokoro en cours...")
                    
                    # Kokoro supporte la génération directe de l'audio en mémoire (array Numpy)
                    # "fr-fr" pour le français.
                    samples, sample_rate = self.kokoro.create(
                        text, voice=self.voice, speed=1.0, lang="fr-fr"
                    )
                    
                    logger.debug("Début lecture TTS (Sounddevice)")
                    
                    # Lecture instantanée et attente
                    sd.play(samples, sample_rate)
                    sd.wait()
                    
                    logger.debug("Fin lecture TTS")
                else:
                    logger.error("Le modèle Kokoro n'est pas initialisé.")
                
            except Exception as e:
                logger.error(f"Erreur pendant la lecture TTS: {e}")
            finally:
                main_loop = getattr(bus, 'main_loop', None)
                # Notification de fin de parole (pour réactiver le micro STT)
                if main_loop and not main_loop.is_closed():
                    main_loop.call_soon_threadsafe(
                        lambda: asyncio.create_task(bus.emit("audio.tts_stopped", {}))
                    )
                    
                self.queue.task_done()

    async def _handle_response(self, payload: Dict[str, Any]):
        """Capture l'événement de texte généré et le place dans la file d'attente"""
        text = payload.get("text", "")
        if not text:
            return
            
        logger.debug(f"TTS met en file d'attente : {text[:30]}...")
        self.queue.put(text)

    def start(self):
        """Lance le worker et abonne le module aux événements"""
        self._worker_thread.start()
        bus.subscribe("brain.response_generated", self._handle_response)
        logger.info("Module TTS (Voix) actif.")

# Instance globale
tts_instance = TextToSpeech()
