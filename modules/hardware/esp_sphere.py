"""
modules/hardware/esp_sphere.py
Pont entre le bus d'événements JarvisDecoupe et l'ESP32-S3 (sphère physique).

Protocole série (même que Jarvis2026/sphere) :
  STATE <NOM>   → change le mode visuel de l'orb
  TEXT  <texte> → affiche du texte sous la sphère
  THEME <NOM>   → change le thème de couleur
  PING          → l'ESP répond PONG
"""

import serial
import serial.tools.list_ports
import threading
import time
from typing import Optional

from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("hardware.esp_sphere")


# ── Mapping événements JarvisDecoupe → commandes STATE firmware ─────────────
# Le firmware reconnaît : IDLE, LISTENING, SPEAKING, ERROR,
# WEATHER, HOME, SYSTEM, MATRIX, SEARCH, MEDIA, TIMER, PRINT,
# NOTIF, SUCCESS, APPS, VISION, GHOST, SECURITY, WHATSAPP, GMAIL, CALENDAR, MAP
EVENT_TO_STATE = {
    # États audio
    "audio.tts_started":       "SPEAKING",
    "audio.tts_stopped":       "IDLE",
    "audio.speech_recognized": "IDLE",       # retour IDLE après reco
    # États cerveau
    "brain.thinking":          None,         # géré dynamiquement (payload.status)
    # Services déclenchés (optionnel, enrichit l'affichage)
    "system.search":           "SEARCH",
    "system.weather":          "WEATHER",
    "system.whatsapp":         "WHATSAPP",
    "system.gmail":            "GMAIL",
    "system.calendar":         "CALENDAR",
    "system.map":              "MAP",
    "system.print":            "PRINT",
    "system.vision":           "VISION",
    "system.home":             "HOME",
}


def _find_esp_port() -> Optional[str]:
    """Détecte automatiquement le port USB de l'ESP32-S3."""
    for p in serial.tools.list_ports.comports():
        desc = (p.description or "").lower()
        manu = (p.manufacturer or "").lower()
        if any(k in desc for k in ["usb", "cp210", "ch340", "espressif", "serial"]) \
                or "espressif" in manu:
            return p.device
    return None


class EspSphere:
    """
    Pilote série pour l'ESP32-S3 — exécuté dans son propre thread d'envoi
    pour ne jamais bloquer l'Event Loop asyncio.
    """

    def __init__(self, port: Optional[str] = None, baud: int = 115200):
        self.port = port
        self.baud = baud
        self._ser: Optional[serial.Serial] = None
        self._lock = threading.Lock()
        self._connected = False
        self._stop_event = threading.Event()

    # ── Connexion ───────────────────────────────────────────────────────────

    def connect(self) -> bool:
        """Tente de se connecter à l'ESP. Retourne True si succès."""
        target = self.port or _find_esp_port()
        if not target:
            logger.warning("ESP32-S3 non détecté sur les ports USB.")
            return False
        try:
            self._ser = serial.Serial(target, baudrate=self.baud, timeout=1.0)
            time.sleep(1.0)  # laisse le temps au boot ESP
            self._ser.reset_input_buffer()
            self._ser.reset_output_buffer()
            self._connected = True
            self.port = target
            logger.info(f"ESP32-S3 connecté sur {target}.")
            # Lancer le thread de lecture (pour voir les PONG/logs)
            threading.Thread(target=self._reader, daemon=True).start()
            return True
        except serial.SerialException as e:
            logger.warning(f"Impossible de connecter l'ESP32-S3 ({target}): {e}")
            return False

    def _reader(self):
        """Thread de lecture — affiche les réponses de l'ESP dans les logs."""
        while self._connected and not self._stop_event.is_set():
            try:
                if self._ser and self._ser.in_waiting:
                    line = self._ser.readline().decode("utf-8", errors="ignore").strip()
                    if line:
                        logger.debug(f"ESP32 ▸ {line}")
            except Exception:
                break
            time.sleep(0.05)

    # ── Envoi ────────────────────────────────────────────────────────────────

    def _send(self, cmd: str):
        """Envoie une commande série de façon thread-safe."""
        if not self._connected or not self._ser:
            return
        try:
            with self._lock:
                self._ser.write((cmd.rstrip("\n") + "\n").encode("utf-8", errors="ignore"))
        except Exception as e:
            logger.error(f"Erreur envoi ESP32: {e}")
            self._connected = False

    def state(self, name: str):
        """STATE <NOM> — change le mode visuel de l'orb."""
        self._send(f"STATE {name.upper()}")

    def text(self, msg: str):
        """TEXT <msg> — affiche du texte sur l'écran (tronqué à 63 chars)."""
        msg = msg.replace("\n", " ").replace("\r", " ").strip()[:63]
        self._send(f"TEXT {msg}")

    def theme(self, name: str):
        """THEME <NOM> — CLASSIC | IRONMAN | MATRIX | COPPER | WOOD."""
        self._send(f"THEME {name.upper()}")

    def ping(self):
        """PING — vérifie que l'ESP répond."""
        self._send("PING")

    def close(self):
        """Ferme la connexion série proprement."""
        self._stop_event.set()
        self._connected = False
        if self._ser:
            try:
                self._ser.close()
            except Exception:
                pass

    # ── Handlers bus ─────────────────────────────────────────────────────────

    async def _on_tts_start(self, payload):
        self.state("SPEAKING")

    async def _on_tts_stop(self, payload):
        self.state("IDLE")

    async def _on_speech_recognized(self, payload):
        """Affiche le texte reconnu (transcription)."""
        txt = payload.get("text", "")
        if txt:
            self.text(txt[:40])  # court, lisible sur petit écran

    async def _on_thinking(self, payload):
        """Gemini réfléchit → mode SYSTEM (engrenages sur écran)."""
        if payload.get("status"):
            self.state("SYSTEM")

    async def _on_brain_response(self, payload):
        """Affiche un extrait de la réponse de JARVIS."""
        txt = payload.get("text", "")
        if txt:
            self.text(txt[:55])

    async def _on_orb_status(self, payload):
        """Événement générique ui.orb_status → STATE directe."""
        s = payload.get("status", "IDLE")
        self.state(s.upper())

    # ── Démarrage ────────────────────────────────────────────────────────────

    def start(self):
        """Connecte et abonne aux événements du bus."""
        if not self.connect():
            logger.info("ESP32-S3 non disponible — module désactivé (reconnexion non tentée).")
            return

        bus.subscribe("audio.tts_started",       self._on_tts_start)
        bus.subscribe("audio.tts_stopped",        self._on_tts_stop)
        bus.subscribe("audio.speech_recognized",  self._on_speech_recognized)
        bus.subscribe("brain.thinking",           self._on_thinking)
        bus.subscribe("brain.response_generated", self._on_brain_response)
        bus.subscribe("ui.orb_status",            self._on_orb_status)

        # Annonce initiale
        self.state("IDLE")
        self.text("J.A.R.V.I.S ONLINE")
        logger.info("Module ESP32-S3 Sphere actif.")


# Instance globale (optionnelle — le module se désactive si l'ESP n'est pas branché)
esp_sphere = EspSphere()
