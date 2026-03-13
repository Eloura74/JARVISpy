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
        if (msg.event !== "audio.level") {
          console.debug(`[WS RECV] ${msg.event}`, msg.data);
        }
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
        });
        // Ne repasser en idle que si on était en train de réfléchir
        if (data.status) {
          store.setState({ orbStatus: "thinking" });
        } else if (store.state.orbStatus === "thinking") {
          store.setState({ orbStatus: "idle" });
        }
        break;
      case "brain.response_generated":
        store.setState({ lastJarvisMessage: data.text });
        break;
      case "audio.tts_started":
        store.setState({ ttsStatus: "Actif", orbStatus: "speaking" });
        // Sécurité : au bout de 15s, on force le retour à idle si tts_stopped n'est jamais arrivé
        setTimeout(() => {
          const s = store.state;
          if (s.ttsStatus === "Actif" && s.orbStatus === "speaking") {
            console.warn(
              "[WS] Sécurité : Timeout TTS détecté, retour permanent en idle.",
            );
            store.setState({ ttsStatus: "Inactif", orbStatus: "idle" });
          }
        }, 15000);
        break;
      case "audio.tts_stopped":
        store.setState({ ttsStatus: "Inactif" });
        // On ne repasse en idle que si on est en train de parler
        if (store.state.orbStatus === "speaking") {
          store.setState({ orbStatus: "idle" });
        }
        break;

      case "ui.show_web_results":
        store.setState({ webSearchResults: data });
        break;
      case "ui.hide_web_results":
        store.setState({ webSearchResults: null });
        break;
      case "memory.context_retrieved":
        store.setState({ lastNeuralLog: data });
        break;
      case "audio.stt_activated":
        console.debug("[WS] Micro activé, passage en mode listening.");
        store.setState({ orbStatus: "listening" });
        break;
      case "ui.show_vision":
        store.setState({ visionData: data });
        break;
      case "ui.show_emails":
        store.setState({ emailData: data });
        break;
      case "system.calendar":
        store.setState({ calendarInfo: data });
        break;
      case "printer.status":
        store.setState({
          printData: {
            ...store.state.printData,
            [data.type]: data,
          },
        });
        break;
      case "maps.travel_info":
        store.setState({ travelInfo: data, orbStatus: "idle" });
        break;
      case "ui.theme_changed":
        // Synchronisation du thème vers ESP32
        console.log(`[WS] Thème changé: ${data.theme}`);
        break;
      default:
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
