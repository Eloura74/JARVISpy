import React, { useEffect, useState, useRef } from "react";
import "./Settings.css"; // Ensure CSS is available - will use default app styles if not

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [memoryItems, setMemoryItems] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isLoadingMemory, setIsLoadingMemory] = useState(false);

  const [formData, setFormData] = useState({
    gemini_api_key: "",
    tavily_api_key: "",
    kokoro_voice: "",
    openweather_api_key: "",
    default_city: "",
    ui_theme: localStorage.getItem("jarvis_theme") || "matrix",
    vision_enabled: false,
    camera_index: "0",
    proactive_enabled: false,
    presence_check_interval: 30,
    absence_threshold: 60,
    system_monitor_interval: 60,
    gmail_enabled: false,
    wa_default_phone: "",
    wa_notify_on_alerts: false,
    ha_url: "",
    ha_token: "",
    moonraker_url: "",
    bambu_ip: "",
    bambu_serial: "",
    bambu_access_code: "",
    google_maps_api_key: "",
    loc_home: "",
    loc_work: "",
    toast_enabled: false,
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      loadSettings();
    };

    window.addEventListener("open-settings", handleOpen);
    return () => window.removeEventListener("open-settings", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === "memory" && isOpen) {
      loadMemory();
    }
  }, [activeTab, isOpen]);

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          ...data,
          gemini_api_key: data._raw_gemini || data.gemini_api_key || "",
          tavily_api_key: data._raw_tavily || data.tavily_api_key || "",
          ha_token: data._raw_ha_token || data.ha_token || "",
          gmail_enabled: data.gmail_enabled === "true" || data.gmail_enabled === true,
          wa_notify_on_alerts: data.wa_notify_on_alerts === "true" || data.wa_notify_on_alerts === true,
          toast_enabled: data.toast_enabled === "true" || data.toast_enabled === true,
          vision_enabled: data.vision_enabled === "true" || data.vision_enabled === true,
          proactive_enabled: data.proactive_enabled === "true" || data.proactive_enabled === true,
          ui_theme: localStorage.getItem("jarvis_theme") || "matrix",
          google_maps_api_key: data._raw_google_maps || data.google_maps_api_key || "",
        }));
        loadVoices(data.kokoro_voice);
      }

      const resLoc = await fetch("/api/settings/locations");
      if (resLoc.ok) {
        const locData = await resLoc.json();
        setFormData((prev) => ({
          ...prev,
          loc_home: locData.home || "",
          loc_work: locData.work || "",
        }));
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const loadVoices = async (currentVoice) => {
    try {
      const res = await fetch("/api/voices");
      if (res.ok) {
        const data = await res.json();
        setVoices(data.voices || []);
      }
    } catch (e) {
      console.error("Failed to load voices", e);
    }
  };

  const loadMemory = async () => {
    setIsLoadingMemory(true);
    try {
      const res = await fetch("/api/memory");
      if (res.ok) {
        const data = await res.json();
        setMemoryItems(data || []);
      } else {
        setMemoryItems([]);
      }
    } catch (e) {
      console.error("Failed to load memory", e);
      setMemoryItems([]);
    } finally {
      setIsLoadingMemory(false);
    }
  };

  const deleteMemory = async (key) => {
    if (!window.confirm(`OUBLIER : ${key} ?`)) return;
    try {
      const res = await fetch(`/api/memory/${encodeURIComponent(key)}`, {
        method: "DELETE",
      });
      if (res.ok) loadMemory();
    } catch (e) {
      console.error("Failed to delete memory", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Préparer le payload avec les types corrects pour l'API (Pydantic 422 Fix)
    const payload = { 
      ...formData,
      vision_enabled: Boolean(formData.vision_enabled),
      gmail_enabled: Boolean(formData.gmail_enabled),
      wa_notify_on_alerts: Boolean(formData.wa_notify_on_alerts),
      toast_enabled: Boolean(formData.toast_enabled),
      proactive_enabled: Boolean(formData.proactive_enabled),
      camera_index: parseInt(formData.camera_index || 0),
      presence_check_interval: parseInt(formData.presence_check_interval || 5),
      absence_threshold: parseInt(formData.absence_threshold || 600),
      system_monitor_interval: parseInt(formData.system_monitor_interval || 60)
    };

    // Remap location data so backend can process it separately
    const locPayload = { home: formData.loc_home, work: formData.loc_work };
    delete payload.loc_home;
    delete payload.loc_work;

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const theme = payload.ui_theme || "default";
        localStorage.setItem("jarvis_theme", theme);
        document.documentElement.setAttribute("data-theme", theme);

        await fetch("/api/settings/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(locPayload),
        });

        handleClose();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(
          `ERREUR DE DÉPLOIEMENT: ${errData.detail?.[0]?.msg || "Format invalide"}`,
        );
      }
    } catch (err) {
      alert("ÉCHEC LIAISON");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (dialogRef.current) dialogRef.current.close();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <dialog
      className="settings-modal glass-modal"
      ref={dialogRef}
      onClose={() => setIsOpen(false)}
    >
      <div className="modal-content glass">
        <div className="modal-header">
          <div className="header-main">
            <span className="status-dot online"></span>
            <h2>CORE CONFIGURATION // 0.3</h2>
          </div>
          <div className="tab-controls">
            <button
              className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              NEURAL & KEYS
            </button>
            <button
              className={`tab-btn ${activeTab === "interfaces" ? "active" : ""}`}
              onClick={() => setActiveTab("interfaces")}
            >
              INTERFACES
            </button>
            <button
              className={`tab-btn ${activeTab === "advanced" ? "active" : ""}`}
              onClick={() => setActiveTab("advanced")}
            >
              SYSTEM & IO
            </button>
            <button
              className={`tab-btn ${activeTab === "memory" ? "active" : ""}`}
              onClick={() => setActiveTab("memory")}
            >
              MEMORY
            </button>
          </div>
        </div>

        <form
          id="settings-form"
          className="modal-body hide-scroll"
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={`tab-pane ${activeTab === "general" ? "active" : ""}`}
          >
            <div className="form-section">
              <div className="section-label">AI SERVICES // SECURITY</div>
              <div className="form-grid">
                <div className="input-field">
                  <label>GEMINI API KEY</label>
                  <input
                    type="password"
                    name="gemini_api_key"
                    value={formData.gemini_api_key}
                    onChange={handleInputChange}
                    placeholder="AIzaSy..."
                  />
                </div>
                <div className="input-field">
                  <label>TAVILY API KEY</label>
                  <input
                    type="password"
                    name="tavily_api_key"
                    value={formData.tavily_api_key}
                    onChange={handleInputChange}
                    placeholder="tvly-..."
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">
                VOICE SYNTHESIS // LOCAL ENGINE
              </div>
              <div className="input-field">
                <label>KOKORO VOICE PROFILE</label>
                <select
                  name="kokoro_voice"
                  value={formData.kokoro_voice}
                  onChange={handleInputChange}
                >
                  <option value="">SCANNING VOICES...</option>
                  {voices.map((v) => (
                    <option key={v} value={v}>
                      {v.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">ENVIRONMENTAL DATA</div>
              <div className="form-grid">
                <div className="input-field">
                  <label>OPENWEATHER API</label>
                  <input
                    type="password"
                    name="openweather_api_key"
                    value={formData.openweather_api_key}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-field">
                  <label>CITY / LOCATION</label>
                  <input
                    type="text"
                    name="default_city"
                    value={formData.default_city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`tab-pane ${activeTab === "interfaces" ? "active" : ""}`}
          >
            <div className="form-section">
              <div className="section-label">UI & ESTHÉTIQUE</div>
              <div className="input-field">
                <label>THÈME SYSTÈME</label>
                <select
                  name="ui_theme"
                  value={formData.ui_theme}
                  onChange={handleInputChange}
                >
                  <option value="default">SYSTÈME BLEU (ORIGINAL)</option>
                  <option value="bronze">BRONZE ÉLÉGANT (PREMIUM)</option>
                  <option value="hacker">HACKER AMBER (TERMINAL)</option>
                  <option value="matrix">SYSTÈME MATRIX (LEGACY)</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">VISION & BIOMETRICS</div>
              <div className="toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="vision_enabled"
                    checked={formData.vision_enabled}
                    onChange={handleInputChange}
                  />
                  <span>ENABLE COMPUTER VISION (OPENCV)</span>
                </label>
                <div className="input-field small">
                  <label>CAM_ID</label>
                  <input
                    type="number"
                    name="camera_index"
                    value={formData.camera_index}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">PROACTIVE INTELLIGENCE</div>
              <div className="toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="proactive_enabled"
                    checked={formData.proactive_enabled}
                    onChange={handleInputChange}
                  />
                  <span>ENABLE PROACTIVE ACTIONS</span>
                </label>
              </div>
              <div className="form-grid">
                <div className="input-field">
                  <label>PRESENCE CHECK (SEC)</label>
                  <input
                    type="number"
                    name="presence_check_interval"
                    value={formData.presence_check_interval}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="input-field">
                  <label>ABSENCE THRESHOLD (SEC)</label>
                  <input
                    type="number"
                    name="absence_threshold"
                    value={formData.absence_threshold}
                    onChange={handleInputChange}
                    min="30"
                  />
                </div>
                <div className="input-field">
                  <label>SYS MONITOR (SEC)</label>
                  <input
                    type="number"
                    name="system_monitor_interval"
                    value={formData.system_monitor_interval}
                    onChange={handleInputChange}
                    min="10"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">MESSAGING & COMMS</div>
              <div className="toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="gmail_enabled"
                    checked={formData.gmail_enabled}
                    onChange={handleInputChange}
                  />
                  <span>GMAIL SYNC (OAUTH2)</span>
                </label>
              </div>
              <div className="input-field">
                <label>WA DEFAULT RECIPIENT</label>
                <input
                  type="text"
                  name="wa_default_phone"
                  value={formData.wa_default_phone}
                  onChange={handleInputChange}
                  placeholder="+33..."
                />
              </div>
              <div className="toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="wa_notify_on_alerts"
                    checked={formData.wa_notify_on_alerts}
                    onChange={handleInputChange}
                  />
                  <span>PROACTIVE WHATSAPP ALERTS</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">HOME AUTOMATION // HA LIAISON</div>
              <div className="input-field">
                <label>HA CORE URL</label>
                <input
                  type="text"
                  name="ha_url"
                  value={formData.ha_url}
                  onChange={handleInputChange}
                  placeholder="http://192.168.x.x:8123"
                />
              </div>
              <div className="input-field">
                <label>LONG-LIVED TOKEN</label>
                <input
                  type="password"
                  name="ha_token"
                  value={formData.ha_token}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div
            className={`tab-pane ${activeTab === "advanced" ? "active" : ""}`}
          >
            <div className="form-section">
              <div className="section-label">3D ADDITIVE MANUFACTURING</div>
              <div className="input-field">
                <label>MOONRAKER HOST (KLIPPER)</label>
                <input
                  type="text"
                  name="moonraker_url"
                  value={formData.moonraker_url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-grid">
                <div className="input-field">
                  <label>BAMBU IP</label>
                  <input
                    type="text"
                    name="bambu_ip"
                    value={formData.bambu_ip}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-field">
                  <label>BAMBU SERIAL</label>
                  <input
                    type="text"
                    name="bambu_serial"
                    value={formData.bambu_serial}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-field">
                  <label>ACCESS CODE</label>
                  <input
                    type="password"
                    name="bambu_access_code"
                    value={formData.bambu_access_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">GEOINT SERVICES</div>
              <div className="input-field">
                <label>GOOGLE MAPS MATRIX API</label>
                <input
                  type="password"
                  name="google_maps_api_key"
                  value={formData.google_maps_api_key}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">FAVORITE PLACES (MAPS)</div>
              <div className="form-grid">
                <div className="input-field">
                  <label>🏠 MAISON (ADRESSE)</label>
                  <input
                    type="text"
                    name="loc_home"
                    value={formData.loc_home}
                    onChange={handleInputChange}
                    placeholder="123 rue de..."
                  />
                </div>
                <div className="input-field">
                  <label>🏢 TRAVAIL (ADRESSE)</label>
                  <input
                    type="text"
                    name="loc_work"
                    value={formData.loc_work}
                    onChange={handleInputChange}
                    placeholder="Zone indus..."
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-label">NOTIFICATIONS</div>
              <div className="toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="toast_enabled"
                    checked={formData.toast_enabled}
                    onChange={handleInputChange}
                  />
                  <span>ENABLE SYSTEM TOASTS (WIN)</span>
                </label>
              </div>
            </div>
          </div>

          <div className={`tab-pane ${activeTab === "memory" ? "active" : ""}`}>
            <div className="memory-container hide-scroll">
              <div className="section-label">
                NEURAL DATABASE // LONG TERM MEMORY
              </div>
              <div className="memory-list">
                {isLoadingMemory ? (
                  <div className="loader">SYNCHRONISATION...</div>
                ) : memoryItems.length === 0 ? (
                  <p className="empty">AUCUNE DONNÉE MÉMORISÉE</p>
                ) : (
                  memoryItems.map((item) => (
                    <div className="memory-item" key={item.key}>
                      <div className="m-key">{item.key}</div>
                      <div className="m-val">{item.value}</div>
                      <button
                        type="button"
                        className="m-del"
                        onClick={() => deleteMemory(item.key)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <div className="tech-log">
            LIAISON SERVEUR: <span className="v">STABLE</span>
          </div>
          <div className="action-btns">
            <button
              type="button"
              className="btn-cancel close-btn"
              onClick={handleClose}
            >
              REFUSER
            </button>
            <button type="button" className="btn-confirm" onClick={handleSave}>
              {isSaving ? "SYNCHRONISATION..." : "DÉPLOYER CONFIGURATION"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
