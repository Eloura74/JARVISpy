(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class u{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new u;class m{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",e=window.location.host,i=`${t}//${e}/ws`;console.log(`[WS] Tentative de connexion à ${i}...`),this.ws=new WebSocket(i),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=s=>{try{const a=JSON.parse(s.data);this.handleMessage(a)}catch(a){console.error("[WS] Erreur parsing message:",a)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=s=>{console.error("[WS] Erreur:",s)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const e=t.event,i=t.data||{};if(e)switch(e){case"audio.speech_recognized":n.setState({lastUserMessage:i.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:i.status?"Analyse...":"En veille",orbStatus:i.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:i.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":n.setState({webSearchResults:i});break;case"ui.hide_web_results":n.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${e}`,i)}}send(t,e={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:e}))}addInternalLog(t,e){console.log(`[SYSTEM] ${t}`)}}const o=new m;class v{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
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
    `}init(){const t=this.container.querySelector("#stat-conn .val"),e=this.container.querySelector("#stat-brain .val"),i=this.container.querySelector("#stat-tts .val");n.subscribe(s=>{t.textContent=s.connection.toUpperCase(),t.className=`val ${s.connection}`,e.textContent=s.brainStatus.toUpperCase(),e.className=`val ${s.orbStatus}`,i.textContent=s.ttsStatus.toUpperCase(),i.className=`val ${s.ttsStatus==="Actif"?"active":""}`})}}class y{constructor(t){this.container=document.getElementById(t),this.currentStatus="idle",this.particles=[],this.render(),this.init(),this.spawnParticles(40),this.startDataScroll()}_hudData(){const t=["SYS.CORE ▸ ONLINE",`NEURAL-LINK ▸ ${(Math.random()*.5+99).toFixed(2)}%`,`LATENCY ▸ ${(Math.random()*5+8).toFixed(0)}ms`,"ENCRYPT ▸ AES-256",`FREQ ▸ ${(Math.random()*.5+2.44).toFixed(2)} GHz`,"SEC-LAYER ▸ ACTIVE",`SIG ▸ ${(Math.random()*20+75).toFixed(0)}dB`];return t[Math.floor(Math.random()*t.length)]}render(){this.container.innerHTML=`
      <div class="orb-scene" id="orb-scene" data-status="idle">

        <!-- Grille hexagonale holographique (background SVG) -->
        <svg class="orb-hex-grid" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hex-pat" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <polygon points="30,2 58,17 58,47 30,62 2,47 2,17"
                fill="none" stroke="var(--primary)" stroke-width="0.4" opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hex-pat)" />
        </svg>

        <!-- Zone particules -->
        <div class="orb-particles" id="orb-particles"></div>

        <!-- Anneaux d'émanation (pulsent vers l'extérieur) -->
        <div class="emanation-ring e-ring-1"></div>
        <div class="emanation-ring e-ring-2"></div>
        <div class="emanation-ring e-ring-3"></div>

        <!-- SVG hologramme principal: anneaux + lignes de données -->
        <svg class="orb-holo-svg" viewBox="0 0 500 500">
          <defs>
            <filter id="glow-f" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <radialGradient id="core-grad" cx="40%" cy="35%" r="55%">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.95"/>
              <stop offset="25%" stop-color="var(--primary)" stop-opacity="0.75"/>
              <stop offset="65%" stop-color="var(--primary)" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="rim-grad" cx="70%" cy="70%" r="45%">
              <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Grille de scan horizontale (hologramme) -->
          <g class="scan-grid" opacity="0.18">
            ${Array.from({length:16}).map((t,e)=>`<line x1="90" y1="${120+e*18}" x2="410" y2="${120+e*18}"
               stroke="var(--primary)" stroke-width="0.5"
               stroke-dasharray="${Math.random()*20+5} ${Math.random()*10+3}"/>`).join("")}
          </g>

          <!-- Anneau externe: ticks -->
          <g class="holo-ring ring-outer" transform="translate(250,250)">
            <circle r="185" fill="none" stroke="var(--primary)" stroke-width="0.5" opacity="0.15"/>
            ${Array.from({length:60}).map((t,e)=>{const i=e%5===0;return`<line x1="0" y1="-185" x2="0" y2="${i?-176:-180}"
                stroke="var(--primary)" stroke-width="${i?1.5:.6}"
                opacity="${i?.7:.25}" transform="rotate(${e*6})"/>`}).join("")}
            <!-- Arc en surbrillance -->
            <path d="M 0 -185 A 185 185 0 0 1 160 -90" fill="none"
              stroke="var(--primary)" stroke-width="2" filter="url(#glow-f)" opacity="0.8"/>
            <path d="M 0 185 A 185 185 0 0 1 -160 90" fill="none"
              stroke="var(--primary)" stroke-width="2" filter="url(#glow-f)" opacity="0.8"/>
          </g>

          <!-- Anneau médian rotatif -->
          <g class="holo-ring ring-mid" transform="translate(250,250)">
            <ellipse rx="140" ry="42" fill="none" stroke="var(--primary)"
              stroke-width="1" stroke-dasharray="8 6" opacity="0.45"/>
            <!-- Particule sur l'anneau -->
            <circle r="5" cx="140" cy="0" fill="var(--primary)" filter="url(#glow-f)" opacity="0.9"
              class="orbit-dot"/>
          </g>

          <!-- Anneau intérieur incliné -->
          <g class="holo-ring ring-inner" transform="translate(250,250) rotate(30)">
            <ellipse rx="105" ry="32" fill="none" stroke="var(--accent)"
              stroke-width="0.8" stroke-dasharray="15 8" opacity="0.35"/>
            <circle r="4" cx="-105" cy="0" fill="var(--accent)" filter="url(#glow-f)" opacity="0.8"
              class="orbit-dot-reverse"/>
          </g>

          <!-- Sphère principale 3D -->
          <!-- ombre portée -->
          <ellipse cx="250" cy="340" rx="80" ry="14" fill="var(--primary)" opacity="0.08" filter="url(#glow-f)"/>
          <!-- corps volumétrique -->
          <circle cx="250" cy="250" r="88" fill="url(#core-grad)" class="orb-core-circle"/>
          <!-- rim light -->
          <circle cx="250" cy="250" r="88" fill="url(#rim-grad)"/>
          <!-- spéculaire -->
          <circle cx="222" cy="215" r="20" fill="white" opacity="0.45" filter="url(#glow-f)"/>
          <circle cx="213" cy="207" r="8" fill="white" opacity="0.75"/>
          <!-- bordure lumineuse -->
          <circle cx="250" cy="250" r="88" fill="none" stroke="var(--primary)"
            stroke-width="1.5" opacity="0.5" filter="url(#glow-f)"/>

          <!-- Lignes de données latérales -->
          <g class="hud-lines" opacity="0.7">
            <!-- Gauche -->
            <line x1="50" y1="200" x2="152" y2="240" stroke="var(--primary)" stroke-width="0.7"/>
            <line x1="30" y1="200" x2="50" y2="200" stroke="var(--primary)" stroke-width="1.5" filter="url(#glow-f)"/>
            <rect x="10" y="192" width="2" height="16" fill="var(--primary)" opacity="0.8"/>
            <!-- Droite -->
            <line x1="450" y1="290" x2="348" y2="260" stroke="var(--primary)" stroke-width="0.7"/>
            <line x1="450" y1="290" x2="470" y2="290" stroke="var(--primary)" stroke-width="1.5" filter="url(#glow-f)"/>
            <rect x="490" y="282" width="2" height="16" fill="var(--primary)" opacity="0.8"/>
            <!-- Bas -->
            <line x1="250" y1="358" x2="250" y2="390" stroke="var(--primary)" stroke-width="0.7"/>
            <line x1="230" y1="390" x2="270" y2="390" stroke="var(--primary)" stroke-width="1" opacity="0.5"/>
          </g>

          <!-- Labels HUD flottants -->
          <g font-family="'Space Mono', monospace" font-size="9px" fill="var(--primary)" opacity="0.7">
            <text x="12" y="177" letter-spacing="1.5">CORE.NEURAL</text>
            <text x="12" y="190" font-size="7px" opacity="0.6" id="hud-line-l">SYS.CORE ▸ ONLINE</text>
            <text x="330" y="303" letter-spacing="1.5" text-anchor="start">SYNC.FREQ</text>
            <text x="330" y="315" font-size="7px" opacity="0.6" id="hud-line-r">LATENCY ▸ 11ms</text>
            <text x="250" y="420" text-anchor="middle" letter-spacing="3px" font-size="8px" class="hud-blink">▸▸ LIAISON ÉTABLIE ◂◂</text>
          </g>
        </svg>

        <!-- Étiquette statut -->
        <div class="orb-label" id="orb-label">VEILLE</div>
      </div>
    `}spawnParticles(t){const e=document.getElementById("orb-particles");if(e)for(let i=0;i<t;i++){const s=document.createElement("div");s.className="orb-particle";const a=Math.random()*3+1,r=Math.random()*100,c=Math.random()*100,d=Math.random()*8+6,p=Math.random()*-12,h=(Math.random()-.5)*80;s.style.cssText=`
        width: ${a}px; height: ${a}px;
        left: ${r}%; top: ${c}%;
        animation-duration: ${d}s;
        animation-delay: ${p}s;
        --drift-x: ${h}px;
        --drift-y: ${-Math.random()*120-40}px;
        opacity: ${Math.random()*.5+.2};
      `,e.appendChild(s)}}startDataScroll(){setInterval(()=>{const t=document.getElementById("hud-line-l"),e=document.getElementById("hud-line-r");t&&(t.textContent=this._hudData()),e&&(e.textContent=this._hudData())},2e3)}init(){this.scene=document.getElementById("orb-scene"),this.label=document.getElementById("orb-label"),n.subscribe(t=>{t.orbStatus!==this.currentStatus&&(this.currentStatus=t.orbStatus,this.updateState(t.orbStatus))})}updateState(t){this.scene.setAttribute("data-status",t);const e={idle:"VEILLE",listening:"ANALYSE VOIX",thinking:"TRAITEMENT",speaking:"ALLOCUTION"};this.label.textContent=e[t]||t.toUpperCase()}}class b{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
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
    `}init(){}addLog(t,e="system"){const i=document.createElement("div");i.className=`log-line ${e}`;const s=new Date().toLocaleTimeString();i.innerHTML=`<span class="log-time">[${s}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(i),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class g{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(o.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,e){const i=this.box.lastElementChild;if(i&&i.textContent===t&&i.classList.contains(e))return;const s=document.createElement("div");s.className=`msg ${e}`,s.textContent=t,this.box.appendChild(s),this.box.scrollTop=this.box.scrollHeight,s.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class f{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),this.panes.forEach(e=>e.classList.toggle("active",e.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const e=await t.json();this.form.querySelectorAll("input, select").forEach(s=>{const a=s.name;let r=e[a]||e[`_raw_${a}`.replace("api_key","")]||"";a==="gemini_api_key"&&(r=e._raw_gemini||""),a==="tavily_api_key"&&(r=e._raw_tavily||""),a==="ha_token"&&(r=e._raw_ha_token||""),s.type==="checkbox"?s.checked=r==="true":s.value=r}),await this.loadVoices(e.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const e=await fetch("/api/voices");if(e.ok){const i=await e.json();this.voiceSelect.innerHTML="",i.voices.forEach(s=>{const a=document.createElement("option");a.value=s,a.textContent=s.toUpperCase(),s===t&&(a.selected=!0),this.voiceSelect.appendChild(a)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const e=await t.json();if(this.memoryList.innerHTML="",e.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}e.forEach(i=>{const s=document.createElement("div");s.className="memory-item",s.innerHTML=`
          <div class="m-key">${i.key}</div>
          <div class="m-val">${i.value}</div>
          <button class="m-del" data-key="${i.key}">✕</button>
        `,s.querySelector(".m-del").onclick=()=>this.deleteMemory(i.key),this.memoryList.appendChild(s)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(i=>{t[i.name]=i.type==="checkbox"?i.checked?"true":"false":i.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class E{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){n.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:e,results:i}=t,s=i.map(a=>`
        <div class="web-result-card glass">
          <div class="web-result-id">${a.id}</div>
          <div class="web-result-content">
            <h3 class="web-result-title">${this.escapeHtml(a.title)}</h3>
            <p class="web-result-snippet">${this.escapeHtml(a.snippet)}</p>
            <div class="web-result-url">${this.escapeHtml(a.url)}</div>
          </div>
          ${a.image?`<div class="web-result-image" style="background-image: url('${a.image}')"></div>`:'<div class="web-result-image-placeholder">N/A</div>'}
        </div>
      `).join("");this.container.innerHTML=`
      <div class="web-search-modal glass-modal">
        <div class="web-search-content glass">
          <div class="web-search-header">
            <div class="status-dot"></div>
            <h2>RECHERCHE WEB <span class="query-text">"${this.escapeHtml(e)}"</span></h2>
          </div>
          <div class="web-search-body hide-scroll">
            <div class="web-results-grid">
              ${s}
            </div>
          </div>
          <div class="web-search-footer">
            <span class="pulsing-text">EN ATTENTE DE SÉLECTION VOCALE...</span>
          </div>
        </div>
      </div>
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class S{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new v("status-mount"),this.orb=new y("orb-mount"),this.terminal=new b("terminal-mount"),this.chat=new g("chat-mount"),this.settings=new f("settings-mount"),this.websearch=new E("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),o.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new S;
