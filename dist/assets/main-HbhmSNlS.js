(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();class r{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new r;class d{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",s=window.location.host,i=`${t}//${s}/ws`;console.log(`[WS] Tentative de connexion à ${i}...`),this.ws=new WebSocket(i),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=e=>{try{const a=JSON.parse(e.data);this.handleMessage(a)}catch(a){console.error("[WS] Erreur parsing message:",a)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=e=>{console.error("[WS] Erreur:",e)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const s=t.event,i=t.data||{};if(s)switch(s){case"audio.speech_recognized":n.setState({lastUserMessage:i.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:i.status?"Analyse...":"En veille",orbStatus:i.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:i.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;default:console.debug(`[WS Event] ${s}`,i)}}send(t,s={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:s}))}addInternalLog(t,s){console.log(`[SYSTEM] ${t}`)}}const c=new d;class p{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
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
    `}init(){const t=this.container.querySelector("#stat-conn .val"),s=this.container.querySelector("#stat-brain .val"),i=this.container.querySelector("#stat-tts .val");n.subscribe(e=>{t.textContent=e.connection.toUpperCase(),t.className=`val ${e.connection}`,s.textContent=e.brainStatus.toUpperCase(),s.className=`val ${e.orbStatus}`,i.textContent=e.ttsStatus.toUpperCase(),i.className=`val ${e.ttsStatus==="Actif"?"active":""}`})}}class h{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
      <div class="orb-visualizer">
        <svg viewBox="0 0 200 200" class="orb-svg">
          <!-- Rings -->
          <circle cx="100" cy="100" r="80" class="ring ring-outer" />
          <circle cx="100" cy="100" r="60" class="ring ring-inner" />
          <circle cx="100" cy="100" r="40" class="ring ring-core-border" />
          
          <!-- Primary Glow -->
          <defs>
            <radialGradient id="grad-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:white;stop-opacity:1" />
              <stop offset="100%" style="stop-color:var(--primary);stop-opacity:0.2" />
            </radialGradient>
          </defs>
          
          <circle cx="100" cy="100" r="30" class="orb-core" fill="url(#grad-core)" />
        </svg>
        <div class="orb-label" id="orb-label">LOAD</div>
      </div>
    `}init(){this.label=document.getElementById("orb-label"),this.svg=this.container.querySelector(".orb-svg"),n.subscribe(t=>{this.updateState(t.orbStatus)})}updateState(t){this.svg.setAttribute("data-status",t);const s={idle:"PRÊT / VEILLE",listening:"ANALYSE AUDIO",thinking:"RÉFLÉCHIT...",speaking:"COMMUNICATION"};this.label.textContent=s[t]||t.toUpperCase()}}class v{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
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
    `}init(){}addLog(t,s="system"){const i=document.createElement("div");i.className=`log-line ${s}`;const e=new Date().toLocaleTimeString();i.innerHTML=`<span class="log-time">[${e}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(i),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class u{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(c.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,s){const i=this.box.lastElementChild;if(i&&i.textContent===t&&i.classList.contains(s))return;const e=document.createElement("div");e.className=`msg ${s}`,e.textContent=t,this.box.appendChild(e),this.box.scrollTop=this.box.scrollHeight,e.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class m{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
    `}async init(){this.saveBtn=this.container.querySelector("#save-btn"),this.closeBtn=this.container.querySelector(".close-btn"),this.tabBtns=this.container.querySelectorAll(".tab-btn"),this.panes=this.container.querySelectorAll(".tab-pane"),this.voiceSelect=this.container.querySelector("#tts-voice"),this.memoryList=this.container.querySelector("#memory-list"),this.closeBtn.addEventListener("click",()=>this.modal.close()),this.saveBtn.addEventListener("click",()=>this.saveSettings()),this.tabBtns.forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))})}switchTab(t){this.tabBtns.forEach(s=>s.classList.toggle("active",s.dataset.tab===t)),this.panes.forEach(s=>s.classList.toggle("active",s.id===`pane-${t}`)),t==="memory"&&this.loadMemory()}async loadSettings(){try{const t=await fetch("/api/settings");if(!t.ok)return;const s=await t.json();this.form.querySelectorAll("input, select").forEach(e=>{const a=e.name;let l=s[a]||s[`_raw_${a}`.replace("api_key","")]||"";a==="gemini_api_key"&&(l=s._raw_gemini||""),a==="tavily_api_key"&&(l=s._raw_tavily||""),a==="ha_token"&&(l=s._raw_ha_token||""),e.type==="checkbox"?e.checked=l==="true":e.value=l}),await this.loadVoices(s.kokoro_voice)}catch(t){console.error(t)}}async loadVoices(t){try{const s=await fetch("/api/voices");if(s.ok){const i=await s.json();this.voiceSelect.innerHTML="",i.voices.forEach(e=>{const a=document.createElement("option");a.value=e,a.textContent=e.toUpperCase(),e===t&&(a.selected=!0),this.voiceSelect.appendChild(a)})}}catch{}}async loadMemory(){this.memoryList.innerHTML='<div class="loader">SYNCHRONISATION...</div>';try{const t=await fetch("/api/memory");if(!t.ok)return;const s=await t.json();if(this.memoryList.innerHTML="",s.length===0){this.memoryList.innerHTML='<p class="empty">AUCUNE DONNÉE MÉMORISÉE</p>';return}s.forEach(i=>{const e=document.createElement("div");e.className="memory-item",e.innerHTML=`
          <div class="m-key">${i.key}</div>
          <div class="m-val">${i.value}</div>
          <button class="m-del" data-key="${i.key}">✕</button>
        `,e.querySelector(".m-del").onclick=()=>this.deleteMemory(i.key),this.memoryList.appendChild(e)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(i=>{t[i.name]=i.type==="checkbox"?i.checked?"true":"false":i.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class b{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new p("status-mount"),this.orb=new h("orb-mount"),this.terminal=new v("terminal-mount"),this.chat=new u("chat-mount"),this.settings=new m("settings-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),c.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new b;
