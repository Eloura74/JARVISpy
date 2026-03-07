import { wsService } from "./services/websocket.js";
import { store } from "./services/state.js";

// Components
import { Status } from "./components/Status/Status.js";
import { JarvisCoreBridge } from "./components/jarvis/JarvisCoreBridge";
import { audioAnalyzer } from "./services/audioAnalyzer.js";
import { Terminal } from "./components/Terminal/Terminal.js";
import { Chat } from "./components/Chat/Chat.js";
import { Settings } from "./components/Settings/Settings.js";
import { WebSearch } from "./components/WebSearch/WebSearch.js";
import { NeuralLog } from "./components/NeuralLog/NeuralLog.js";
import { TravelWidget } from "./components/TravelWidget/TravelWidget.js";
import { CalendarWidget } from "./components/CalendarWidget/CalendarWidget.js";
import { VisionWidget } from "./components/VisionWidget/VisionWidget.js";
import { EmailWidget } from "./components/EmailWidget/EmailWidget.js";

// Styles
import "./components/TravelWidget/TravelWidget.css";
import "./components/CalendarWidget/CalendarWidget.css";
import "./components/VisionWidget/VisionWidget.css";
import "./components/EmailWidget/EmailWidget.css";

/**
 * JARVIS App - Orchestrateur Principal Frontend
 */
class JarvisApp {
  constructor() {
    this.init();
  }

  async init() {
    console.log("[APP] Initialisation J.A.R.V.I.S 0.2...");

    // Instanciation des composants
    this.status = new Status("status-mount");
    this.orb = new JarvisCoreBridge("orb-mount");
    this.terminal = new Terminal("terminal-mount");
    this.chat = new Chat("chat-mount");
    this.settings = new Settings("settings-mount");
    this.websearch = new WebSearch("websearch-mount");
    this.neurallog = new NeuralLog("neural-log-container");
    this.travelWidget = new TravelWidget("travel-widget-container");
    this.calendarWidget = new CalendarWidget();
    this.visionWidget = new VisionWidget();
    this.emailWidget = new EmailWidget();

    // Liaison du bouton paramètres
    document.getElementById("open-settings").addEventListener("click", () => {
      this.settings.open();
    });

    // Événements et synchronisation du Store
    let lastProcessedTravel = null;
    let lastUserRequest = "";
    let activeWidgetRequest = ""; // Stocke la requête qui a ouvert un widget

    store.subscribe((state) => {
      // 0. Update de l'Orb
      if (this.orb && this.orb.updateState) {
        this.orb.updateState(state.orbStatus);
      }

      const text = (state.lastUserMessage || "").toLowerCase();
      const isNewMessage =
        state.lastUserMessage && state.lastUserMessage !== lastUserRequest;
      const isProcessing =
        state.orbStatus === "listening" || state.orbStatus === "thinking";

      // 1. Widgets Éphémères (Trajet, Vision, Email)

      // Trajet
      if (state.travelInfo && state.travelInfo !== lastProcessedTravel) {
        console.log("[APP] Ouverture TravelWidget");
        this.travelWidget.show(state.travelInfo);
        lastProcessedTravel = state.travelInfo;
        activeWidgetRequest = state.lastUserMessage;
      }

      // Vision
      if (state.visionData) {
        if (!this.visionWidget.isVisible) {
          console.log("[APP] Ouverture VisionWidget");
          activeWidgetRequest = state.lastUserMessage;
        }
        this.visionWidget.show(state.visionData);
      } else {
        this.visionWidget.hide();
      }

      // Email
      if (state.emailData) {
        if (!this.emailWidget.isVisible) {
          console.log("[APP] Ouverture EmailWidget");
          activeWidgetRequest = state.lastUserMessage;
        }
        this.emailWidget.show(state.emailData);
      } else {
        this.emailWidget.hide();
      }

      // Calendrier (Persistant jusqu'à fin d'action)
      if (state.calendarInfo) {
        this.calendarWidget.show(state.calendarInfo);
        if (
          state.calendarInfo.status === "success" &&
          !state.calendarInfo.confirmRequired
        ) {
          setTimeout(() => {
            store.setState({ calendarInfo: null });
          }, 10000);
        }
      } else {
        this.calendarWidget.hide();
      }

      // 2. Gestion des Fermetures (Vocale et Automatique)
      const closeKeywords = [
        "ferme",
        "fermez",
        "fermer",
        "c'est bon",
        "annule",
        "quitter",
        "merci jarvis",
      ];
      const targetKeywords = [
        "vision",
        "image",
        "photo",
        "mail",
        "courrier",
        "message",
        "fenêtre",
        "celui-là",
      ];

      // Fermeture explicite : "Ferme la vision" or "C'est bon"
      const hasCloseAction = closeKeywords.some((k) => text.includes(k));
      const hasTarget = targetKeywords.some((k) => text.includes(k));
      const shouldCloseExplicit =
        isNewMessage &&
        ((hasCloseAction && hasTarget) ||
          text.includes("c'est bon") ||
          text.includes("ça suffit"));

      if (shouldCloseExplicit) {
        console.log("[APP] Fermeture manuelle demandée :", text);
        this.visionWidget.hide();
        this.emailWidget.hide();
        this.travelWidget.hide();
        lastUserRequest = state.lastUserMessage;
        return;
      }

      // Fermeture automatique SI nouvelle interaction ET ce n'est pas le message qui a ouvert le widget
      if (isNewMessage && state.lastUserMessage !== activeWidgetRequest) {
        console.log("[APP] Nouvelle interaction détectée -> Nettoyage HUD");
        this.visionWidget.hide();
        this.emailWidget.hide();
        this.travelWidget.hide();
      }

      // 3. Synchronisation finale
      if (state.lastUserMessage) {
        lastUserRequest = state.lastUserMessage;
      }
    });

    // Connexion au serveur
    wsService.connect();

    // Démarrage de l'analyseur audio sur la première interaction
    const initAudio = () => {
      audioAnalyzer.start();
      window.removeEventListener("click", initAudio);
    };
    window.addEventListener("click", initAudio);

    this.terminal.addLog(
      "Système opérationnel. Liaison montante établie.",
      "success",
    );
  }
}

// Boot
new JarvisApp();
