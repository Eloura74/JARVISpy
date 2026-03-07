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
    this.neurallog = new NeuralLog("neural-log-container"); // Changed to match new ID
    this.travelWidget = new TravelWidget("travel-widget-container"); // Instantiated TravelWidget

    // Liaison du bouton paramètres
    document.getElementById("open-settings").addEventListener("click", () => {
      this.settings.open();
    });

    // Événements et synchronisation du Store
    let lastProcessedTravel = null;
    let lastUserRequest = "";

    store.subscribe((state) => {
      // 1. Affichage du widget de trajet
      if (state.travelInfo && state.travelInfo !== lastProcessedTravel) {
        this.travelWidget.show(state.travelInfo);
        lastProcessedTravel = state.travelInfo;
      }

      // 2. Fermeture automatique lors d'une nouvelle demande
      // Désormais, on ferme dès que l'Orb change d'état (écoute ou réflexion)
      // ou qu'un nouveau message utilisateur arrive.
      const isInteracting =
        state.orbStatus === "listening" ||
        state.orbStatus === "thinking" ||
        (state.lastUserMessage && state.lastUserMessage !== lastUserRequest);

      if (isInteracting && this.travelWidget.isVisible) {
        console.log(
          "[APP] Masquage automatique du TravelWidget (Interaction détectée)",
        );
        this.travelWidget.hide();
        if (state.lastUserMessage) lastUserRequest = state.lastUserMessage;
      }
    });

    // Connexion au serveur
    wsService.connect();

    // Démarrage de l'analyseur audio sur la première interaction (contrainte navigateur)
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
