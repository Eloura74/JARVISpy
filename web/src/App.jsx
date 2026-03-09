import React, { useEffect, useRef, useState } from "react";
import { store } from "./services/state.js";
import { wsService } from "./services/websocket.js";
import { audioAnalyzer } from "./services/audioAnalyzer.js";
import { decryptText } from "./utils/textEffect.js";

// Injection des instances Vanilla temporaires
import { JarvisCoreBridge } from "./components/jarvis/JarvisCoreBridge";

// Composants natifs React
import { Status } from "./components/Status/Status.jsx";
import { NeuralLog } from "./components/NeuralLog/NeuralLog.jsx";
import { PrinterWidget } from "./components/PrinterWidget/PrinterWidget.jsx";
import { TravelWidget } from "./components/TravelWidget/TravelWidget.jsx";
import { CalendarWidget } from "./components/CalendarWidget/CalendarWidget.jsx";
import { VisionWidget } from "./components/VisionWidget/VisionWidget.jsx";
import { EmailWidget } from "./components/EmailWidget/EmailWidget.jsx";
import { WebSearch } from "./components/WebSearch/WebSearch.jsx";
import { Chat } from "./components/Chat/Chat.jsx";
import { Terminal } from "./components/Terminal/Terminal.jsx";
import { Settings } from "./components/Settings/Settings.jsx";
import { JarvisOrbWrapper } from "./components/jarvis/JarvisOrbWrapper.tsx";

// Styles (les anciens imports)
import "./components/TravelWidget/TravelWidget.css";
import "./components/CalendarWidget/CalendarWidget.css";
import "./components/VisionWidget/VisionWidget.css";
import "./components/EmailWidget/EmailWidget.css";
import "./components/PrinterWidget/PrinterWidget.css";

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [sttEnabled, setSttEnabled] = useState(false);

  // Références d'instances JS (uniquement pour animations historiques si besoin, mais vide désormais)
  const instances = useRef({});

  useEffect(() => {
    console.log("[REACT APP] Initialisation J.A.R.V.I.S 0.3...");
    const theme = localStorage.getItem("jarvis_theme") || "default";
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.add("booting");

    // Plus besoin d'instancier de classes Vanilla ici
    setTimeout(() => {
      setIsBooting(false);
      document.body.classList.remove("booting");
      window.dispatchEvent(
        new CustomEvent("terminal-log", {
          detail: {
            text: "SYSTÈME: INITIALISATION DES NOYAUX NEURAUX...",
            type: "info",
          },
        }),
      );
      setTimeout(
        () =>
          window.dispatchEvent(
            new CustomEvent("terminal-log", {
              detail: {
                text: "SYSTÈME: CHARGEMENT DES PROTOCOLES DE VISION...",
                type: "info",
              },
            }),
          ),
        400,
      );
      setTimeout(
        () =>
          window.dispatchEvent(
            new CustomEvent("terminal-log", {
              detail: {
                text: "SYSTÈME: CONNEXION AU BUS DE DONNÉES ÉTABLIE.",
                type: "success",
              },
            }),
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
        lastProcessedTravel = state.travelInfo;
        activeWidgetRequest = state.lastUserMessage;
      }

      if (state.visionData) {
        if (!store.getState().visionData)
          activeWidgetRequest = state.lastUserMessage;
      }

      if (state.emailData) {
        if (!store.getState().emailData)
          activeWidgetRequest = state.lastUserMessage;
      }

      if (state.calendarInfo) {
        if (
          state.calendarInfo.status === "success" &&
          !state.calendarInfo.confirmRequired
        ) {
          setTimeout(() => store.setState({ calendarInfo: null }), 10000);
        }
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
        store.setState({ visionData: null });
        store.setState({ emailData: null });
        store.setState({ travelInfo: null });
        store.setState({ printData: { moonraker: null, bambu: null } });
        lastUserRequest = state.lastUserMessage;
      } else if (
        isNewMessage &&
        state.lastUserMessage !== activeWidgetRequest
      ) {
        store.setState({ visionData: null });
        store.setState({ emailData: null });
        store.setState({ travelInfo: null });
        store.setState({ printData: { moonraker: null, bambu: null } });
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
    window.dispatchEvent(
      new CustomEvent("terminal-log", {
        detail: {
          text: `SYSTÈME: ${nextState ? "ACTIVATION" : "DÉSACTIVATION"} DE L'ÉCOUTE...`,
          type: nextState ? "success" : "error",
        },
      }),
    );
    if (nextState) wsService.send("audio.start_stt");
    else {
      wsService.send("audio.stop_stt");
      store.setState({ orbStatus: "idle" });
    }
  };

  const killApp = () => {
    window.dispatchEvent(
      new CustomEvent("terminal-log", {
        detail: {
          text: "SYSTÈME: PROCÉDURE DE FERMETURE ÉTABLIE.",
          type: "error",
        },
      }),
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
    window.dispatchEvent(new CustomEvent("open-settings"));
  };

  return (
    <>
      <div id="app" className="app-layout">
        <Status />

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
          <NeuralLog />
          <TravelWidget />
          <PrinterWidget />
        </aside>

        <main id="orb-mount" className="orb-mount">
          <JarvisOrbWrapper />
        </main>

        <aside className="stage-right">
          <Terminal />
          <Chat />
        </aside>

        <Settings />
        <WebSearch />

        <div className="center-widgets-container">
          <VisionWidget />
          <EmailWidget />
          <CalendarWidget />
        </div>

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
