import speech_recognition as sr
import asyncio
import threading
import time
from typing import Dict, Any

from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("audio.stt")

class SpeechToText:
    """
    Module d'écoute de JARVIS. Utilise le micro système pour capter la voix.
    """
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = None
        self.is_listening = False
        self.stop_listening_fn = None
        self.is_suspended = False  # True quand TTS parle
        
        # Ajustements pour la reconnaissance
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.energy_threshold = 400
        self.recognizer.pause_threshold = 0.8

    def _setup_mic(self):
        try:
            self.microphone = sr.Microphone()
            with self.microphone as source:
                logger.debug("Ajustement du bruit ambiant...")
                self.recognizer.adjust_for_ambient_noise(source, duration=1)
            logger.info("Microphone configuré avec succès.")
        except Exception as e:
            logger.error(f"Impossible d'accéder au microphone: {e}. PyAudio est-il bien installé ?")

    def _callback(self, recognizer, audio):
        """Fonction appelée automatiquement dès qu'une phrase est captée (Background thread)"""
        if self.is_suspended:
            logger.debug("Audio ignoré (J.A.R.V.I.S parle)")
            return
            
        try:
            logger.debug("Traitement audio en cours...")
            # On utilise Google Web Speech API pour le STT gratuit (pas besoin de clé)
            text = recognizer.recognize_google(audio, language="fr-FR")
            logger.info(f"Reconnu : '{text}'")
            
            # On émet l'événement vers la boucle asyncio principale
            target_loop = getattr(bus, 'main_loop', None)
            if target_loop and not target_loop.is_closed():
                asyncio.run_coroutine_threadsafe(
                    bus.emit("audio.speech_recognized", {"text": text}),
                    target_loop
                )
            else:
                logger.error("STT ne trouve pas la boucle asyncio principale (bus.main_loop)")
                
        except sr.UnknownValueError:
            logger.debug("Audio non compris.")
        except sr.RequestError as e:
            logger.error(f"Erreur service STT: {e}")
        except Exception as e:
            logger.error(f"Erreur STT inattendue: {e}")

    def start(self):
        """Lance l'écoute permanente du micro en arrière-plan"""
        if self.is_listening:
            return
            
        self._setup_mic()
        if not self.microphone:
            return
            
        logger.info("Module STT (Écoute) actif. Parlez !")
        self.is_listening = True
        
        # Lancement de l'écoute asynchrone native de speech_recognition
        # Cela lance son propre thread interne.
        self.stop_listening_fn = self.recognizer.listen_in_background(
            self.microphone, 
            self._callback,
            phrase_time_limit=10 # Coupe si on parle plus de 10s non-stop
        )

    def stop(self):
        """Arrête l'écoute du micro"""
        if self.is_listening and self.stop_listening_fn:
            self.stop_listening_fn(wait_for_stop=False)
            self.is_listening = False
            logger.info("Module STT arrêté.")
            
    async def _on_tts_start(self, payload: Dict[str, Any]):
        self.is_suspended = True
        
    async def _on_tts_stop(self, payload: Dict[str, Any]):
        # On attend une demi-seconde de plus pour éviter l'écho résiduel de la pièce
        await asyncio.sleep(0.5)
        self.is_suspended = False

# Instance globale
stt_instance = SpeechToText()

# On doit abonner stt_instance manuellement pour éviter boucle d'import (si appelé dans main)
bus.subscribe("audio.tts_started", stt_instance._on_tts_start)
bus.subscribe("audio.tts_stopped", stt_instance._on_tts_stop)
