import ssl
import json
import threading
import paho.mqtt.client as mqtt
from core.config import settings
from core.logger import get_logger

logger = get_logger("services.bambu")

class BambuClient:
    """
    Client MQTT local pour Bambu Lab. Connexion TLS port 8883.
    Un thread d'arrière-plan maintient la connexion et met à jour un cache d'état.
    Access Code : affiché sur l'écran LCD de l'imprimante (Menu > Réseau).
    """
    MQTT_USER = "bblp"
    MQTT_PORT = 8883

    def __init__(self):
        self._client: mqtt.Client | None = None
        self._thread: threading.Thread | None = None
        self._state: dict = {}
        self._connected = False
        self._lock = threading.Lock()

    @property
    def is_configured(self) -> bool:
        return bool(settings.bambu_ip and settings.bambu_serial and settings.bambu_access_code)

    @property
    def _topic_report(self) -> str:
        return f"device/{settings.bambu_serial}/report"

    @property
    def _topic_request(self) -> str:
        return f"device/{settings.bambu_serial}/request"

    def connect(self):
        """Lance la connexion MQTT en arrière-plan. Idempotent."""
        if self._connected or not self.is_configured:
            return
        if self._thread and self._thread.is_alive():
            return
        self._thread = threading.Thread(target=self._run_loop, daemon=True, name="bambu-mqtt")
        self._thread.start()

    def _run_loop(self):
        """Thread MQTT — maintient la connexion via loop_forever (auto-reconnect)."""
        try:
            self._client = mqtt.Client(
                mqtt.CallbackAPIVersion.VERSION1,
                client_id="jarvis_bambu",
                protocol=mqtt.MQTTv311,
                transport="tcp",
            )
            self._client.username_pw_set(self.MQTT_USER, settings.bambu_access_code)
            self._client.tls_set(tls_version=ssl.PROTOCOL_TLS, cert_reqs=ssl.CERT_NONE)
            self._client.tls_insecure_set(True)
            self._client.on_connect    = self._on_connect
            self._client.on_message    = self._on_message
            self._client.on_disconnect = self._on_disconnect
            self._client.connect(settings.bambu_ip, self.MQTT_PORT, keepalive=60)
            self._client.loop_forever(retry_first_connection=True)
        except Exception as e:
            logger.error(f"Bambu MQTT _run_loop: {e}")
            self._connected = False

    def _on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            self._connected = True
            logger.info(f"Bambu Lab connectée ({settings.bambu_ip})")
            client.subscribe(self._topic_report)
            # Demande immédiate du statut complet
            client.publish(self._topic_request, json.dumps({
                "pushing": {"sequence_id": "0", "command": "pushall"}
            }))
        else:
            logger.error(f"Bambu MQTT: connexion refusée (code {rc})")
            self._connected = False

    def _on_message(self, client, userdata, msg):
        try:
            payload = json.loads(msg.payload.decode())
            with self._lock:
                if "print" in payload:
                    self._state.update(payload["print"])
        except Exception as e:
            logger.error(f"Bambu parse: {e}")

    def _on_disconnect(self, client, userdata, rc):
        self._connected = False
        if rc != 0:
            logger.warning(f"Bambu MQTT déconnecté (code {rc}). Reconnexion auto...")

    def get_state(self) -> dict:
        """Retourne une copie thread-safe du dernier état connu."""
        self.connect()
        with self._lock:
            return dict(self._state)

    def publish(self, command: dict) -> bool:
        """Publie une commande JSON vers l'imprimante. Retourne True si envoyé."""
        self.connect()
        if not self._connected or not self._client:
            return False
        try:
            self._client.publish(self._topic_request, json.dumps(command))
            return True
        except Exception as e:
            logger.error(f"Bambu publish: {e}")
            return False

# Singleton partagé entre status.py et control.py
bambu_client = BambuClient()
