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

    // Ajout conditionnel de la miniature (récupérée de Tavily)
    const imgHtml = res.image
      ? `<img src="${res.image}" class="result-thumbnail" alt="thumbnail" />`
      : "";

    card.innerHTML = `
          <div class="result-number">${res.id}</div>
          <div class="result-content">
              ${imgHtml}
              <h3>${res.title}</h3>
              <p>${res.snippet.substring(0, 150)}...</p>
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

// --- SETTINGS LOGIC ---
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsBtns = document.querySelectorAll(".close-settings-btn");
const settingsForm = document.getElementById("settings-form");
const geminiInput = document.getElementById("gemini-key");
const tavilyInput = document.getElementById("tavily-key");
const ttsVoiceSelect = document.getElementById("tts-voice");

const visionEnabledInput = document.getElementById("vision-enabled");
const cameraIndexInput = document.getElementById("camera-index");
const gmailEnabledInput = document.getElementById("gmail-enabled");
const haUrlInput = document.getElementById("ha-url");
const haTokenInput = document.getElementById("ha-token");
const saveModulesBtn = document.getElementById("save-modules-btn");
const moonrakerUrlInput = document.getElementById("moonraker-url");

const testCameraBtn = document.getElementById("test-camera-btn");
const cameraPreview = document.getElementById("camera-preview");

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const memoryTbody = document.getElementById("memory-tbody");

// Tabs Logic
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Retirer 'active' partout
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Mettre 'active' sur le clic
    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(`tab-${tabId}`).classList.add("active");
  });
});

async function loadVoices(currentVoice) {
  try {
    const res = await fetch("/api/voices");
    if (res.ok) {
      const data = await res.json();
      ttsVoiceSelect.innerHTML = ""; // Vider
      data.voices.forEach((v) => {
        const option = document.createElement("option");
        option.value = v;
        option.innerText = v;
        if (v === currentVoice) option.selected = true;
        ttsVoiceSelect.appendChild(option);
      });
    }
  } catch (err) {
    console.error("Erreur chargement voix:", err);
  }
}

async function loadMemory() {
  if (!memoryTbody) return;
  memoryTbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Chargement...</td></tr>`;
  try {
    const res = await fetch("/api/memory");
    if (res.ok) {
      const facts = await res.json();
      memoryTbody.innerHTML = "";
      if (facts.length === 0) {
        memoryTbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Aucun fait mémorisé.</td></tr>`;
        return;
      }

      facts.forEach((fact) => {
        const tr = document.createElement("tr");

        const tdKey = document.createElement("td");
        tdKey.innerText = fact.key;

        const tdValue = document.createElement("td");
        tdValue.innerText = fact.value;

        const tdAction = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.innerHTML = "🗑️";
        delBtn.title = "Oublier ce fait";
        delBtn.onclick = () => deleteMemory(fact.key);
        tdAction.appendChild(delBtn);

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        tr.appendChild(tdAction);

        memoryTbody.appendChild(tr);
      });
    }
  } catch (err) {
    memoryTbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">Erreur de chargement</td></tr>`;
  }
}

async function deleteMemory(key) {
  if (confirm(`Voulez-vous vraiment que JARVIS oublie : '${key}' ?`)) {
    try {
      const res = await fetch(`/api/memory/${encodeURIComponent(key)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addLog(`Fait '${key}' oublié avec succès.`, "info");
        await loadMemory(); // Rafraichir le tableau
      } else {
        addLog(`Erreur lors de la suppression de '${key}'.`, "error");
      }
    } catch (e) {
      addLog("Erreur réseau.", "error");
    }
  }
}

// Ouvrir modale et charger les données
if (settingsBtn) {
  settingsBtn.addEventListener("click", async () => {
    try {
      // 1. Charger variables .env
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        geminiInput.value = data._raw_gemini || "";
        tavilyInput.value = data._raw_tavily || "";

        visionEnabledInput.checked = data.vision_enabled === "true";
        cameraIndexInput.value = data.camera_index || "0";
        gmailEnabledInput.checked = data.gmail_enabled === "true";
        haUrlInput.value = data.ha_url || "";
        haTokenInput.value = data._raw_ha_token || "";
        moonrakerUrlInput.value = data.moonraker_url || "";

        // 2. Charger et sélectionner voix
        await loadVoices(data.kokoro_voice);

        // 3. Charger mémoire
        await loadMemory();

        settingsModal.showModal();
      } else {
        addLog(
          "Erreur: Impossible de lire la configuration depuis le serveur.",
          "error",
        );
      }
    } catch (e) {
      addLog("Erreur réseau lors de la lecture des paramètres.", "error");
    }
  });
}

// Fermeture
if (closeSettingsBtns) {
  closeSettingsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      settingsModal.close();
    });
  });
}

// Fonction de sauvegarde globale (pour l'onglet Général ET l'onglet Modules)
async function saveAllSettings() {
  const payload = {
    gemini_api_key: geminiInput.value,
    tavily_api_key: tavilyInput.value,
    kokoro_voice: ttsVoiceSelect ? ttsVoiceSelect.value : "ff_siwis",
    vision_enabled: visionEnabledInput.checked ? "true" : "false",
    camera_index: cameraIndexInput.value || "0",
    gmail_enabled: gmailEnabledInput.checked ? "true" : "false",
    ha_url: haUrlInput.value,
    ha_token: haTokenInput.value,
    moonraker_url: moonrakerUrlInput ? moonrakerUrlInput.value : "",
  };

  try {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      addLog(result.message || "Paramètres mis à jour.", "info");
      settingsModal.close();
    } else {
      const errorData = await res.json();
      addLog(
        `Erreur de sauvegarde: ${errorData.detail || "Inconnue"}`,
        "error",
      );
    }
  } catch (err) {
    addLog("Erreur réseau lors de la sauvegarde.", "error");
  }
}

// Lier aux deux boutons de sauvegarde existants
if (settingsForm) {
  settingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await saveAllSettings();
  });
}

if (saveModulesBtn) {
  saveModulesBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await saveAllSettings();
  });
}

if (testCameraBtn) {
  testCameraBtn.addEventListener("click", async () => {
    testCameraBtn.textContent = "Capture en cours... ⏳";
    cameraPreview.style.display = "none";
    try {
      const res = await fetch("/api/vision/test");
      if (res.ok) {
        const data = await res.json();
        cameraPreview.src = data.image;
        cameraPreview.style.display = "block";
      } else {
        const err = await res.json();
        addLog(`Erreur Vision: ${err.detail || "Inconnue"}`, "error");
      }
    } catch (e) {
      addLog("Erreur réseau: impossible de tester la caméra.", "error");
    } finally {
      testCameraBtn.textContent = "📸 Tester Caméra (Snapshot)";
    }
  });
}

// --- CHAT INPUT LOGIC ---
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");

function sendChatMessage() {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;

  // Envoi vers le WS. Le script /api/server.py ajoutera "ws." = "ws.ui.text_input" au bus.
  ws.send(
    JSON.stringify({
      event: "ui.text_input",
      data: { text: text },
    }),
  );

  // On affiche le message localement sans attendre (car c'est nous qui l'envoyons)
  addMessage(text, "user");

  chatInput.value = "";
}

if (chatSendBtn) {
  chatSendBtn.addEventListener("click", sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChatMessage();
    }
  });
}
