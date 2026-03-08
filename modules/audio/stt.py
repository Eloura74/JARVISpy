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
        logger.info("Initialisation d'une NOUVELLE instance SpeechToText...")
        self.recognizer = sr.Recognizer()
        self.microphone = None
        self.is_listening = False
        self.stop_listening_fn = None
        self.is_suspended = False  # True quand TTS parle
        self.manual_enabled = True # État souhaité par l'utilisateur (toggle bouton)
        
        # Paramètres de détection de parole
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.energy_threshold = 700      # 700 = ignore sons faibles/lointains (enceintes à 80cm)
        self.recognizer.pause_threshold = 0.8
        self.recognizer.non_speaking_duration = 0.6

        # WebRTC VAD — filtre pré-Whisper ultra-rapide (~1ms)
        # pip install webrtcvad-wheels (wheels pré-compilés, fonctionne sur Windows sans Build Tools)
        try:
            import webrtcvad
            self._vad = webrtcvad.Vad(3)  # mode 3 = plus strict (exige spectres vocaux nets)
            self._vad_enabled = True
            logger.info("WebRTC VAD activé (filtre pré-Whisper, mode 2).")
        except ImportError:
            self._vad = None
            self._vad_enabled = False
            logger.warning("webrtcvad non installé — VAD désactivé. Lancez : pip install webrtcvad-wheels")
        
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

    def _vad_filter(self, raw_bytes: bytes) -> bool:
        """
        Pré-filtre WebRTC VAD : retourne True si l'audio contient assez de voix pour mériter Whisper.
        Travaille sur des frames de 30ms à 16kHz/16-bit.
        Seuil : 30% des frames doivent être détectées comme "voix".
        Coût ≈ 1ms — s'exécute dans le thread background du micro.
        """
        FRAME_MS   = 30
        FRAME_SIZE = int(16000 * FRAME_MS / 1000) * 2  # 960 bytes = 480 échantillons * 2 octets
        THRESHOLD  = 0.30  # ratio minimum de frames "voix"

        voice = total = 0
        for i in range(0, len(raw_bytes) - FRAME_SIZE, FRAME_SIZE):
            frame = raw_bytes[i : i + FRAME_SIZE]
            if len(frame) == FRAME_SIZE:
                total += 1
                try:
                    if self._vad.is_speech(frame, 16000):
                        voice += 1
                except Exception:
                    pass

        if total == 0:
            return False
        ratio = voice / total
        logger.debug(f"VAD: {voice}/{total} frames voix ({ratio:.0%})")
        return ratio >= THRESHOLD

    def _callback(self, recognizer, audio):
        """Appelée automatiquement dès qu'une phrase est captée (background thread)"""
        logger.info(f"[_callback] Phrase détectée. manual_enabled={self.manual_enabled}, is_suspended={self.is_suspended}")
        if not self.manual_enabled:
            logger.info("Audio ignoré (Micro désactivé manuellement via manual_enabled=False)")
            return

        if self.is_suspended:
            logger.debug("Audio ignoré (J.A.R.V.I.S parle)")
            return

        try:
            # PCM 16kHz/16-bit — format commun VAD + Whisper
            raw_bytes = audio.get_raw_data(convert_rate=16000, convert_width=2)

            # ── Filtre 1 : durée minimale ──────────────────────────────────────
            # < 0.5s = bruit ponctuel (clic, son film court) → skip Whisper
            duration_s = len(raw_bytes) / (16000 * 2)
            if duration_s < 0.5:
                logger.debug(f"Audio trop court ({duration_s:.2f}s) — ignoré")
                return

            # ── Filtre 2 : WebRTC VAD (pré-Whisper) ───────────────────────────
            # Filtre les sons lointains (enceintes, film) dont moins de 30% des
            # frames ressemblent à de la parole humaine proche.
            if self._vad_enabled and not self._vad_filter(raw_bytes):
                logger.debug("VAD: ratio voix insuffisant — Whisper ignoré")
                return

            logger.debug("Traitement audio Whisper en cours...")
            # Conversion numpy float32 pour Faster-Whisper
            audio_data = np.frombuffer(raw_bytes, np.int16).flatten().astype(np.float32) / 32768.0
            
            # Transcription via Faster-Whisper
            segments, info = self.model.transcribe(audio_data, beam_size=5, language="fr", condition_on_previous_text=False)
            
            text = "".join([segment.text for segment in segments]).strip()
            
            # Filtrage des hallucinations connues de Whisper (sur du silence / bruit)
            text_lower = text.lower()
            
            # Si le texte est très court ou est juste un caractère de ponctuation
            if not text or len(text.strip(" .!?,")) < 2:
                return

            hallucinations = [
                "sous-titres",
                "amara.org",
                "merci de votre attention",
                "sous-titrage",
                "merci d'avoir regardé",
                "n'hésitez pas à vous abonner",
                "ouvres crônes",
                "c'est non plus dur",
                "traduction "
            ]
            
            # Vérification stricte: on ignore si le texte contient une hallucination connue
            # OU si c'est juste "merci" (souvent une hallucination sur un bruit très bref)
            if any(h in text_lower for h in hallucinations) or text_lower.strip(" .!,?") == "merci":
                logger.debug(f"Hallucination Whisper ignorée: '{text}'")
                return
                
            # Filtre fragments (son lointain ) : ellipses répétées = audio flou = film
            ellipsis_count = text.count("...")
            if ellipsis_count >= 2:
                logger.debug(f"Fragment ellipsé ignoré (film/bruit?): '{text}'")
                return

            # Filtre mot court répétitif ("je je je" = hallucination sur audio distant)
            words = text_lower.split()
            if len(words) > 4 and len(set(words)) == 1:
                logger.debug(f"Bégaiement Whisper ignoré: '{text}'")
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
            logger.debug("STT déjà en cours d'écoute.")
            return

        self._setup_mic(recalibrate=recalibrate)
        if not self.microphone:
            logger.error("Démarrage STT impossible : micro non configuré.")
            return

        # Attente libération stream précédent
        if hasattr(self.microphone, 'stream') and self.microphone.stream is not None:
            logger.debug("Attente fermeture stream précédent...")
            for _ in range(50):  # max 5 secondes
                time.sleep(0.1)
                if self.microphone.stream is None:
                    break
            else:
                logger.warning("Stream micro toujours ouvert après 5s — abandon du redémarrage")
                return

        logger.info("Module STT (Écoute) actif. Parlez !")
        self.is_listening = True

        try:
            self.stop_listening_fn = self.recognizer.listen_in_background(
                self.microphone,
                self._callback,
                phrase_time_limit=8
            )
        except Exception as e:
            logger.error(f"Erreur lors du lancement de listen_in_background: {e}")
            self.is_listening = False

    def stop(self, is_temporary=False, wait=False):
        """Arrête l'écoute du micro"""
        if self.is_listening and self.stop_listening_fn:
            logger.debug(f"Arrêt STT {'temporaire' if is_temporary else ''}...")
            self.stop_listening_fn(wait_for_stop=wait)
            self.is_listening = False
            if not is_temporary:
                logger.info("Module STT arrêté.")
            
    async def _on_tts_start(self, payload: Dict[str, Any]):
        self.is_suspended = True
        self.stop(is_temporary=True, wait=False)
        
    async def _on_tts_stop(self, payload: Dict[str, Any]):
        try:
            # On attend que l'écho se dissipe et que le thread de transcription se calme
            await asyncio.sleep(1.2)
            self.is_suspended = False
            
            logger.debug(f"[_on_tts_stop] manual_enabled={self.manual_enabled}")
            # On ne redémarre l'écoute que si l'utilisateur ne l'a pas coupée manuellement
            if self.manual_enabled:
                self.start(recalibrate=False)
                await bus.emit("audio.stt_activated", {})
                logger.debug("Micro STT réactivé après TTS.")
            else:
                logger.info("Micro STT RESTE COUPÉ après TTS car manual_enabled=False.")
                
        except Exception as e:
            logger.error(f"Erreur dans _on_tts_stop (redémarrage STT): {e}")

    async def _on_start_stt(self, payload: Dict[str, Any]):
        """Handler pour l'activation manuelle du STT via UI"""
        logger.info(">>> EVENT: ws.audio.start_stt reçu -> Activation manuelle")
        self.manual_enabled = True
        self.start(recalibrate=True)

    async def _on_stop_stt(self, payload: Dict[str, Any]):
        """Handler pour la désactivation manuelle du STT via UI"""
        logger.info(">>> EVENT: ws.audio.stop_stt reçu -> Désactivation manuelle")
        self.manual_enabled = False
        self.stop(is_temporary=False, wait=False)
        logger.info(f"manual_enabled est maintenant à {self.manual_enabled}")

# Instance globale
stt_instance = SpeechToText()

# On doit abonner stt_instance manuellement pour éviter boucle d'import (si appelé dans main)
bus.subscribe("audio.tts_started", stt_instance._on_tts_start)
bus.subscribe("audio.tts_stopped", stt_instance._on_tts_stop)
bus.subscribe("ws.audio.start_stt", stt_instance._on_start_stt)
bus.subscribe("ws.audio.stop_stt", stt_instance._on_stop_stt)
