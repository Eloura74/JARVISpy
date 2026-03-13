import asyncio
import threading
import queue
import sounddevice as sd
from kokoro_onnx import Kokoro
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
        # Buffer pour accumuler les fragments courts et améliorer la fluidité
        self._fragment_buffer = []
        self._buffer_lock = threading.Lock()
        self._last_fragment_time = 0
        
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
                    logger.info(f"🎤 Génération & Lecture audio Kokoro en cours pour : '{text[:30]}...'")
                    
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

    async def _handle_stream_fragment(self, payload: Dict[str, Any]):
        """
        Capture un fragment de phrase avec buffer intelligent.
        Regroupe les fragments courts pour éviter les pauses étranges.
        """
        text = payload.get("text", "")
        if not text:
            return
        
        import time
        current_time = time.time()
        
        with self._buffer_lock:
            self._fragment_buffer.append(text)
            
            # Conditions d'envoi au TTS :
            # 1. Fragment long (> 50 caractères) = envoi immédiat
            # 2. Ponctuation forte finale (. ! ?) = phrase complète
            # 3. Buffer accumulé > 80 caractères = évite trop d'accumulation
            # 4. Timeout de 1.5s depuis dernier fragment = fin probable
            
            buffer_text = " ".join(self._fragment_buffer)
            is_long_fragment = len(text) > 50
            has_strong_punct = text.rstrip().endswith(('.', '!', '?'))
            buffer_full = len(buffer_text) > 80
            timeout_reached = (current_time - self._last_fragment_time) > 1.5 if self._last_fragment_time > 0 else False
            
            should_flush = is_long_fragment or has_strong_punct or buffer_full or timeout_reached
            
            if should_flush and buffer_text.strip():
                logger.info(f"TTS (Stream) met en file d'attente : '{buffer_text[:40]}...'")
                self.queue.put(buffer_text)
                self._fragment_buffer = []
            
            self._last_fragment_time = current_time

    def start(self):
        """Lance le worker et abonne le module aux événements de streaming"""
        self._worker_thread.start()
        # On s'abonne au flux de fragments pour plus de réactivité
        bus.subscribe("brain.stream_fragment", self._handle_stream_fragment)
        # On garde l'ancien pour compatibilité avec d'autres modules si besoin, 
        # mais on ne l'utilise plus pour le TTS principal pour éviter les doublons.
        # bus.subscribe("brain.response_generated", self._handle_response)
        logger.info("Module TTS (Voix) actif en mode Streaming.")

# Instance globale
tts_instance = TextToSpeech()
