(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();class u{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new u;class v{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",s=window.location.host,a=`${t}//${s}/ws`;console.log(`[WS] Tentative de connexion à ${a}...`),this.ws=new WebSocket(a),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=e=>{try{const i=JSON.parse(e.data);this.handleMessage(i)}catch(i){console.error("[WS] Erreur parsing message:",i)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=e=>{console.error("[WS] Erreur:",e)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const s=t.event,a=t.data||{};if(s)switch(s){case"audio.speech_recognized":n.setState({lastUserMessage:a.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:a.status?"Analyse...":"En veille",orbStatus:a.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:a.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":n.setState({webSearchResults:a});break;case"ui.hide_web_results":n.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${s}`,a)}}send(t,s={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:s}))}addInternalLog(t,s){console.log(`[SYSTEM] ${t}`)}}const r=new v;class m{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
      <div class="status-bar glass">
        <div class="status-logo">
           <div class="mini-reactor"></div>
           <span class="logo-text">J.A.R.V.I.S. <span class="v">0.2</span></span>
        </div>
        
        <div class="status-items">
          <div class="status-item" id="stat-conn">
            <span class="val">OFFLINE</span>
            <span class="label">UPLINK</span>
          </div>
          <div class="status-item" id="stat-brain">
            <span class="val">IDLE</span>
            <span class="label">NEURAL NET</span>
          </div>
          <div class="status-item" id="stat-tts">
            <span class="val">INACTIVE</span>
            <span class="label">VOCAL LINK</span>
          </div>
        </div>
      </div>
    `}init(){const t=this.container.querySelector("#stat-conn .val"),s=this.container.querySelector("#stat-brain .val"),a=this.container.querySelector("#stat-tts .val");n.subscribe(e=>{t.textContent=e.connection.toUpperCase(),t.className=`val ${e.connection}`,s.textContent=e.brainStatus.toUpperCase(),s.className=`val ${e.orbStatus}`,a.textContent=e.ttsStatus.toUpperCase(),a.className=`val ${e.ttsStatus==="Actif"?"active":""}`})}}class f{constructor(t){this.container=document.getElementById(t),this.currentStatus="idle",this.render(),this.init(),this.spawnParticles(28),this.startDataScroll()}_hudData(){const t=["ARC CORE ▸ STABLE",`NEURAL SYNC ▸ ${(Math.random()*.6+99.1).toFixed(2)}%`,`LATENCY ▸ ${(Math.random()*4+8).toFixed(0)}ms`,"PHASE ▸ LOCKED",`FREQ ▸ ${(Math.random()*.4+2.48).toFixed(2)} GHz`,"ENERGY GRID ▸ ACTIVE",`SIGNAL ▸ ${(Math.random()*12+84).toFixed(0)}dB`,`CORE TEMP ▸ ${(Math.random()*4+36).toFixed(1)}°C`];return t[Math.floor(Math.random()*t.length)]}render(){this.container.innerHTML=`
      <div class="orb-scene" id="orb-scene" data-status="idle">

        <!-- Fond discret -->
        <svg class="orb-hex-grid" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="hex-pat" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon
                points="28,2 54,15 54,39 28,52 2,39 2,15"
                fill="none"
                stroke="var(--primary)"
                stroke-width="0.35"
                opacity="0.10"
              />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hex-pat)" />
        </svg>

        <!-- Particules -->
        <div class="orb-particles" id="orb-particles"></div>

        <!-- Sphère seule -->
        <svg class="orb-holo-svg orb-holo-svg--solo" viewBox="0 0 500 500" aria-hidden="true">
          <defs>
            <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="glow-strong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <radialGradient id="halo-back-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.22"/>
              <stop offset="55%" stop-color="var(--primary)" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/>
            </radialGradient>

            <radialGradient id="shell-grad" cx="38%" cy="32%" r="60%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92"/>
              <stop offset="14%" stop-color="#dff8ff" stop-opacity="0.84"/>
              <stop offset="28%" stop-color="var(--primary)" stop-opacity="0.68"/>
              <stop offset="58%" stop-color="var(--primary)" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <radialGradient id="core-grad" cx="42%" cy="36%" r="58%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
              <stop offset="16%" stop-color="var(--accent)" stop-opacity="0.75"/>
              <stop offset="38%" stop-color="var(--primary)" stop-opacity="0.34"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <linearGradient id="scan-band-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="transparent"/>
              <stop offset="50%" stop-color="var(--primary)" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>

            <linearGradient id="sheen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
              <stop offset="30%" stop-color="#ffffff" stop-opacity="0.06"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </linearGradient>

            <pattern id="sphere-scanlines" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="2" fill="var(--primary)" opacity="0.08"></rect>
            </pattern>

            <clipPath id="sphere-clip">
              <circle cx="250" cy="250" r="118"></circle>
            </clipPath>
          </defs>

          <!-- Halo arrière -->
          <circle
            cx="250"
            cy="250"
            r="158"
            fill="url(#halo-back-grad)"
            class="solo-halo-back"
          />

          <!-- Bruit / diffusion optique -->
          <circle
            cx="250"
            cy="250"
            r="132"
            fill="none"
            stroke="var(--primary)"
            stroke-width="1"
            opacity="0.14"
            filter="url(#glow-strong)"
            class="solo-aura"
          />

          <!-- Sphère principale -->
          <g class="solo-orb-group">
            <!-- coque -->
            <circle
              cx="250"
              cy="250"
              r="118"
              fill="url(#shell-grad)"
              class="solo-shell"
            />

            <!-- scanlines / balayage -->
            <g clip-path="url(#sphere-clip)" class="solo-scan-wrap">
              <circle
                cx="250"
                cy="250"
                r="118"
                fill="url(#sphere-scanlines)"
                opacity="0.82"
              />

              <rect
                x="118"
                y="188"
                width="264"
                height="20"
                fill="url(#scan-band-grad)"
                class="solo-scan-band solo-scan-band-a"
                opacity="0.42"
              />
              <rect
                x="128"
                y="248"
                width="244"
                height="12"
                fill="url(#scan-band-grad)"
                class="solo-scan-band solo-scan-band-b"
                opacity="0.22"
              />
              <rect
                x="140"
                y="292"
                width="220"
                height="10"
                fill="url(#scan-band-grad)"
                class="solo-scan-band solo-scan-band-c"
                opacity="0.16"
              />
            </g>

            <!-- structure interne -->
            <g class="solo-structure" transform="translate(250,250)">
              <circle
                r="96"
                fill="none"
                stroke="var(--primary)"
                stroke-width="0.9"
                stroke-dasharray="6 12"
                opacity="0.18"
              />
              <circle
                r="72"
                fill="none"
                stroke="var(--primary)"
                stroke-width="0.8"
                stroke-dasharray="2 9"
                opacity="0.14"
              />
              <circle
                r="48"
                fill="none"
                stroke="var(--accent)"
                stroke-width="0.7"
                stroke-dasharray="3 8"
                opacity="0.12"
              />

              <path
                d="M -74 -10 A 82 82 0 0 1 64 -34"
                fill="none"
                stroke="var(--primary)"
                stroke-width="1"
                opacity="0.18"
                stroke-linecap="round"
              />
              <path
                d="M -40 58 A 70 70 0 0 0 54 28"
                fill="none"
                stroke="var(--accent)"
                stroke-width="0.9"
                opacity="0.14"
                stroke-linecap="round"
              />
              <path
                d="M -18 -78 A 84 84 0 0 1 64 -46"
                fill="none"
                stroke="var(--primary)"
                stroke-width="0.85"
                opacity="0.12"
                stroke-linecap="round"
              />
            </g>

            <!-- noyau -->
            <circle
              cx="250"
              cy="250"
              r="70"
              fill="url(#core-grad)"
              class="solo-core"
            />

            <!-- reflet principal -->
            <ellipse
              cx="220"
              cy="206"
              rx="30"
              ry="24"
              fill="#ffffff"
              opacity="0.24"
              filter="url(#glow-soft)"
              class="solo-specular"
            />
            <circle
              cx="210"
              cy="194"
              r="9"
              fill="#ffffff"
              opacity="0.88"
              filter="url(#glow-soft)"
            />

            <!-- voile brillant -->
            <path
              d="M 180 160 C 230 120, 308 132, 338 188 C 304 174, 256 176, 214 198 C 196 206, 184 188, 180 160 Z"
              fill="url(#sheen-grad)"
              opacity="0.42"
              class="solo-sheen"
            />

            <!-- contour -->
            <circle
              cx="250"
              cy="250"
              r="118"
              fill="none"
              stroke="var(--primary)"
              stroke-width="1.5"
              opacity="0.52"
              filter="url(#glow-soft)"
            />

            <!-- léger contour interne -->
            <circle
              cx="250"
              cy="250"
              r="104"
              fill="none"
              stroke="var(--primary)"
              stroke-width="0.8"
              opacity="0.14"
            />

            <!-- petit point énergétique -->
            <circle
              cx="296"
              cy="230"
              r="3.2"
              fill="var(--primary)"
              opacity="0.75"
              filter="url(#glow-soft)"
              class="solo-energy-dot"
            />
          </g>

          <!-- label bas discret -->
          <g font-family="'Space Mono', monospace" fill="var(--primary)" opacity="0.65">
            <text x="250" y="404" text-anchor="middle" font-size="8" letter-spacing="3" class="hud-blink">
              ARC REACTOR LINK
            </text>
            <text x="250" y="418" text-anchor="middle" font-size="7" opacity="0.45" id="hud-line-c">
              ARC CORE ▸ STABLE
            </text>
          </g>
        </svg>

        <div class="orb-label" id="orb-label">VEILLE</div>
      </div>
    `}spawnParticles(t){const s=document.getElementById("orb-particles");if(s)for(let a=0;a<t;a++){const e=document.createElement("div");e.className="orb-particle";const i=Math.random()*2.6+1,o=Math.random()*100,c=Math.random()*100,d=Math.random()*7+7,p=Math.random()*-10,h=(Math.random()-.5)*42;e.style.cssText=`
        width: ${i}px;
        height: ${i}px;
        left: ${o}%;
        top: ${c}%;
        animation-duration: ${d}s;
        animation-delay: ${p}s;
        --drift-x: ${h}px;
        --drift-y: ${-Math.random()*70-18}px;
        --p-opacity: ${Math.random()*.28+.12};
      `,s.appendChild(e)}}startDataScroll(){setInterval(()=>{const t=document.getElementById("hud-line-c");t&&(t.textContent=this._hudData())},2200)}init(){this.scene=document.getElementById("orb-scene"),this.label=document.getElementById("orb-label"),n.subscribe(t=>{t.orbStatus!==this.currentStatus&&(this.currentStatus=t.orbStatus,this.updateState(t.orbStatus))})}updateState(t){this.scene.setAttribute("data-status",t);const s={idle:"VEILLE",listening:"ANALYSE VOIX",thinking:"TRAITEMENT",speaking:"ALLOCUTION"};this.label.textContent=s[t]||t.toUpperCase()}}class b{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
      <div class="terminal glass">
        <div class="terminal-header">
          <span class="terminal-title">FLUX DE DONNÉES</span>
          <div class="terminal-controls">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
        </div>
        <div class="terminal-content">
          <div class="log-line system">Initialisation du noyau visuel...</div>
        </div>
      </div>
    `}init(){}addLog(t,s="system"){const a=document.createElement("div");a.className=`log-line ${s}`;const e=new Date().toLocaleTimeString();a.innerHTML=`<span class="log-time">[${e}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(a),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class y{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(r.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,s){const a=this.box.lastElementChild;if(a&&a.textContent===t&&a.classList.contains(s))return;const e=document.createElement("div");e.className=`msg ${s}`,e.textContent=t,this.box.appendChild(e),this.box.scrollTop=this.box.scrollHeight,e.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class g{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(s=>s.classList.toggle("active",s.dataset.tab===t)),this.panes.forEach(s=>s.classList.toggle("active",s.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const s=await t.json();this.form.querySelectorAll("input, select").forEach(e=>{const i=e.name;let o=s[i]||s[`_raw_${i}`.replace("api_key","")]||"";i==="gemini_api_key"&&(o=s._raw_gemini||""),i==="tavily_api_key"&&(o=s._raw_tavily||""),i==="ha_token"&&(o=s._raw_ha_token||""),e.type==="checkbox"?e.checked=o==="true":e.value=o}),await this.loadVoices(s.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const s=await fetch("/api/voices");if(s.ok){const a=await s.json();this.voiceSelect.innerHTML="",a.voices.forEach(e=>{const i=document.createElement("option");i.value=e,i.textContent=e.toUpperCase(),e===t&&(i.selected=!0),this.voiceSelect.appendChild(i)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const s=await t.json();if(this.memoryList.innerHTML="",s.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}s.forEach(a=>{const e=document.createElement("div");e.className="memory-item",e.innerHTML=`
          <div class="m-key">${a.key}</div>
          <div class="m-val">${a.value}</div>
          <button class="m-del" data-key="${a.key}">✕</button>
        `,e.querySelector(".m-del").onclick=()=>this.deleteMemory(a.key),this.memoryList.appendChild(e)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(a=>{t[a.name]=a.type==="checkbox"?a.checked?"true":"false":a.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class E{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){n.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:s,results:a}=t,e=a.map(i=>`
        <div class="web-result-card glass">
          <div class="web-result-id">${i.id}</div>
          <div class="web-result-content">
            <h3 class="web-result-title">${this.escapeHtml(i.title)}</h3>
            <p class="web-result-snippet">${this.escapeHtml(i.snippet)}</p>
            <div class="web-result-url">${this.escapeHtml(i.url)}</div>
          </div>
          ${i.image?`<div class="web-result-image" style="background-image: url('${i.image}')"></div>`:'<div class="web-result-image-placeholder">N/A</div>'}
        </div>
      `).join("");this.container.innerHTML=`
      <div class="web-search-modal glass-modal">
        <div class="web-search-content glass">
          <div class="web-search-header">
            <div class="status-dot"></div>
            <h2>RECHERCHE WEB <span class="query-text">"${this.escapeHtml(s)}"</span></h2>
          </div>
          <div class="web-search-body hide-scroll">
            <div class="web-results-grid">
              ${e}
            </div>
          </div>
          <div class="web-search-footer">
            <span class="pulsing-text">EN ATTENTE DE SÉLECTION VOCALE...</span>
          </div>
        </div>
      </div>
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class S{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new m("status-mount"),this.orb=new f("orb-mount"),this.terminal=new b("terminal-mount"),this.chat=new y("chat-mount"),this.settings=new g("settings-mount"),this.websearch=new E("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),r.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new S;
