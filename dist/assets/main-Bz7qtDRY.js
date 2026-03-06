(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class c{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new c;class d{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",e=window.location.host,a=`${t}//${e}/ws`;console.log(`[WS] Tentative de connexion à ${a}...`),this.ws=new WebSocket(a),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=s=>{try{const i=JSON.parse(s.data);this.handleMessage(i)}catch(i){console.error("[WS] Erreur parsing message:",i)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=s=>{console.error("[WS] Erreur:",s)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const e=t.event,a=t.data||{};if(e)switch(e){case"audio.speech_recognized":n.setState({lastUserMessage:a.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:a.status?"Analyse...":"En veille",orbStatus:a.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:a.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":n.setState({webSearchResults:a});break;case"ui.hide_web_results":n.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${e}`,a)}}send(t,e={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:e}))}addInternalLog(t,e){console.log(`[SYSTEM] ${t}`)}}const r=new d;class p{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
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
    `}init(){const t=this.container.querySelector("#stat-conn .val"),e=this.container.querySelector("#stat-brain .val"),a=this.container.querySelector("#stat-tts .val");n.subscribe(s=>{t.textContent=s.connection.toUpperCase(),t.className=`val ${s.connection}`,e.textContent=s.brainStatus.toUpperCase(),e.className=`val ${s.orbStatus}`,a.textContent=s.ttsStatus.toUpperCase(),a.className=`val ${s.ttsStatus==="Actif"?"active":""}`})}}class h{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
      <div class="orb-visualizer">
        <div class="hud-box">
           <svg viewBox="0 0 500 500" class="orb-svg">
             <defs>
               <filter id="bloom-strong" x="-30%" y="-30%" width="160%" height="160%">
                 <feGaussianBlur stdDeviation="6" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
               <filter id="bloom-light" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="3" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
               <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
                 <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
                 <stop offset="20%" stop-color="var(--primary)" stop-opacity="0.6" />
                 <stop offset="60%" stop-color="var(--primary)" stop-opacity="0.1" />
                 <stop offset="100%" stop-color="transparent" stop-opacity="0" />
               </radialGradient>
               <!-- Scanner gradient -->
               <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="transparent" />
                  <stop offset="50%" stop-color="var(--primary)" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="transparent" />
               </linearGradient>
             </defs>

             <!-- Background HUD target -->
             <g class="target-crosshair" stroke="var(--primary)" stroke-width="0.5" opacity="0.08">
               <line x1="250" y1="20" x2="250" y2="480" stroke-dasharray="2 6" />
               <line x1="20" y1="250" x2="480" y2="250" stroke-dasharray="2 6" />
               <circle cx="250" cy="250" r="220" fill="none" />
               <circle cx="250" cy="250" r="150" fill="none" opacity="0.5"/>
               <!-- Target marks -->
               <path d="M 230 30 L 270 30" />
               <path d="M 230 470 L 270 470" />
               <path d="M 30 230 L 30 270" />
               <path d="M 470 230 L 470 270" />
             </g>

             <!-- Outer Complex Ring -->
             <g class="tech-ring outer-slow" transform="translate(250, 250)">
               <circle r="190" fill="none" stroke="var(--primary)" stroke-width="0.5" opacity="0.15"/>
               <!-- Main thick arcs -->
               <path d="M 0 -190 A 190 190 0 0 1 134 -134" fill="none" stroke="var(--primary)" stroke-width="1.5" filter="url(#bloom-light)"/>
               <path d="M 0 190 A 190 190 0 0 1 -134 134" fill="none" stroke="var(--primary)" stroke-width="1.5" filter="url(#bloom-light)"/>
               <!-- Ticks generator via JS below -->
               <g id="outer-ticks" opacity="0.4">
                 ${Array.from({length:72}).map((t,e)=>`<line x1="0" y1="-185" x2="0" y2="-192" stroke="var(--primary)" stroke-width="${e%6===0?1.5:.5}" transform="rotate(${e*5})" opacity="${e%6===0?.7:.3}"/>`).join("")}
               </g>
             </g>

             <!-- Middle Data Arcs -->
             <g class="tech-ring middle-fast" transform="translate(250, 250)">
               <circle r="160" fill="none" stroke="var(--primary)" stroke-width="6" stroke-dasharray="2 10 30 15 50 20" opacity="0.25"/>
               <circle r="145" fill="none" stroke="var(--primary)" stroke-width="1" stroke-dasharray="10 5" opacity="0.3"/>
               <circle r="152" fill="none" stroke="var(--primary)" stroke-width="0.5" stroke-dasharray="50 150" filter="url(#bloom-strong)"/>
             </g>

             <!-- Inner Polygon & Mechanisms -->
             <g class="tech-ring inner-reverse" transform="translate(250, 250)">
               <!-- Double Hexagon -->
               <polygon points="0,-115 100,-57.5 100,57.5 0,115 -100,57.5 -100,-57.5" fill="none" stroke="var(--primary)" stroke-width="0.5" opacity="0.4"/>
               <polygon points="0,-115 100,-57.5 100,57.5 0,115 -100,57.5 -100,-57.5" fill="none" stroke="var(--primary)" stroke-width="1" transform="rotate(30)" opacity="0.15"/>
               
               <circle r="100" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="40 80 20 60" filter="url(#bloom-light)"/>
               <circle r="90" fill="none" stroke="url(#scan-grad)" stroke-width="10" opacity="0.2"/>
             </g>

             <!-- Core Shielding -->
             <g class="core-shield" transform="translate(250, 250)">
               <circle r="60" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.5"/>
               <circle r="52" fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="2 12" opacity="0.5"/>
               <path d="M 0 -60 L 0 -50 M 0 60 L 0 50 M -60 0 L -50 0 M 60 0 L 50 0" stroke="var(--primary)" stroke-width="1" filter="url(#bloom-light)"/>
             </g>

             <!-- The Plasma Core -->
             <circle cx="250" cy="250" r="45" class="orb-core" fill="url(#plasma-core)" filter="url(#bloom-strong)" />
             
             <!-- Floating HUD Elements -->
             <g class="floating-data" transform="translate(250, 250)" fill="var(--primary)" font-family="var(--font-tech)" font-size="8px" opacity="0.6">
                <text x="140" y="-140" font-weight="500" letter-spacing="2px">SEC: 98%</text>
                <text x="-190" y="160" letter-spacing="1px">SYS.OPT.01</text>
                <text x="30" y="210" font-size="6px" opacity="0.5">LAT/LONG OK</text>
             </g>
           </svg>
           <div class="orb-label" id="orb-label">STANDBY</div>
        </div>
      </div>
    `}init(){this.label=document.getElementById("orb-label"),this.svg=this.container.querySelector(".orb-svg"),n.subscribe(t=>{this.updateState(t.orbStatus)})}updateState(t){this.svg.setAttribute("data-status",t);const e={idle:"PRÊT / VEILLE",listening:"ANALYSE AUDIO",thinking:"RÉFLÉCHIT...",speaking:"COMMUNICATION"};this.label.textContent=e[t]||t.toUpperCase()}}class v{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
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
    `}init(){}addLog(t,e="system"){const a=document.createElement("div");a.className=`log-line ${e}`;const s=new Date().toLocaleTimeString();a.innerHTML=`<span class="log-time">[${s}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(a),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class u{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(r.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,e){const a=this.box.lastElementChild;if(a&&a.textContent===t&&a.classList.contains(e))return;const s=document.createElement("div");s.className=`msg ${e}`,s.textContent=t,this.box.appendChild(s),this.box.scrollTop=this.box.scrollHeight,s.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class m{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),this.panes.forEach(e=>e.classList.toggle("active",e.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const e=await t.json();this.form.querySelectorAll("input, select").forEach(s=>{const i=s.name;let l=e[i]||e[`_raw_${i}`.replace("api_key","")]||"";i==="gemini_api_key"&&(l=e._raw_gemini||""),i==="tavily_api_key"&&(l=e._raw_tavily||""),i==="ha_token"&&(l=e._raw_ha_token||""),s.type==="checkbox"?s.checked=l==="true":s.value=l}),await this.loadVoices(e.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const e=await fetch("/api/voices");if(e.ok){const a=await e.json();this.voiceSelect.innerHTML="",a.voices.forEach(s=>{const i=document.createElement("option");i.value=s,i.textContent=s.toUpperCase(),s===t&&(i.selected=!0),this.voiceSelect.appendChild(i)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const e=await t.json();if(this.memoryList.innerHTML="",e.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}e.forEach(a=>{const s=document.createElement("div");s.className="memory-item",s.innerHTML=`
          <div class="m-key">${a.key}</div>
          <div class="m-val">${a.value}</div>
          <button class="m-del" data-key="${a.key}">✕</button>
        `,s.querySelector(".m-del").onclick=()=>this.deleteMemory(a.key),this.memoryList.appendChild(s)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(a=>{t[a.name]=a.type==="checkbox"?a.checked?"true":"false":a.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class b{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){n.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:e,results:a}=t,s=a.map(i=>`
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
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class g{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new p("status-mount"),this.orb=new h("orb-mount"),this.terminal=new v("terminal-mount"),this.chat=new u("chat-mount"),this.settings=new m("settings-mount"),this.websearch=new b("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),r.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new g;
