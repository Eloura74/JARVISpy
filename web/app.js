// app.js - Logique de l'interface J.A.R.V.I.S

let ws;
const terminal = document.getElementById("log-terminal");
const transcript = document.getElementById("transcript-box");
const orb = document.getElementById("ai-orb");
const orbLabel = document.getElementById("orb-label");
const connStatus = document.getElementById("connection-status");
const connText = document.getElementById("connection-text");

// Statuts UI
const uiState = {
  isListening: false,
  isThinking: false,
  isSpeaking: false,
};

function connectWebSocket() {
  // Utiliser l'IP locale ou localhost selon la configuration
  const wsUrl = `ws://${window.location.host}/ws`;

  addLog(`Tentative de connexion à ${wsUrl}...`, "system");
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    connStatus.className = "status-indicator online";
    connText.innerText = "Connecté";
    addLog("Connexion WebSocket établie.", "info");
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      handleServerMessage(msg);
    } catch (e) {
      console.error("Erreur parsing JSON WebSocket:", e);
    }
  };

  ws.onclose = () => {
    connStatus.className = "status-indicator offline";
    connText.innerText = "Déconnecté";
    addLog("Connexion perdue. Reconnexion dans 3s...", "warning");
    setTimeout(connectWebSocket, 3000);
  };

  ws.onerror = (err) => {
    console.error("WebSocket Error:", err);
  };
}

function handleServerMessage(msg) {
  // Si c'est un message de bienvenue pur
  if (msg.type === "system") {
    addLog(msg.message, "info");
    return;
  }

  // Le backend FastAPI / WS broadcast souvent un format {event: "...", data: {...}}
  const eventName = msg.event;
  const data = msg.data || {};

  if (!eventName) return;

  // Logs Systèmes Généraux
  addLog(`[${eventName}] ${JSON.stringify(data)}`, "system");

  // Moteur STT (Utilisateur parle)
  if (eventName === "audio.speech_recognized") {
    addMessage(data.text || data.get("text", ""), "user");
    setOrbState("thinking"); // L'IA commence à réfléchir aussitôt
  }

  // Moteur Gemini (IA réfléchit / répond)
  if (eventName === "brain.thinking") {
    if (data.status) {
      setOrbState("thinking");
      document.getElementById("brain-status").innerText = "Analyse...";
      document.getElementById("brain-status").className = "value thinking";
    } else {
      document.getElementById("brain-status").innerText = "En veille";
      document.getElementById("brain-status").className = "value";
    }
  }

  if (eventName === "brain.response_generated") {
    addMessage(data.text || data.get("text", ""), "jarvis");
  }

  // Moteur TTS (IA parle)
  if (eventName === "audio.tts_started") {
    setOrbState("speaking");
    document.getElementById("tts-status").innerText = "Actif";
    document.getElementById("tts-status").className = "value active";
  }

  if (eventName === "audio.tts_stopped") {
    setOrbState("idle");
    document.getElementById("tts-status").innerText = "Inactif";
    document.getElementById("tts-status").className = "value";
  }

  // Popups UI (Recherche Web Interactive)
  if (eventName === "ui.show_web_results") {
    showWebResults(data);
  }

  if (eventName === "ui.hide_web_results") {
    hideWebResults();
  }
}

// Helpers d'affichage
function addLog(text, type = "system") {
  const div = document.createElement("div");
  div.className = `log-line ${type}`;
  const time = new Date().toLocaleTimeString();
  div.innerText = `[${time}] ${text}`;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function addMessage(text, sender) {
  if (!text) return;
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.innerText = text;
  transcript.appendChild(div);
  transcript.scrollTop = transcript.scrollHeight;
}

function setOrbState(state) {
  orb.className = "ai-orb"; // Reset
  if (state === "idle") {
    orbLabel.innerText = "I.D.L.E / ÉCOUTE";
  } else if (state === "listening") {
    orb.classList.add("listening");
    orbLabel.innerText = "ANALYSE VOCALE";
  } else if (state === "thinking") {
    orb.classList.add("thinking");
    orbLabel.innerText = "RÉSOLUTION CONTEXTUELLE";
  } else if (state === "speaking") {
    orb.classList.add("speaking");
    orbLabel.innerText = "SYNTHÈSE VOCALE";
  }
}

// Initialisation
window.addEventListener("DOMContentLoaded", () => {
  connectWebSocket();
});

const widgetsContainer = document.getElementById("widgets-container");

function showWebResults(data) {
  widgetsContainer.innerHTML = "";

  const header = document.createElement("h2");
  header.innerText = `Résultats pour: "${data.query || "Recherche"}"`;
  header.style.width = "100%";
  header.style.textAlign = "center";
  header.style.marginBottom = "20px";
  widgetsContainer.appendChild(header);

  const grid = document.createElement("div");
  grid.style.display = "flex";
  grid.style.flexWrap = "wrap";
  grid.style.gap = "15px";
  grid.style.justifyContent = "center";
  grid.style.width = "100%";

  (data.results || []).forEach((res) => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
          <div class="result-number">${res.id}</div>
          <div class="result-content">
              <h3>${res.title}</h3>
              <p>${res.snippet.substring(0, 120)}...</p>
              <span class="url">${res.url.substring(0, 50)}...</span>
          </div>
      `;
    grid.appendChild(card);
  });

  widgetsContainer.appendChild(grid);
  widgetsContainer.classList.remove("hidden");
}

function hideWebResults() {
  widgetsContainer.classList.add("hidden");
  widgetsContainer.innerHTML = "";
}
