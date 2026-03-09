import React, { useEffect, useRef, useState } from "react";
import { store } from "./services/state.js";
import { wsService } from "./services/websocket.js";
import { audioAnalyzer } from "./services/audioAnalyzer.js";
import { decryptText } from "./utils/textEffect.js";

// Injection des instances Vanilla temporaires
import { Status } from "./components/Status/Status.js";
import { JarvisCoreBridge } from "./components/jarvis/JarvisCoreBridge";
import { Terminal } from "./components/Terminal/Terminal.js";
import { Chat } from "./components/Chat/Chat.js";
import { Settings } from "./components/Settings/Settings.js";
import { WebSearch } from "./components/WebSearch/WebSearch.js";
import { NeuralLog } from "./components/NeuralLog/NeuralLog.js";
import { TravelWidget } from "./components/TravelWidget/TravelWidget.js";
import { CalendarWidget } from "./components/CalendarWidget/CalendarWidget.js";
import { VisionWidget } from "./components/VisionWidget/VisionWidget.js";
import { EmailWidget } from "./components/EmailWidget/EmailWidget.js";
import { PrinterWidget } from "./components/PrinterWidget/PrinterWidget.js";

// Styles (les anciens imports)
import "./components/TravelWidget/TravelWidget.css";
import "./components/CalendarWidget/CalendarWidget.css";
import "./components/VisionWidget/VisionWidget.css";
import "./components/EmailWidget/EmailWidget.css";
import "./components/PrinterWidget/PrinterWidget.css";

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [sttEnabled, setSttEnabled] = useState(false);

  // References pour les conteneurs Vanilla
  const statusRef = useRef(null);
  const orbRef = useRef(null);
  const terminalRef = useRef(null);
  const chatRef = useRef(null);
  const settingsRef = useRef(null);
  const websearchRef = useRef(null);
  const neurallogRef = useRef(null);
  const travelRef = useRef(null);
  const calendarRef = useRef(null);
  const visionRef = useRef(null);
  const emailRef = useRef(null);
  const printerRef = useRef(null);

  // Références d'instances JS
  const instances = useRef({});

  useEffect(() => {
    console.log("[REACT APP] Initialisation J.A.R.V.I.S 0.3...");
    const theme = localStorage.getItem("jarvis_theme") || "default";
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.add("booting");

    // Instanciation des vieux composants dans les ref (avec un délai pour garantir le DOM prêt)
    const mountTimeout = setTimeout(() => {
      if (!instances.current.status && statusRef.current?.id)
        instances.current.status = new Status(statusRef.current.id);

      if (!instances.current.orb && orbRef.current?.id)
        instances.current.orb = new JarvisCoreBridge(orbRef.current.id);

      if (!instances.current.terminal && terminalRef.current?.id)
        instances.current.terminal = new Terminal(terminalRef.current.id);

      if (!instances.current.chat && chatRef.current?.id)
        instances.current.chat = new Chat(chatRef.current.id);

      if (!instances.current.settings && settingsRef.current?.id)
        instances.current.settings = new Settings(settingsRef.current.id);

      if (!instances.current.websearch && websearchRef.current?.id)
        instances.current.websearch = new WebSearch(websearchRef.current.id);

      if (!instances.current.neurallog && neurallogRef.current?.id)
        instances.current.neurallog = new NeuralLog(neurallogRef.current.id);

      if (!instances.current.travel && travelRef.current?.id)
        instances.current.travelWidget = new TravelWidget(travelRef.current.id);

      if (!instances.current.calendar)
        instances.current.calendarWidget = new CalendarWidget();
      if (!instances.current.vision)
        instances.current.visionWidget = new VisionWidget();
      if (!instances.current.email)
        instances.current.emailWidget = new EmailWidget();
      if (!instances.current.printer)
        instances.current.printerWidget = new PrinterWidget();
    }, 150);

    // Séquence d'anim
    setTimeout(() => {
      setIsBooting(false);
      document.body.classList.remove("booting");
      instances.current.terminal.addLog(
        "SYSTÈME: INITIALISATION DES NOYAUX NEURAUX...",
        "info",
      );
      setTimeout(
        () =>
          instances.current.terminal.addLog(
            "SYSTÈME: CHARGEMENT DES PROTOCOLES DE VISION...",
            "info",
          ),
        400,
      );
      setTimeout(
        () =>
          instances.current.terminal.addLog(
            "SYSTÈME: CONNEXION AU BUS DE DONNÉES ÉTABLIE.",
            "success",
          ),
        800,
      );
    }, 1500);

    // Audio Analyzer auto-start
    const initAudio = () => {
      audioAnalyzer.start();
      window.removeEventListener("click", initAudio);
    };
    window.addEventListener("click", initAudio);

    // Abonnement global au Store pour les Widgets
    let lastProcessedTravel = null;
    let lastUserRequest = "";
    let activeWidgetRequest = "";

    const unsub = store.subscribe((state) => {
      setSttEnabled(state.sttEnabled);
      const text = (state.lastUserMessage || "").toLowerCase();
      const isNewMessage =
        state.lastUserMessage && state.lastUserMessage !== lastUserRequest;

      if (state.travelInfo && state.travelInfo !== lastProcessedTravel) {
        instances.current.travelWidget.show(state.travelInfo);
        lastProcessedTravel = state.travelInfo;
        activeWidgetRequest = state.lastUserMessage;
      }

      if (state.visionData) {
        if (!instances.current.visionWidget.isVisible)
          activeWidgetRequest = state.lastUserMessage;
        instances.current.visionWidget.show(state.visionData);
      } else {
        instances.current.visionWidget.hide();
      }

      if (state.emailData) {
        if (!instances.current.emailWidget.isVisible)
          activeWidgetRequest = state.lastUserMessage;
        instances.current.emailWidget.show(state.emailData);
      } else {
        instances.current.emailWidget.hide();
      }

      if (state.calendarInfo) {
        instances.current.calendarWidget.show(state.calendarInfo);
        if (
          state.calendarInfo.status === "success" &&
          !state.calendarInfo.confirmRequired
        ) {
          setTimeout(() => store.setState({ calendarInfo: null }), 10000);
        }
      } else {
        instances.current.calendarWidget.hide();
      }

      // Cleanup automatique Vocale
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
      const hasCloseAction = closeKeywords.some((k) => text.includes(k));
      const hasTarget = targetKeywords.some((k) => text.includes(k));
      const shouldCloseExplicit =
        isNewMessage &&
        ((hasCloseAction && hasTarget) ||
          text.includes("c'est bon") ||
          text.includes("ça suffit"));

      if (shouldCloseExplicit) {
        instances.current.visionWidget.hide();
        instances.current.emailWidget.hide();
        instances.current.travelWidget.hide();
        instances.current.printerWidget.hide();
        lastUserRequest = state.lastUserMessage;
      } else if (
        isNewMessage &&
        state.lastUserMessage !== activeWidgetRequest
      ) {
        instances.current.visionWidget.hide();
        instances.current.emailWidget.hide();
        instances.current.travelWidget.hide();
        instances.current.printerWidget.hide();
      }

      if (state.lastUserMessage) lastUserRequest = state.lastUserMessage;
    });

    wsService.connect();

    // Effectue une passe de décryptage
    const decryptAll = () => {
      document
        .querySelectorAll(
          ".terminal-title, .section-label, h2, .label-id, .logo-text",
        )
        .forEach((node) => {
          decryptText(node, node.innerText, 800);
        });
    };
    decryptAll();

    return () => {
      unsub();
      window.removeEventListener("click", initAudio);
    };
  }, []);

  const toggleMic = () => {
    const nextState = !sttEnabled;
    store.setState({ sttEnabled: nextState });
    if (instances.current.terminal) {
      instances.current.terminal.addLog(
        `SYSTÈME: ${nextState ? "ACTIVATION" : "DÉSACTIVATION"} DE L'ÉCOUTE...`,
        nextState ? "success" : "error",
      );
    }
    if (nextState) wsService.send("audio.start_stt");
    else {
      wsService.send("audio.stop_stt");
      store.setState({ orbStatus: "idle" });
    }
  };

  const killApp = () => {
    if (instances.current.terminal)
      instances.current.terminal.addLog(
        "SYSTÈME: PROCÉDURE DE FERMETURE ÉTABLIE.",
        "error",
      );
    wsService.send("system.shutdown");
    document.body.style.pointerEvents = "none";

    // Fallback animation
    setTimeout(() => {
      window.close();
      document.body.innerHTML =
        "<div style='color:var(--primary); font-family:var(--font-mono); display:flex; height:100vh; width:100vw; align-items:center; justify-content:center; background:#000;'>SYSTEM OFFLINE</div>";
    }, 2000);
  };

  const openSettings = () => {
    if (instances.current.settings) instances.current.settings.open();
  };

  return (
    <>
      <div id="app" className="app-layout">
        <div id="status-mount" ref={statusRef}></div>

        <aside className="stage-left">
          <div id="analytics-mount" className="glass">
            <div className="card-header">CORE TELEMETRY</div>
            <div className="card-body">
              <div className="metric">
                CPU <span className="v">08.2%</span>
              </div>
              <div className="metric">
                MEM <span className="v">1.4 GB</span>
              </div>
              <div className="metric">
                LAT <span className="v">12 ms</span>
              </div>
            </div>
            <button
              className="btn-glass"
              onClick={openSettings}
              style={{ width: "95%", margin: "10px auto", display: "block" }}
            >
              <span className="btn-icon">⚙️</span>
              <span className="btn-text">SYSTÈME PROFIL</span>
            </button>
          </div>
          <div id="neural-log-container" ref={neurallogRef}></div>
          <div id="travel-widget-container" ref={travelRef}></div>
          <div id="printer-widget-container" ref={printerRef}></div>
        </aside>

        <main id="orb-mount" className="orb-mount" ref={orbRef}></main>

        <aside className="stage-right">
          <div id="terminal-mount" ref={terminalRef}></div>
          <div id="chat-mount" className="glass" ref={chatRef}></div>
        </aside>

        <div id="settings-mount" ref={settingsRef}></div>
        <div id="websearch-mount" ref={websearchRef}></div>

        <div className="system-controls">
          <button
            className={`btn-ctrl ${!sttEnabled ? "muted" : ""}`}
            onClick={toggleMic}
            title="Toggle Micro"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </button>
          <button
            className="btn-ctrl power"
            onClick={killApp}
            title="Close App"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
