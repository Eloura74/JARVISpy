import asyncio
import threading
import queue
import os
import edge_tts
import pygame
from typing import Dict, Any

from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("audio.tts")

class TextToSpeech:
    """
    Module vocal de JARVIS. Prononce à voix haute les réponses générées.
    Utilise Edge-TTS pour une voix neuronale naturelle et Pygame pour l'audio.
    """
    def __init__(self):
        self.queue = queue.Queue()
        self.loop = None
        self._worker_thread = threading.Thread(target=self._tts_worker, daemon=True)
        # Voix Microsoft Azure gratuite (Denise est très naturelle)
        self.voice = "fr-FR-DeniseNeural" 
        
        # Initialisation de pygame mixer pour jouer l'audio
        try:
            pygame.mixer.init()
        except Exception as e:
            logger.error(f"Erreur initialisation pygame.mixer: {e}")

    def _tts_worker(self):
        """Thread travailleur dédié pour gérer la génération et la lecture audio, un par un."""
        logger.info("Moteur Edge-TTS initialisé dans son worker thread.")
        
        # Préparation du dossier temporaire
        os.makedirs(".gemini", exist_ok=True)
        temp_file = ".gemini/temp_speech.mp3"

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
                    
                logger.debug("Génération audio Edge-TTS...")
                
                # Fonction asynchrone isolée pour appeler Edge-TTS depuis ce thread
                async def generate_speech():
                    communicate = edge_tts.Communicate(text, self.voice)
                    await communicate.save(temp_file)
                    
                asyncio.run(generate_speech())
                
                logger.debug("Début lecture TTS (Pygame)")
                
                # Lecture via Pygame
                pygame.mixer.music.load(temp_file)
                pygame.mixer.music.play()
                
                # Attente active (bloque le worker tant que la phrase n'est pas finie)
                while pygame.mixer.music.get_busy():
                    pygame.time.Clock().tick(10)
                    
                # Libération du fichier pour pouvoir l'écraser à la prochaine phrase
                pygame.mixer.music.unload()
                
                logger.debug("Fin lecture TTS")
                
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
