import speech_recognition as sr
import asyncio
import threading
import time
import numpy as np
from faster_whisper import WhisperModel
from typing import Dict, Any

from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("audio.stt")

class SpeechToText:
    """
    Module d'écoute de JARVIS. Utilise le micro système pour capter la voix et Faster-Whisper pour STT.
    """
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = None
        self.is_listening = False
        self.stop_listening_fn = None
        self.is_suspended = False  # True quand TTS parle
        
        # Ajustements pour la reconnaissance (VAD)
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.energy_threshold = 400
        self.recognizer.pause_threshold = 0.8
        
        # Initialisation de Faster-Whisper
        # FIX: On force le CPU pour éviter l'erreur "cublas64_12.dll introuvable" si CUDA n'est pas installé
        logger.info("Chargement du modèle Whisper (small) en mémoire sur CPU...")
        self.model = WhisperModel("small", device="cpu", compute_type="int8")
        logger.info("Modèle Whisper chargé et prêt.")

    def _setup_mic(self, recalibrate=True):
        try:
            if not self.microphone:
                self.microphone = sr.Microphone()
                
            if recalibrate:
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
            logger.debug("Traitement audio Whisper en cours...")
            # Convertir l'audio capté en numpy array 16kHz float32 pour Whisper
            audio_data = np.frombuffer(audio.get_raw_data(convert_rate=16000, convert_width=2), np.int16).flatten().astype(np.float32) / 32768.0
            
            # Transcription via Faster-Whisper
            segments, info = self.model.transcribe(audio_data, beam_size=5, language="fr", condition_on_previous_text=False)
            
            text = "".join([segment.text for segment in segments]).strip()
            
            # Filtrage des hallucinations connues de Whisper (sur du silence)
            hallucinations = [
                "sous-titres réalisés",
                "amara.org",
                "merci de votre attention",
                "sous-titrage",
            ]
            text_lower = text.lower()
            if any(h in text_lower for h in hallucinations):
                logger.debug(f"Hallucination Whisper ignorée: '{text}'")
                return
            
            # Éviter les bruits très courts
            if not text or len(text) < 2:
                return
                
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
                
        except Exception as e:
            logger.error(f"Erreur STT inattendue: {e}")

    def start(self, recalibrate=True):
        """Lance l'écoute permanente du micro en arrière-plan"""
        if self.is_listening:
            return
            
        self._setup_mic(recalibrate=recalibrate)
        if not self.microphone:
            return
            
        if recalibrate:
            logger.info("Module STT (Écoute) actif. Parlez !")
        self.is_listening = True
        
        # Lancement de l'écoute asynchrone native de speech_recognition
        # Cela lance son propre thread interne.
        self.stop_listening_fn = self.recognizer.listen_in_background(
            self.microphone, 
            self._callback,
            phrase_time_limit=10 # Coupe si on parle plus de 10s non-stop
        )

    def stop(self, is_temporary=False):
        """Arrête l'écoute du micro"""
        if self.is_listening and self.stop_listening_fn:
            self.stop_listening_fn(wait_for_stop=False)
            self.is_listening = False
            if not is_temporary:
                logger.info("Module STT arrêté.")
            
    async def _on_tts_start(self, payload: Dict[str, Any]):
        self.is_suspended = True
        self.stop(is_temporary=True) # Coupe PHYSIQUEMENT l'écoute pour éviter de s'entendre
        
    async def _on_tts_stop(self, payload: Dict[str, Any]):
        # On attend une fraction de seconde de plus pour l'écho résiduel de la pièce
        await asyncio.sleep(0.3)
        self.start(recalibrate=False) # Relance PHYSIQUEMENT l'écoute
        self.is_suspended = False

# Instance globale
stt_instance = SpeechToText()

# On doit abonner stt_instance manuellement pour éviter boucle d'import (si appelé dans main)
bus.subscribe("audio.tts_started", stt_instance._on_tts_start)
bus.subscribe("audio.tts_stopped", stt_instance._on_tts_stop)
