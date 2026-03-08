import { store } from "../../services/state.js";

/**
 * Settings Component - Configuration Système J.A.R.V.I.S 3.0 (ULTRA-PRO)
 * Restauration exhaustive de TOUS les paramètres avec UI Premium.
 */
export class Settings {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.render();
    this.modal = this.container.querySelector(".settings-modal");
    this.form = this.container.querySelector("#settings-form");
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <dialog class="settings-modal glass-modal">
        <div class="modal-content glass">
          <div class="modal-header">
            <div class="header-main">
              <span class="status-dot online"></span>
              <h2>CORE CONFIGURATION // 0.2</h2>
            </div>
            <div class="tab-controls">
              <button class="tab-btn active" data-tab="general">NEURAL & KEYS</button>
              <button class="tab-btn" data-tab="interfaces">INTERFACES</button>
              <button class="tab-btn" data-tab="advanced">SYSTEM & IO</button>
              <button class="tab-btn" data-tab="memory">MEMORY</button>
            </div>
          </div>
          
          <form id="settings-form" class="modal-body hide-scroll">
            <!-- TAB: NEURAL & KEYS -->
            <div class="tab-pane active" id="pane-general">
              <div class="form-section">
                <div class="section-label">AI SERVICES // SECURITY</div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>GEMINI API KEY</label>
                    <input type="password" name="gemini_api_key" placeholder="AIzaSy..." />
                  </div>
                  <div class="input-field">
                    <label>TAVILY API KEY</label>
                    <input type="password" name="tavily_api_key" placeholder="tvly-..." />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">VOICE SYNTHESIS // LOCAL ENGINE</div>
                <div class="input-field">
                  <label>KOKORO VOICE PROFILE</label>
                  <select name="kokoro_voice" id="tts-voice">
                     <option value="">SCANNING VOICES...</option>
                  </select>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">ENVIRONMENTAL DATA</div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>OPENWEATHER API</label>
                    <input type="password" name="openweather_api_key" />
                  </div>
                  <div class="input-field">
                    <label>CITY / LOCATION</label>
                    <input type="text" name="default_city" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- TAB: INTERFACES -->
            <div class="tab-pane" id="pane-interfaces">
              <div class="form-section">
                <div class="section-label">UI & ESTHÉTIQUE</div>
                <div class="input-field">
                  <label>THÈME SYSTÈME</label>
                  <select name="ui_theme" id="ui-theme">
                    <option value="default">SYSTÈME BLEU (ORIGINAL)</option>
                    <option value="bronze">BRONZE ÉLÉGANT (PREMIUM)</option>
                  </select>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">VISION & BIOMETRICS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="vision_enabled">
                    <span>ENABLE COMPUTER VISION (OPENCV)</span>
                  </label>
                  <div class="input-field small">
                    <label>CAM_ID</label>
                    <input type="number" name="camera_index" min="0" step="1" />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">PROACTIVE INTELLIGENCE</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="proactive_enabled">
                    <span>ENABLE PROACTIVE ACTIONS</span>
                  </label>
                </div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>PRESENCE CHECK (SEC)</label>
                    <input type="number" name="presence_check_interval" min="1" />
                  </div>
                  <div class="input-field">
                    <label>ABSENCE THRESHOLD (SEC)</label>
                    <input type="number" name="absence_threshold" min="30" />
                  </div>
                  <div class="input-field">
                    <label>SYS MONITOR (SEC)</label>
                    <input type="number" name="system_monitor_interval" min="10" />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">MESSAGING & COMMS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="gmail_enabled">
                    <span>GMAIL SYNC (OAUTH2)</span>
                  </label>
                </div>
                <div class="input-field">
                  <label>WA DEFAULT RECIPIENT</label>
                  <input type="text" name="wa_default_phone" placeholder="+33..." />
                </div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="wa_notify_on_alerts">
                    <span>PROACTIVE WHATSAPP ALERTS</span>
                  </label>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">HOME AUTOMATION // HA LIAISON</div>
                <div class="input-field">
                  <label>HA CORE URL</label>
                  <input type="text" name="ha_url" placeholder="http://192.168.x.x:8123" />
                </div>
                <div class="input-field">
                  <label>LONG-LIVED TOKEN</label>
                  <input type="password" name="ha_token" />
                </div>
              </div>
            </div>

            <!-- TAB: ADVANCED (3D PRINTING & MAPS) -->
            <div class="tab-pane" id="pane-advanced">
              <div class="form-section">
                <div class="section-label">3D ADDITIVE MANUFACTURING</div>
                <div class="input-field">
                  <label>MOONRAKER HOST (KLIPPER)</label>
                  <input type="text" name="moonraker_url" />
                </div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>BAMBU IP</label>
                    <input type="text" name="bambu_ip" />
                  </div>
                  <div class="input-field">
                    <label>BAMBU SERIAL</label>
                    <input type="text" name="bambu_serial" />
                  </div>
                  <div class="input-field">
                    <label>ACCESS CODE</label>
                    <input type="password" name="bambu_access_code" />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">GEOINT SERVICES</div>
                <div class="input-field">
                  <label>GOOGLE MAPS MATRIX API</label>
                  <input type="password" name="google_maps_api_key" />
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">FAVORITE PLACES (MAPS)</div>
                <div class="form-grid">
                  <div class="input-field">
                    <label>🏠 MAISON (ADRESSE)</label>
                    <input type="text" id="loc-home" placeholder="123 rue de..." />
                  </div>
                  <div class="input-field">
                    <label>🏢 TRAVAIL (ADRESSE)</label>
                    <input type="text" id="loc-work" placeholder="Zone indus..." />
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-label">NOTIFICATIONS</div>
                <div class="toggle-group">
                  <label class="toggle-label">
                    <input type="checkbox" name="toast_enabled">
                    <span>ENABLE SYSTEM TOASTS (WIN)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- TAB: MEMORY -->
            <div class="tab-pane" id="pane-memory">
              <div class="memory-container hide-scroll">
                <div class="section-label">NEURAL DATABASE // LONG TERM MEMORY</div>
                <div id="memory-list" class="memory-list">
                  <p class="empty">ACCURATE DATA SCAN IN PROGRESS...</p>
                </div>
              </div>
            </div>
          </form>

          <div class="modal-footer">
            <div class="tech-log">LIAISON SERVEUR: <span class="v">STABLE</span></div>
            <div class="action-btns">
              <button type="button" class="btn-cancel close-btn">REFUSER</button>
              <button type="button" class="btn-confirm" id="save-btn">DÉPLOYER CONFIGURATION</button>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }

  async init() {
    this.saveBtn = this.container.querySelector("#save-btn");
    this.closeBtn = this.container.querySelector(".close-btn");
    this.tabBtns = this.container.querySelectorAll(".tab-btn");
    this.panes = this.container.querySelectorAll(".tab-pane");
    this.voiceSelect = this.container.querySelector("#tts-voice");
    this.memoryList = this.container.querySelector("#memory-list");

    this.closeBtn.addEventListener("click", () => this.modal.close());
    this.saveBtn.addEventListener("click", () => this.saveSettings());

    this.tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
    });
  }

  switchTab(tabId) {
    this.tabBtns.forEach((b) =>
      b.classList.toggle("active", b.dataset.tab === tabId),
    );
    this.panes.forEach((p) =>
      p.classList.toggle("active", p.id === `pane-${tabId}`),
    );
    if (tabId === "memory") this.loadMemory();
  }

  async loadSettings() {
    try {
      // Chargement du thème local
      const savedTheme = localStorage.getItem("jarvis_theme") || "default";
      document.documentElement.setAttribute("data-theme", savedTheme);
      const themeSelect = this.form.querySelector("#ui-theme");
      if (themeSelect) themeSelect.value = savedTheme;

      const response = await fetch("/api/settings");
      if (!response.ok) return;
      const data = await response.json();

      const inputs = this.form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        const name = input.name;
        // Mappage robuste (on check à la fois name et _raw_name)
        let val =
          data[name] || data[`_raw_${name}`.replace("api_key", "")] || "";

        // Fix spécifique pour les clés API masquées par l'API originale
        if (name === "gemini_api_key") val = data._raw_gemini || "";
        if (name === "tavily_api_key") val = data._raw_tavily || "";
        if (name === "ha_token") val = data._raw_ha_token || "";

        if (input.type === "checkbox") {
          input.checked = val === "true";
        } else {
          input.value = val;
        }
      });

      await this.loadVoices(data.kokoro_voice);
      await this.loadLocations();
    } catch (e) {
      console.error(e);
    }
  }

  async loadVoices(currentVoice) {
    try {
      const res = await fetch("/api/voices");
      if (res.ok) {
        const data = await res.json();
        this.voiceSelect.innerHTML = "";
        data.voices.forEach((v) => {
          const opt = document.createElement("option");
          opt.value = v;
          opt.textContent = v.toUpperCase();
          if (v === currentVoice) opt.selected = true;
          this.voiceSelect.appendChild(opt);
        });
      }
    } catch (e) {}
  }

  async loadLocations() {
    try {
      const res = await fetch("/api/settings/locations");
      if (res.ok) {
        const data = await res.json();
        this.container.querySelector("#loc-home").value = data.home || "";
        this.container.querySelector("#loc-work").value = data.work || "";
      }
    } catch (e) {}
  }

  async loadMemory() {
    this.memoryList.innerHTML = '<div class="loader">SYNCHRONISATION...</div>';
    try {
      const res = await fetch("/api/memory");
      if (!res.ok) return;
      const data = await res.json();
      this.memoryList.innerHTML = "";
      if (data.length === 0) {
        this.memoryList.innerHTML =
          '<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';
        return;
      }
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "memory-item";
        div.innerHTML = `
          <div class="m-key">${item.key}</div>
          <div class="m-val">${item.value}</div>
          <button class="m-del" data-key="${item.key}">✕</button>
        `;
        div.querySelector(".m-del").onclick = () => this.deleteMemory(item.key);
        this.memoryList.appendChild(div);
      });
    } catch (e) {
      this.memoryList.innerHTML = "ÉCHEC LECTURE";
    }
  }

  async deleteMemory(key) {
    if (!confirm(`OUBLIER : ${key} ?`)) return;
    try {
      const res = await fetch(`/api/memory/${encodeURIComponent(key)}`, {
        method: "DELETE",
      });
      if (res.ok) this.loadMemory();
    } catch (e) {}
  }

  async saveSettings() {
    const payload = {};
    const inputs = this.form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      payload[input.name] =
        input.type === "checkbox"
          ? input.checked
            ? "true"
            : "false"
          : input.value;
    });

    try {
      this.saveBtn.textContent = "SYNCHRONISATION...";
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Sauvegarde du thème local
        const theme = payload.ui_theme || "default";
        localStorage.setItem("jarvis_theme", theme);
        document.documentElement.setAttribute("data-theme", theme);

        await this.saveLocations();
        this.modal.close();
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("[SETTINGS] Erreur validation:", errData);
        alert(
          `ERREUR DE DÉPLOIEMENT: ${errData.detail?.[0]?.msg || "Format invalide"}`,
        );
      }
    } catch (err) {
      alert("ÉCHEC LIAISON");
    } finally {
      this.saveBtn.textContent = "DÉPLOYER CONFIGURATION";
    }
  }

  async saveLocations() {
    const data = {
      home: this.container.querySelector("#loc-home").value,
      work: this.container.querySelector("#loc-work").value,
    };
    try {
      await fetch("/api/settings/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {}
  }

  open() {
    this.loadSettings();
    this.modal.showModal();
  }
}
