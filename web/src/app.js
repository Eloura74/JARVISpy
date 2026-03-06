import { wsService } from "./services/websocket.js";
import { store } from "./services/state.js";

// Components
import { Status } from "./components/Status/Status.js";
import { Orb } from "./components/Orb/Orb.js";
import { Terminal } from "./components/Terminal/Terminal.js";
import { Chat } from "./components/Chat/Chat.js";
import { Settings } from "./components/Settings/Settings.js";
import { WebSearch } from "./components/WebSearch/WebSearch.js";

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
    this.orb = new Orb("orb-mount");
    this.terminal = new Terminal("terminal-mount");
    this.chat = new Chat("chat-mount");
    this.settings = new Settings("settings-mount");
    this.websearch = new WebSearch("websearch-mount");

    // Liaison du bouton paramètres
    document.getElementById("open-settings").addEventListener("click", () => {
      this.settings.open();
    });

    // Connexion au serveur
    wsService.connect();

    this.terminal.addLog(
      "Système opérationnel. Liaison montante établie.",
      "success",
    );
  }
}

// Boot
new JarvisApp();
