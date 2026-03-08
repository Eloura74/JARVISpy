import { wsService } from "./services/websocket.js";
import { store } from "./services/state.js";
import { decryptText } from "./utils/textEffect.js";

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

    // 0. Séquence de Boot
    document.body.classList.add("booting");
    const theme = localStorage.getItem("jarvis_theme") || "default";
    document.documentElement.setAttribute("data-theme", theme);

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

    // Lancement de la séquence visuelle
    this.injectDataStreams();
    this.injectSystemControls();

    setTimeout(() => {
      const elements = [
        { id: "status-mount", delay: 0 },
        { id: "analytics-mount", delay: 300 },
        { id: "orb-mount", delay: 600 },
        { id: "terminal-mount", delay: 900 },
        { id: "chat-mount", delay: 1200 },
        { id: "neural-log-container", delay: 1200 },
      ];

      elements.forEach((el) => {
        setTimeout(() => {
          const dom = document.getElementById(el.id);
          if (dom) {
            dom.classList.add("boot-reveal");

            // Effet de décryptage sur les titres du widget
            const textNodes = dom.querySelectorAll(
              ".terminal-title, .section-label, h2, .label-id, .logo-text",
            );
            textNodes.forEach((node) => {
              const originalText = node.innerText;
              decryptText(node, originalText, 800);
            });

            // Ajout automatique de la bordure sweep
            const glass = dom.querySelector(".glass") || dom;
            if (
              glass.classList.contains("glass") &&
              !glass.querySelector(".glass-edge")
            ) {
              const edge = document.createElement("div");
              edge.className = "glass-edge";
              glass.prepend(edge);
            }
          }
        }, el.delay);
      });

      setTimeout(() => {
        document.body.classList.remove("booting");
        this.terminal.addLog(
          "SYSTÈME: INITIALISATION DES NOYAUX NEURAUX...",
          "info",
        );
        setTimeout(
          () =>
            this.terminal.addLog(
              "SYSTÈME: CHARGEMENT DES PROTOCOLES DE VISION...",
              "info",
            ),
          400,
        );
        setTimeout(
          () =>
            this.terminal.addLog(
              "SYSTÈME: CONNEXION AU BUS DE DONNÉES ÉTABLIE.",
              "success",
            ),
          800,
        );
      }, 1500);
    }, 100);

    // Liaison du bouton paramètres
    document.getElementById("open-settings").addEventListener("click", () => {
      this.settings.open();
    });

    // Événements et synchronisation du Store
    let lastProcessedTravel = null;
    let lastUserRequest = "";
    let activeWidgetRequest = ""; // Stocke la requête qui a ouvert un widget

    store.subscribe((state) => {
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

  injectDataStreams() {
    const createStream = (className) => {
      const el = document.createElement("div");
      el.className = `data-stream ${className}`;
      document.body.appendChild(el);

      const update = () => {
        let text = "";
        for (let i = 0; i < 8; i++) {
          text +=
            Math.random().toString(16).substring(2, 10).toUpperCase() + " ";
          if (i % 2 === 1) text += "\n";
        }
        el.innerText = text;
      };

      update();
      setInterval(update, 2000 + Math.random() * 3000);
    };

    createStream("ds-top-left");
    createStream("ds-bottom-right");
  }

  injectSystemControls() {
    const controls = document.createElement("div");
    controls.className = "system-controls";
    controls.innerHTML = `
      <button class="btn-ctrl" id="btn-mic-toggle" title="Toggle Micro">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
        </svg>
      </button>
      <button class="btn-ctrl power" id="btn-app-kill" title="Close App">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
        </svg>
      </button>
    `;
    document.body.appendChild(controls);

    const btnMic = controls.querySelector("#btn-mic-toggle");
    const btnKill = controls.querySelector("#btn-app-kill");

    btnMic.addEventListener("click", () => {
      const isEnabled = store.state.sttEnabled;
      const nextState = !isEnabled;

      if (this.terminal) {
        this.terminal.addLog(
          `SYSTÈME: ${nextState ? "ACTIVATION" : "DÉSACTIVATION"} DE L'ÉCOUTE...`,
          nextState ? "success" : "error",
        );
      }

      // Mise à jour immédiate pour feedback visuel
      store.setState({ sttEnabled: nextState });

      if (nextState) {
        wsService.send("audio.start_stt");
      } else {
        wsService.send("audio.stop_stt");
        store.setState({ orbStatus: "idle" });
      }
    });

    btnKill.addEventListener("click", () => {
      if (this.terminal) {
        this.terminal.addLog(
          "SYSTÈME: PROCÉDURE DE FERMETURE ÉTABLIE.",
          "error",
        );
      }
      wsService.send("system.shutdown");

      // Animation de sortie
      document.body.style.pointerEvents = "none";
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "#000";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 2s ease";
      overlay.style.zIndex = "9999";
      document.body.appendChild(overlay);

      setTimeout(() => (overlay.style.opacity = "1"), 50);

      setTimeout(() => {
        window.close();
        document.body.innerHTML =
          "<div style='color:var(--primary); font-family:var(--font-mono); display:flex; height:100vh; width:100vw; align-items:center; justify-content:center; text-align:center; background:#000;'>SYSTEM OFFLINE<br>AU REVOIR, MONSIEUR.</div>";
      }, 2500);
    });

    store.subscribe((state) => {
      if (btnMic) {
        if (state.sttEnabled) {
          btnMic.classList.remove("muted");
          // On peut garder 'active' si on veut un effet spécifique quand ça écoute,
          // mais l'utilisateur veut "transparent" (style normal) par défaut quand ça écoute.
          btnMic.classList.remove("active");
        } else {
          btnMic.classList.add("muted");
          btnMic.classList.remove("active");
        }
      }
    });
  }
}

// Boot
new JarvisApp();
