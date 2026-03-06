import { store } from "./state.js";

/**
 * WebSocketService - Gère la communication robuste avec le backend FastAPI
 */
class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
  }

  connect() {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    console.log(`[WS] Tentative de connexion à ${wsUrl}...`);
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("[WS] Connecté.");
      this.reconnectAttempts = 0;
      store.setState({ connection: "online" });
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.handleMessage(msg);
      } catch (e) {
        console.error("[WS] Erreur parsing message:", e);
      }
    };

    this.ws.onclose = () => {
      store.setState({ connection: "offline" });
      this.reconnect();
    };

    this.ws.onerror = (err) => {
      console.error("[WS] Erreur:", err);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      console.log(
        `[WS] Reconnexion dans ${delay / 1000}s... (Tentative ${this.reconnectAttempts})`,
      );
      setTimeout(() => this.connect(), delay);
    }
  }

  handleMessage(msg) {
    if (msg.type === "system") {
      this.addInternalLog(msg.message, "info");
      return;
    }

    const event = msg.event;
    const data = msg.data || {};

    if (!event) return;

    // Dispatch vers le Store
    switch (event) {
      case "audio.speech_recognized":
        store.setState({ lastUserMessage: data.text, orbStatus: "thinking" });
        break;
      case "brain.thinking":
        store.setState({
          brainStatus: data.status ? "Analyse..." : "En veille",
          orbStatus: data.status ? "thinking" : "idle",
        });
        break;
      case "brain.response_generated":
        store.setState({ lastJarvisMessage: data.text });
        break;
      case "audio.tts_started":
        store.setState({ ttsStatus: "Actif", orbStatus: "speaking" });
        break;
      case "audio.tts_stopped":
        store.setState({ ttsStatus: "Inactif", orbStatus: "idle" });
        break;
      case "ui.show_web_results":
        store.setState({ webSearchResults: data });
        break;
      case "ui.hide_web_results":
        store.setState({ webSearchResults: null });
        break;
      default:
        // Pour les autres événements, on peut juste les logger
        console.debug(`[WS Event] ${event}`, data);
    }
  }

  send(event, data = {}) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    }
  }

  addInternalLog(message, type) {
    // On pourrait émettre un événement de log local ici ou via store
    console.log(`[SYSTEM] ${message}`);
  }
}

export const wsService = new WebSocketService();
