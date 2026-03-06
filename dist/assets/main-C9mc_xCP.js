(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();class g{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new g;class y{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",s=window.location.host,i=`${t}//${s}/ws`;console.log(`[WS] Tentative de connexion à ${i}...`),this.ws=new WebSocket(i),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=e=>{try{const a=JSON.parse(e.data);this.handleMessage(a)}catch(a){console.error("[WS] Erreur parsing message:",a)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=e=>{console.error("[WS] Erreur:",e)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const s=t.event,i=t.data||{};if(s)switch(s){case"audio.speech_recognized":n.setState({lastUserMessage:i.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:i.status?"Analyse...":"En veille",orbStatus:i.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:i.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":n.setState({webSearchResults:i});break;case"ui.hide_web_results":n.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${s}`,i)}}send(t,s={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:s}))}addInternalLog(t,s){console.log(`[SYSTEM] ${t}`)}}const u=new y;class E{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
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
    `}init(){const t=this.container.querySelector("#stat-conn .val"),s=this.container.querySelector("#stat-brain .val"),i=this.container.querySelector("#stat-tts .val");n.subscribe(e=>{t.textContent=e.connection.toUpperCase(),t.className=`val ${e.connection}`,s.textContent=e.brainStatus.toUpperCase(),s.className=`val ${e.orbStatus}`,i.textContent=e.ttsStatus.toUpperCase(),i.className=`val ${e.ttsStatus==="Actif"?"active":""}`})}}class S{constructor(t){this.container=document.getElementById(t),this.currentStatus="idle",this.render(),this.init(),this.spawnParticles(22),this.startDataScroll()}_hudData(){const t=["NEURAL CORE ▸ NOMINAL",`SYNC ▸ ${(Math.random()*.4+99.5).toFixed(2)}%`,`LATENCY ▸ ${(Math.random()*3+8).toFixed(0)}ms`,"PHASE ▸ LOCKED",`FREQ ▸ ${(Math.random()*.3+2.49).toFixed(2)} GHz`,"SHIELD ▸ ACTIVE",`UPTIME ▸ ${Math.floor(Math.random()*24+1)}h ${String(Math.floor(Math.random()*60)).padStart(2,"0")}m`];return t[Math.floor(Math.random()*t.length)]}_ticks(t,s,i,e,a,o=250,d=250){return Array.from({length:s},(C,p)=>{const r=p*360/s*Math.PI/180,c=p%i===0,h=c?e:a,f=o+t*Math.sin(r),m=d-t*Math.cos(r),v=o+(t-h)*Math.sin(r),b=d-(t-h)*Math.cos(r);return`<line x1="${f.toFixed(1)}" y1="${m.toFixed(1)}"
        x2="${v.toFixed(1)}" y2="${b.toFixed(1)}"
        stroke="var(--orb-cyan)" stroke-width="${c?1.3:.6}"
        opacity="${c?.55:.22}"/>`}).join("")}render(){this.container.innerHTML=`
      <div class="orb-scene" id="orb-scene" data-status="idle">

        <!-- Fond grille hexagonale (discret) -->
        <svg class="orb-hex-grid" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="hex-p" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,15 54,39 28,52 2,39 2,15"
                fill="none" stroke="var(--orb-cyan)" stroke-width="0.3" opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hex-p)"/>
        </svg>

        <!-- Particules ambiantes -->
        <div class="orb-particles" id="orb-particles"></div>

        <!-- SVG hologramme -->
        <svg class="orb-svg" viewBox="0 0 500 500" overflow="visible" aria-label="JARVIS Holographic Core">
          <defs>
            <!-- Glow léger -->
            <filter id="gs" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <!-- Glow moyen (noyau interne) -->
            <filter id="gm" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <!-- Glow fort (halo) -->
            <filter id="gl" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="14" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            <!-- COQUE principale: lumière haut-gauche vers profondeur bas-droite -->
            <radialGradient id="grad-shell" cx="34%" cy="28%" r="68%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.90"/>
              <stop offset="9%"   stop-color="#D0F8FF" stop-opacity="0.85"/>
              <stop offset="24%"  stop-color="#00D9FF" stop-opacity="0.65"/>
              <stop offset="52%"  stop-color="#0090B8" stop-opacity="0.30"/>
              <stop offset="80%"  stop-color="#002840" stop-opacity="0.10"/>
              <stop offset="100%" stop-color="#001018" stop-opacity="0.00"/>
            </radialGradient>

            <!-- NOYAU compact brillant -->
            <radialGradient id="grad-nucleus" cx="43%" cy="37%" r="62%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="1.00"/>
              <stop offset="15%"  stop-color="#E0FEFF" stop-opacity="0.95"/>
              <stop offset="38%"  stop-color="#00D9FF" stop-opacity="0.60"/>
              <stop offset="72%"  stop-color="#006080" stop-opacity="0.20"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- HALO ambiant derrière -->
            <radialGradient id="grad-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stop-color="#00D9FF" stop-opacity="0.18"/>
              <stop offset="40%"  stop-color="#00D9FF" stop-opacity="0.06"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- RIM LIGHT: tranche bas-droite (froid, pas chaud) -->
            <radialGradient id="grad-rim" cx="72%" cy="75%" r="46%">
              <stop offset="0%"   stop-color="#60EEFF" stop-opacity="0.20"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- SHEEN diagonal (brillance traversante) -->
            <linearGradient id="grad-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.28"/>
              <stop offset="25%"  stop-color="#ffffff" stop-opacity="0.10"/>
              <stop offset="55%"  stop-color="transparent" stop-opacity="0"/>
            </linearGradient>

            <!-- Clip sphère -->
            <clipPath id="clip-sphere">
              <circle cx="250" cy="250" r="126"/>
            </clipPath>
          </defs>

          <!-- ══ HALO AMBIANT ══ -->
          <circle cx="250" cy="250" r="188" fill="url(#grad-halo)" class="orb-halo"/>

          <!-- ══ COQUE SPHÈRE ══ -->
          <circle cx="250" cy="250" r="126" fill="url(#grad-shell)" class="orb-shell"/>
          <!-- Rim light -->
          <circle cx="250" cy="250" r="126" fill="url(#grad-rim)"/>

          <!-- ══ CONTENU INTERNE (clippé) ══ -->
          <g clip-path="url(#clip-sphere)">
            <!-- Scanlines horizontales très subtiles -->
            <g class="orb-scanlines" opacity="0.055">
              ${Array.from({length:22},(t,s)=>`<line x1="124" y1="${128+s*11}" x2="376" y2="${128+s*11}"
                  stroke="#00D9FF" stroke-width="0.6"/>`).join("")}
            </g>

            <!-- Bande de scan holographique (se déplace) -->
            <rect x="124" y="178" width="252" height="20"
              fill="url(#grad-sheen)" class="orb-scan-band"
              opacity="0.40" filter="url(#gs)"/>

            <!-- Couronne interne (anneau moyen rotatif lent) -->
            <g class="orb-ring-mid">
              <!-- Anneau en tirets -->
              <circle cx="250" cy="250" r="90" fill="none" stroke="#00D9FF"
                stroke-width="0.8" stroke-dasharray="14 5" opacity="0.28"/>
              <!-- Ticks secondaires -->
              ${this._ticks(90,24,6,5,3)}
              <!-- Arc signature (court, brillant) -->
              <path d="M 161 229 A 90 90 0 0 1 218 168"
                fill="none" stroke="#00D9FF" stroke-width="1.8"
                stroke-linecap="round" opacity="0.50" filter="url(#gs)"/>
              <path d="M 339 271 A 90 90 0 0 1 282 332"
                fill="none" stroke="#00D9FF" stroke-width="1.8"
                stroke-linecap="round" opacity="0.50" filter="url(#gs)"/>
            </g>

            <!-- Anneau interne fin (rotation inverse) -->
            <g class="orb-ring-inner">
              <circle cx="250" cy="250" r="64" fill="none" stroke="#80EEFF"
                stroke-width="0.6" stroke-dasharray="5 8" opacity="0.22"/>
              <circle cx="250" cy="250" r="52" fill="none" stroke="#00D9FF"
                stroke-width="0.5" stroke-dasharray="2 10" opacity="0.16"/>
            </g>

            <!-- Sheen traversant -->
            <path d="M 162 144 C 212 108, 308 118, 346 176 C 310 162, 262 165, 218 188 C 198 198, 180 184, 162 144 Z"
              fill="url(#grad-sheen)" opacity="0.45" class="orb-sheen"/>
          </g>

          <!-- ══ NOYAU COMPACT ══ -->
          <circle cx="250" cy="250" r="54" fill="url(#grad-nucleus)"
            class="orb-nucleus" filter="url(#gm)"/>
          <!-- Point central intense -->
          <circle cx="250" cy="250" r="14" fill="#ffffff" opacity="0.80"
            class="orb-nucleus-core" filter="url(#gs)"/>

          <!-- ══ REFLETS SPÉCULAIRES ══ -->
          <!-- Grand reflet diffus -->
          <circle cx="216" cy="203" r="34" fill="white" opacity="0.16"
            filter="url(#gs)" class="orb-spec-soft"/>
          <!-- Point brillant net -->
          <circle cx="205" cy="191" r="9.5" fill="white" opacity="0.90"
            filter="url(#gs)"/>
          <!-- Petit reflet secondaire (asymétrie premium) -->
          <circle cx="276" cy="190" r="3.5" fill="white" opacity="0.38"/>

          <!-- ══ BORDURE EXTERNE ══ -->
          <circle cx="250" cy="250" r="126" fill="none" stroke="#00D9FF"
            stroke-width="1.5" opacity="0.45" filter="url(#gs)" class="orb-border"/>
          <!-- Ligne interne fine -->
          <circle cx="250" cy="250" r="110" fill="none" stroke="#00D9FF"
            stroke-width="0.4" opacity="0.12"/>

          <!-- ══ ARCS + TICKS EXTÉRIEURS (signature structurelle) ══ -->
          <g class="orb-outer-ring">
            <!-- Ticks extérieurs -->
            ${this._ticks(134,36,9,11,5)}
            <!-- Arcs architecturaux haut et bas (NON complets = signature) -->
            <path d="M 170 143 A 133 133 0 0 1 330 143"
              fill="none" stroke="#00D9FF" stroke-width="2"
              stroke-linecap="round" opacity="0.42" filter="url(#gs)"/>
            <path d="M 170 357 A 133 133 0 0 0 330 357"
              fill="none" stroke="#00D9FF" stroke-width="2"
              stroke-linecap="round" opacity="0.42" filter="url(#gs)"/>
          </g>

          <!-- ══ HUD TEXT (minimal) ══ -->
          <g font-family="'Space Mono', monospace" fill="#00D9FF">
            <text x="250" y="420" text-anchor="middle" font-size="7.5"
              letter-spacing="3.5" opacity="0.55" class="hud-blink">
              J.A.R.V.I.S · CORE ONLINE
            </text>
            <text x="250" y="432" text-anchor="middle" font-size="6.5"
              id="hud-status" opacity="0.38">
              NEURAL CORE ▸ NOMINAL
            </text>
          </g>
        </svg>

        <!-- Étiquette statut -->
        <div class="orb-label" id="orb-label">VEILLE</div>
      </div>
    `}spawnParticles(t){const s=document.getElementById("orb-particles");if(s)for(let i=0;i<t;i++){const e=document.createElement("div");e.className="orb-particle";const a=Math.random()*2.2+.8;e.style.cssText=`
        width:${a}px; height:${a}px;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        animation-duration:${Math.random()*9+7}s;
        animation-delay:${Math.random()*-15}s;
        --drift-x:${(Math.random()-.5)*48}px;
        --drift-y:${-Math.random()*80-20}px;
        --p-opacity:${Math.random()*.25+.08};
      `,s.appendChild(e)}}startDataScroll(){setInterval(()=>{const t=document.getElementById("hud-status");t&&(t.textContent=this._hudData())},2500)}init(){this.scene=document.getElementById("orb-scene"),this.label=document.getElementById("orb-label"),n.subscribe(t=>{t.orbStatus!==this.currentStatus&&(this.currentStatus=t.orbStatus,this.updateState(t.orbStatus))})}updateState(t){this.scene.setAttribute("data-status",t);const s={idle:"VEILLE",listening:"ANALYSE VOIX",thinking:"TRAITEMENT",speaking:"ALLOCUTION"};this.label.textContent=s[t]||t.toUpperCase()}}class A{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
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
    `}init(){}addLog(t,s="system"){const i=document.createElement("div");i.className=`log-line ${s}`;const e=new Date().toLocaleTimeString();i.innerHTML=`<span class="log-time">[${e}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(i),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class M{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(u.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,s){const i=this.box.lastElementChild;if(i&&i.textContent===t&&i.classList.contains(s))return;const e=document.createElement("div");e.className=`msg ${s}`,e.textContent=t,this.box.appendChild(e),this.box.scrollTop=this.box.scrollHeight,e.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class I{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(s=>s.classList.toggle("active",s.dataset.tab===t)),this.panes.forEach(s=>s.classList.toggle("active",s.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const s=await t.json();this.form.querySelectorAll("input, select").forEach(e=>{const a=e.name;let o=s[a]||s[`_raw_${a}`.replace("api_key","")]||"";a==="gemini_api_key"&&(o=s._raw_gemini||""),a==="tavily_api_key"&&(o=s._raw_tavily||""),a==="ha_token"&&(o=s._raw_ha_token||""),e.type==="checkbox"?e.checked=o==="true":e.value=o}),await this.loadVoices(s.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const s=await fetch("/api/voices");if(s.ok){const i=await s.json();this.voiceSelect.innerHTML="",i.voices.forEach(e=>{const a=document.createElement("option");a.value=e,a.textContent=e.toUpperCase(),e===t&&(a.selected=!0),this.voiceSelect.appendChild(a)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const s=await t.json();if(this.memoryList.innerHTML="",s.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}s.forEach(i=>{const e=document.createElement("div");e.className="memory-item",e.innerHTML=`
          <div class="m-key">${i.key}</div>
          <div class="m-val">${i.value}</div>
          <button class="m-del" data-key="${i.key}">✕</button>
        `,e.querySelector(".m-del").onclick=()=>this.deleteMemory(i.key),this.memoryList.appendChild(e)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(i=>{t[i.name]=i.type==="checkbox"?i.checked?"true":"false":i.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class N{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){n.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:s,results:i}=t,e=i.map(a=>`
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
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class w{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new E("status-mount"),this.orb=new S("orb-mount"),this.terminal=new A("terminal-mount"),this.chat=new M("chat-mount"),this.settings=new I("settings-mount"),this.websearch=new N("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),u.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new w;
