(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();class w{constructor(){this.state={connection:"offline",orbStatus:"idle",brainStatus:"En veille",ttsStatus:"Inactif",lastUserMessage:"",lastJarvisMessage:"",activeTab:"general",webSearchResults:null,printData:{bambu:null,moonraker:null}},this.listeners=new Set}setState(t){this.state={...this.state,...t},this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t(this.state))}}const n=new w;class A{constructor(){this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=10}connect(){const t=window.location.protocol==="https:"?"wss:":"ws:",s=window.location.host,a=`${t}//${s}/ws`;console.log(`[WS] Tentative de connexion à ${a}...`),this.ws=new WebSocket(a),this.ws.onopen=()=>{console.log("[WS] Connecté."),this.reconnectAttempts=0,n.setState({connection:"online"})},this.ws.onmessage=e=>{try{const i=JSON.parse(e.data);this.handleMessage(i)}catch(i){console.error("[WS] Erreur parsing message:",i)}},this.ws.onclose=()=>{n.setState({connection:"offline"}),this.reconnect()},this.ws.onerror=e=>{console.error("[WS] Erreur:",e)}}reconnect(){if(this.reconnectAttempts<this.maxReconnectAttempts){this.reconnectAttempts++;const t=Math.min(1e3*Math.pow(2,this.reconnectAttempts),1e4);console.log(`[WS] Reconnexion dans ${t/1e3}s... (Tentative ${this.reconnectAttempts})`),setTimeout(()=>this.connect(),t)}}handleMessage(t){if(t.type==="system"){this.addInternalLog(t.message,"info");return}const s=t.event,a=t.data||{};if(s)switch(s){case"audio.speech_recognized":n.setState({lastUserMessage:a.text,orbStatus:"thinking"});break;case"brain.thinking":n.setState({brainStatus:a.status?"Analyse...":"En veille",orbStatus:a.status?"thinking":"idle"});break;case"brain.response_generated":n.setState({lastJarvisMessage:a.text});break;case"audio.tts_started":n.setState({ttsStatus:"Actif",orbStatus:"speaking"});break;case"audio.tts_stopped":n.setState({ttsStatus:"Inactif",orbStatus:"idle"});break;case"ui.show_web_results":n.setState({webSearchResults:a});break;case"ui.hide_web_results":n.setState({webSearchResults:null});break;default:console.debug(`[WS Event] ${s}`,a)}}send(t,s={}){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:t,data:s}))}addInternalLog(t,s){console.log(`[SYSTEM] ${t}`)}}const b=new A;class I{constructor(t){this.container=document.getElementById(t),this.render(),this.init()}render(){this.container.innerHTML=`
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
    `}init(){const t=this.container.querySelector("#stat-conn .val"),s=this.container.querySelector("#stat-brain .val"),a=this.container.querySelector("#stat-tts .val");n.subscribe(e=>{t.textContent=e.connection.toUpperCase(),t.className=`val ${e.connection}`,s.textContent=e.brainStatus.toUpperCase(),s.className=`val ${e.orbStatus}`,a.textContent=e.ttsStatus.toUpperCase(),a.className=`val ${e.ttsStatus==="Actif"?"active":""}`})}}class k{constructor(t){this.container=document.getElementById(t),this.currentStatus="idle",this.dataInterval=null,this.render(),this.init(),this.spawnParticles(26),this.startDataScroll()}_hudData(){const t=["CORE MATRIX ▸ NOMINAL",`SYNC ▸ ${(Math.random()*.35+99.61).toFixed(2)}%`,`LATENCY ▸ ${(Math.random()*3+7).toFixed(0)}ms`,"PHASE GRID ▸ LOCKED",`FREQ ▸ ${(Math.random()*.25+2.51).toFixed(2)} GHz`,"NEURAL FABRIC ▸ ACTIVE",`UPLINK ▸ ${(Math.random()*9+91).toFixed(0)}%`,`LOAD ▸ ${(Math.random()*18+24).toFixed(0)}%`,`TEMP ▸ ${(Math.random()*4+36).toFixed(1)}°C`];return t[Math.floor(Math.random()*t.length)]}_ticks({cx:t=250,cy:s=250,r:a=120,count:e=24,majorEvery:i=6,majorLen:o=10,minorLen:c=5,majorWidth:d=1.3,minorWidth:p=.6,majorOpacity:h=.55,minorOpacity:y=.18,color:m="var(--orb-cyan)"}){return Array.from({length:e},(O,u)=>{const l=u*360/e*Math.PI/180,f=u%i===0,v=f?o:c,g=t+a*Math.sin(l),E=s-a*Math.cos(l),S=t+(a-v)*Math.sin(l),M=s-(a-v)*Math.cos(l);return`
        <line
          x1="${g.toFixed(1)}"
          y1="${E.toFixed(1)}"
          x2="${S.toFixed(1)}"
          y2="${M.toFixed(1)}"
          stroke="${m}"
          stroke-width="${f?d:p}"
          opacity="${f?h:y}"
        />
      `}).join("")}render(){this.container.innerHTML=`
      <div class="orb-scene" id="orb-scene" data-status="idle">

        <!-- Fond discret -->
        <svg class="orb-hex-grid" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="hex-pat-v4" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon
                points="28,2 54,15 54,39 28,52 2,39 2,15"
                fill="none"
                stroke="var(--orb-cyan)"
                stroke-width="0.32"
                opacity="0.10"
              />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hex-pat-v4)"></rect>
        </svg>

        <!-- Particules d'ambiance -->
        <div class="orb-particles" id="orb-particles"></div>

        <!-- Noyau central -->
        <svg class="orb-svg orb-svg--matrix" viewBox="0 0 500 500" aria-label="JARVIS Core Matrix">
          <defs>
            <!-- Glows -->
            <filter id="orb-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>

            <filter id="orb-glow-mid" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="7" result="blur"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>

            <filter id="orb-glow-large" x="-90%" y="-90%" width="280%" height="280%">
              <feGaussianBlur stdDeviation="14" result="blur"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>

            <!-- Gradients -->
            <radialGradient id="grad-halo-back" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00d9ff" stop-opacity="0.18"></stop>
              <stop offset="42%" stop-color="#00d9ff" stop-opacity="0.07"></stop>
              <stop offset="100%" stop-color="#00d9ff" stop-opacity="0"></stop>
            </radialGradient>

            <radialGradient id="grad-core-shell" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92"></stop>
              <stop offset="10%" stop-color="#dff9ff" stop-opacity="0.84"></stop>
              <stop offset="28%" stop-color="#4feaff" stop-opacity="0.60"></stop>
              <stop offset="56%" stop-color="#00b8df" stop-opacity="0.20"></stop>
              <stop offset="100%" stop-color="#00111a" stop-opacity="0"></stop>
            </radialGradient>

            <radialGradient id="grad-core-inner" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop>
              <stop offset="18%" stop-color="#e8feff" stop-opacity="0.98"></stop>
              <stop offset="36%" stop-color="#6decff" stop-opacity="0.72"></stop>
              <stop offset="70%" stop-color="#0097c2" stop-opacity="0.22"></stop>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"></stop>
            </radialGradient>

            <radialGradient id="grad-front-spec" cx="32%" cy="24%" r="56%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.30"></stop>
              <stop offset="25%" stop-color="#ffffff" stop-opacity="0.12"></stop>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"></stop>
            </radialGradient>

            <linearGradient id="grad-scan-band-v4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="transparent"></stop>
              <stop offset="50%" stop-color="#00d9ff" stop-opacity="0.65"></stop>
              <stop offset="100%" stop-color="transparent"></stop>
            </linearGradient>

            <linearGradient id="grad-diag-sheen-v4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"></stop>
              <stop offset="18%" stop-color="#ffffff" stop-opacity="0.08"></stop>
              <stop offset="45%" stop-color="transparent" stop-opacity="0"></stop>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"></stop>
            </linearGradient>

            <!-- Scanlines -->
            <pattern id="core-scanlines-v4" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="1.6" fill="#00d9ff" opacity="0.08"></rect>
            </pattern>

            <!-- Clips -->
            <clipPath id="clip-main-core-v4">
              <circle cx="250" cy="250" r="120"></circle>
            </clipPath>

            <clipPath id="clip-inner-band-v4">
              <circle cx="250" cy="250" r="98"></circle>
            </clipPath>
          </defs>

          <!-- =========================
               PLAN ARRIÈRE
          ========================== -->

          <!-- Halo large -->
          <circle
            cx="250"
            cy="250"
            r="182"
            fill="url(#grad-halo-back)"
            class="core-back-halo"
          ></circle>

          <!-- Arcs arrière très lents -->
          <g class="layer-back-rot slow-cw">
            <path
              d="M 154 150 A 136 136 0 0 1 345 168"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.6"
              stroke-linecap="round"
              opacity="0.20"
              filter="url(#orb-glow-soft)"
            ></path>

            <path
              d="M 160 334 A 128 128 0 0 0 334 344"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.3"
              stroke-linecap="round"
              opacity="0.16"
              filter="url(#orb-glow-soft)"
            ></path>

            <circle
              cx="250"
              cy="250"
              r="142"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="0.7"
              stroke-dasharray="3 12"
              opacity="0.09"
            ></circle>
          </g>

          <!-- =========================
               PLAN MÉDIAN
          ========================== -->

          <!-- Structure externe fragmentée -->
          <g class="layer-mid-rot mid-ccw">
            <path
              d="M 188 124 A 138 138 0 0 1 312 124"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="2.6"
              stroke-linecap="round"
              opacity="0.54"
              filter="url(#orb-glow-soft)"
              class="sig-arc"
            ></path>

            <path
              d="M 188 376 A 138 138 0 0 0 312 376"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="2.6"
              stroke-linecap="round"
              opacity="0.42"
              filter="url(#orb-glow-soft)"
              class="sig-arc sig-arc-alt"
            ></path>

            ${this._ticks({r:136,count:40,majorEvery:8,majorLen:12,minorLen:5,majorWidth:1.3,minorWidth:.55,majorOpacity:.48,minorOpacity:.12})}
          </g>

          <!-- Cage externe asymétrique -->
          <g class="layer-mid-rot mid-cw">
            <path
              d="M 150 224 C 170 188, 205 164, 246 156"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.2"
              opacity="0.24"
            ></path>
            <path
              d="M 350 276 C 330 312, 295 336, 254 344"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.2"
              opacity="0.22"
            ></path>
            <path
              d="M 184 146 A 120 120 0 0 1 228 132"
              fill="none"
              stroke="#9cf6ff"
              stroke-width="1.4"
              opacity="0.34"
              stroke-linecap="round"
            ></path>
            <path
              d="M 274 368 A 118 118 0 0 0 324 346"
              fill="none"
              stroke="#9cf6ff"
              stroke-width="1.2"
              opacity="0.24"
              stroke-linecap="round"
            ></path>
          </g>

          <!-- Coeur principal -->
          <g class="core-main-group">
            <circle
              cx="250"
              cy="250"
              r="120"
              fill="url(#grad-core-shell)"
              class="core-shell"
            ></circle>

            <!-- Liseré frontal -->
            <circle
              cx="250"
              cy="250"
              r="120"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.5"
              opacity="0.46"
              filter="url(#orb-glow-soft)"
              class="core-shell-outline"
            ></circle>

            <!-- Contenu interne clippé -->
            <g clip-path="url(#clip-main-core-v4)">
              <!-- scanlines -->
              <circle
                cx="250"
                cy="250"
                r="120"
                fill="url(#core-scanlines-v4)"
                opacity="0.80"
                class="core-scanlines"
              ></circle>

              <!-- balayages -->
              <rect
                x="122"
                y="188"
                width="256"
                height="18"
                fill="url(#grad-scan-band-v4)"
                class="scan-band scan-band-a"
                opacity="0.34"
              ></rect>

              <rect
                x="128"
                y="254"
                width="242"
                height="12"
                fill="url(#grad-scan-band-v4)"
                class="scan-band scan-band-b"
                opacity="0.16"
              ></rect>

              <!-- Voile diagonal -->
              <path
                d="M 162 142 C 214 106, 300 114, 344 172 C 308 162, 260 166, 216 188 C 194 198, 176 184, 162 142 Z"
                fill="url(#grad-diag-sheen-v4)"
                opacity="0.45"
                class="diag-sheen"
              ></path>

              <!-- Couche interne arrière -->
              <g class="layer-inner-back slow-cw">
                <circle
                  cx="250"
                  cy="250"
                  r="92"
                  fill="none"
                  stroke="var(--orb-cyan)"
                  stroke-width="0.7"
                  stroke-dasharray="4 10"
                  opacity="0.16"
                ></circle>

                <path
                  d="M 174 214 A 86 86 0 0 1 232 166"
                  fill="none"
                  stroke="var(--orb-cyan)"
                  stroke-width="1.0"
                  opacity="0.18"
                  stroke-linecap="round"
                ></path>

                <path
                  d="M 326 286 A 84 84 0 0 1 272 334"
                  fill="none"
                  stroke="#9ff7ff"
                  stroke-width="0.9"
                  opacity="0.15"
                  stroke-linecap="round"
                ></path>
              </g>

              <!-- Bande technique interne -->
              <g clip-path="url(#clip-inner-band-v4)" class="layer-inner-front fast-ccw">
                <ellipse
                  cx="250"
                  cy="250"
                  rx="106"
                  ry="38"
                  fill="none"
                  stroke="var(--orb-cyan)"
                  stroke-width="0.85"
                  stroke-dasharray="14 10 4 9"
                  opacity="0.26"
                ></ellipse>

                <ellipse
                  cx="250"
                  cy="250"
                  rx="82"
                  ry="28"
                  fill="none"
                  stroke="#b1fbff"
                  stroke-width="0.75"
                  stroke-dasharray="5 7 12 10"
                  opacity="0.18"
                ></ellipse>

                <circle
                  cx="356"
                  cy="250"
                  r="3.2"
                  fill="var(--orb-cyan)"
                  opacity="0.76"
                  filter="url(#orb-glow-soft)"
                  class="orbit-dot"
                ></circle>
              </g>

              <!-- Segments avant asymétriques -->
              <g class="front-segments drift-subtle">
                <path
                  d="M 182 154 A 110 110 0 0 1 248 132"
                  fill="none"
                  stroke="#9cf7ff"
                  stroke-width="1.8"
                  opacity="0.28"
                  stroke-linecap="round"
                ></path>

                <path
                  d="M 322 346 A 110 110 0 0 1 260 370"
                  fill="none"
                  stroke="#9cf7ff"
                  stroke-width="1.6"
                  opacity="0.20"
                  stroke-linecap="round"
                ></path>

                <path
                  d="M 330 188 A 98 98 0 0 1 352 238"
                  fill="none"
                  stroke="var(--orb-cyan)"
                  stroke-width="1.0"
                  opacity="0.20"
                  stroke-linecap="round"
                ></path>
              </g>
            </g>

            <!-- Noyau énergétique -->
            <g class="nucleus-group">
              <circle
                cx="250"
                cy="250"
                r="60"
                fill="url(#grad-core-inner)"
                filter="url(#orb-glow-mid)"
                class="nucleus-halo"
              ></circle>

              <circle
                cx="250"
                cy="250"
                r="17"
                fill="#ffffff"
                opacity="0.82"
                filter="url(#orb-glow-soft)"
                class="nucleus-core"
              ></circle>

              <circle
                cx="250"
                cy="250"
                r="31"
                fill="none"
                stroke="#c7fdff"
                stroke-width="0.9"
                opacity="0.24"
                class="nucleus-ring"
              ></circle>
            </g>

            <!-- Reflets avant -->
            <ellipse
              cx="214"
              cy="200"
              rx="34"
              ry="28"
              fill="#ffffff"
              opacity="0.18"
              filter="url(#orb-glow-soft)"
              class="front-spec-large"
            ></ellipse>

            <circle
              cx="203"
              cy="189"
              r="9.5"
              fill="#ffffff"
              opacity="0.88"
              filter="url(#orb-glow-soft)"
            ></circle>

            <circle
              cx="279"
              cy="191"
              r="3.6"
              fill="#ffffff"
              opacity="0.35"
            ></circle>

            <circle
              cx="250"
              cy="250"
              r="120"
              fill="url(#grad-front-spec)"
              opacity="0.32"
            ></circle>
          </g>

          <!-- =========================
               PLAN AVANT
          ========================== -->

          <g class="layer-front-rot subtle-cw">
            <path
              d="M 136 250 C 150 205, 186 168, 232 152"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.0"
              opacity="0.14"
            ></path>
            <path
              d="M 364 250 C 350 295, 314 332, 268 348"
              fill="none"
              stroke="var(--orb-cyan)"
              stroke-width="1.0"
              opacity="0.14"
            ></path>
          </g>

          <!-- HUD minimal -->
          <g font-family="'Space Mono', monospace" fill="var(--orb-cyan)">
            <text
              x="250"
              y="418"
              text-anchor="middle"
              font-size="7.4"
              letter-spacing="3.8"
              opacity="0.54"
              class="hud-blink"
            >
              J.A.R.V.I.S · CORE MATRIX
            </text>

            <text
              x="250"
              y="431"
              text-anchor="middle"
              font-size="6.4"
              opacity="0.36"
              id="hud-status"
            >
              CORE MATRIX ▸ NOMINAL
            </text>
          </g>
        </svg>

        <div class="orb-label" id="orb-label">VEILLE</div>
      </div>
    `}spawnParticles(t){const s=document.getElementById("orb-particles");if(s)for(let a=0;a<t;a++){const e=document.createElement("div");e.className="orb-particle";const i=Math.random()*2.2+.8,o=Math.random()*100,c=Math.random()*100,d=Math.random()*8+8,p=Math.random()*-14,h=(Math.random()-.5)*52;e.style.cssText=`
        width: ${i}px;
        height: ${i}px;
        left: ${o}%;
        top: ${c}%;
        animation-duration: ${d}s;
        animation-delay: ${p}s;
        --drift-x: ${h}px;
        --drift-y: ${-Math.random()*86-18}px;
        --p-opacity: ${Math.random()*.22+.08};
      `,s.appendChild(e)}}startDataScroll(){this.dataInterval=setInterval(()=>{const t=document.getElementById("hud-status");t&&(t.textContent=this._hudData())},2400)}init(){this.scene=document.getElementById("orb-scene"),this.label=document.getElementById("orb-label"),n.subscribe(t=>{t.orbStatus!==this.currentStatus&&(this.currentStatus=t.orbStatus,this.updateState(t.orbStatus))})}updateState(t){this.scene.setAttribute("data-status",t);const s={idle:"VEILLE",listening:"ANALYSE VOIX",thinking:"TRAITEMENT",speaking:"ALLOCUTION"};this.label.textContent=s[t]||t.toUpperCase()}}class N{constructor(t){this.container=document.getElementById(t),this.render(),this.logsContainer=this.container.querySelector(".terminal-content"),this.init()}render(){this.container.innerHTML=`
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
    `}init(){}addLog(t,s="system"){const a=document.createElement("div");a.className=`log-line ${s}`;const e=new Date().toLocaleTimeString();a.innerHTML=`<span class="log-time">[${e}]</span> <span class="log-msg">${t}</span>`,this.logsContainer.appendChild(a),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.logsContainer.children.length>100&&this.logsContainer.removeChild(this.logsContainer.firstChild)}}class x{constructor(t){this.container=document.getElementById(t),this.render(),this.box=this.container.querySelector(".chat-box"),this.input=this.container.querySelector(".chat-input"),this.sendBtn=this.container.querySelector(".chat-send-btn"),this.init()}render(){this.container.innerHTML=`
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `}init(){this.sendBtn.addEventListener("click",()=>this.sendMessage()),this.input.addEventListener("keydown",t=>{t.key==="Enter"&&this.sendMessage()}),this.lastProcessedUser=null,this.lastProcessedJarvis=null,n.subscribe(t=>{t.lastUserMessage&&t.lastUserMessage!==this.lastProcessedUser&&(this.addMessage(t.lastUserMessage,"user"),this.lastProcessedUser=t.lastUserMessage),t.lastJarvisMessage&&t.lastJarvisMessage!==this.lastProcessedJarvis&&(this.addMessage(t.lastJarvisMessage,"jarvis"),this.lastProcessedJarvis=t.lastJarvisMessage)})}sendMessage(){const t=this.input.value.trim();t&&(b.send("ui.text_input",{text:t}),this.input.value="")}addMessage(t,s){const a=this.box.lastElementChild;if(a&&a.textContent===t&&a.classList.contains(s))return;const e=document.createElement("div");e.className=`msg ${s}`,e.textContent=t,this.box.appendChild(e),this.box.scrollTop=this.box.scrollHeight,e.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})}}class C{constructor(t){this.container=document.getElementById(t),this.render(),this.modal=this.container.querySelector(".settings-modal"),this.form=this.container.querySelector("#settings-form"),this.init()}render(){this.container.innerHTML=`
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
        `,e.querySelector(".m-del").onclick=()=>this.deleteMemory(a.key),this.memoryList.appendChild(e)})}catch{this.memoryList.innerHTML="ÉCHEC LECTURE"}}async deleteMemory(t){if(confirm(`OUBLIER : ${t} ?`))try{(await fetch(`/api/memory/${encodeURIComponent(t)}`,{method:"DELETE"})).ok&&this.loadMemory()}catch{}}async saveSettings(){const t={};this.form.querySelectorAll("input, select").forEach(a=>{t[a.name]=a.type==="checkbox"?a.checked?"true":"false":a.value});try{this.saveBtn.textContent="SYNCHRONISATION...",(await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?this.modal.close():alert("ERREUR CRITIQUE DE DÉPLOIEMENT")}catch{alert("ÉCHEC LIAISON")}finally{this.saveBtn.textContent="DÉPLOYER CONFIGURATION"}}open(){this.loadSettings(),this.modal.showModal()}}class L{constructor(t){this.container=document.getElementById(t),this.mounted=!1,this.init()}init(){n.subscribe(t=>{this.render(t.webSearchResults)})}render(t){if(!t){this.mounted&&(this.container.innerHTML="",this.mounted=!1);return}const{query:s,results:a}=t,e=a.map(i=>`
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
    `,this.mounted=!0}escapeHtml(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}class T{constructor(){this.init()}async init(){console.log("[APP] Initialisation J.A.R.V.I.S 0.2..."),this.status=new I("status-mount"),this.orb=new k("orb-mount"),this.terminal=new N("terminal-mount"),this.chat=new x("chat-mount"),this.settings=new C("settings-mount"),this.websearch=new L("websearch-mount"),document.getElementById("open-settings").addEventListener("click",()=>{this.settings.open()}),b.connect(),this.terminal.addLog("Système opérationnel. Liaison montante établie.","success")}}new T;
