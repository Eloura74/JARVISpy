import pyttsx3
import asyncio
import threading
import queue
from typing import Dict, Any

from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("audio.tts")

class TextToSpeech:
    """
    Module vocal de JARVIS. Prononce à voix haute les réponses générées.
    Utilise un thread dédié en boucle infinie (Worker) pour pyttsx3, 
    car SAPI5 (Windows API) deteste être appelé depuis plusieurs threads.
    """
    def __init__(self):
        self.queue = queue.Queue()
        self.loop = None
        self._worker_thread = threading.Thread(target=self._tts_worker, daemon=True)

    def _tts_worker(self):
        """Thread travailleur dédié unique pour pyttsx3. Évite les freezes (run loop already started)"""
        # Il est CRITIQUE d'initialiser pyttsx3 explicitement DANS le thread qui l'utilise.
        try:
            # On force le driver 'sapi5' qui est le natif Windows pour éviter les bugs silents
            engine = pyttsx3.init('sapi5')
            voices = engine.getProperty('voices')
            french_voice = next((v for v in voices if 'fr' in v.languages or 'French' in v.name), None)
            if french_voice:
                engine.setProperty('voice', french_voice.id)
            engine.setProperty('rate', 160)
            logger.info("Moteur TTS initialisé dans son worker thread.")
        except Exception as e:
            logger.error(f"Erreur initialisation TTS: {e}")
            return

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
                    
                logger.debug("Début lecture TTS")
                
                # Le runAndWait est ce qui joue réellement le son sous SAPI5
                engine.say(text)
                engine.runAndWait()
                # On attend une demi seconde après la parole pour laisser l'audio se finir
                import time
                time.sleep(0.5)
                
                logger.debug("Fin lecture TTS")
                
            except Exception as e:
                logger.error(f"Erreur pendant la lecture TTS: {e}")
                # Réinitialisation de secours si le moteur crash
                try:
                    engine = pyttsx3.init('sapi5')
                    engine.setProperty('rate', 160)
                except:
                    pass
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
