import { store } from "../../services/state.js";

/**
 * Orb V4 — JARVIS Core Matrix
 * Refonte complète :
 * - abandon de la sphère pure
 * - noyau hybride multicouche
 * - profondeur simulée par couches et clipping
 * - rotation différenciée
 * - rendu premium orienté JARVIS OS
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.currentStatus = "idle";
    this.dataInterval = null;

    this.render();
    this.init();
    this.spawnParticles(26);
    this.startDataScroll();
  }

  _hudData() {
    const rows = [
      "CORE MATRIX ▸ NOMINAL",
      `SYNC ▸ ${(Math.random() * 0.35 + 99.61).toFixed(2)}%`,
      `LATENCY ▸ ${(Math.random() * 3 + 7).toFixed(0)}ms`,
      "PHASE GRID ▸ LOCKED",
      `FREQ ▸ ${(Math.random() * 0.25 + 2.51).toFixed(2)} GHz`,
      "NEURAL FABRIC ▸ ACTIVE",
      `UPLINK ▸ ${(Math.random() * 9 + 91).toFixed(0)}%`,
      `LOAD ▸ ${(Math.random() * 18 + 24).toFixed(0)}%`,
      `TEMP ▸ ${(Math.random() * 4 + 36).toFixed(1)}°C`,
    ];

    return rows[Math.floor(Math.random() * rows.length)];
  }

  /**
   * Génère des ticks radiaux SVG.
   * cx, cy : centre
   * r      : rayon
   * count  : nombre de ticks
   */
  _ticks({
    cx = 250,
    cy = 250,
    r = 120,
    count = 24,
    majorEvery = 6,
    majorLen = 10,
    minorLen = 5,
    majorWidth = 1.3,
    minorWidth = 0.6,
    majorOpacity = 0.55,
    minorOpacity = 0.18,
    color = "var(--orb-cyan)",
  }) {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const isMajor = i % majorEvery === 0;
      const len = isMajor ? majorLen : minorLen;

      const x1 = cx + r * Math.sin(rad);
      const y1 = cy - r * Math.cos(rad);
      const x2 = cx + (r - len) * Math.sin(rad);
      const y2 = cy - (r - len) * Math.cos(rad);

      return `
        <line
          x1="${x1.toFixed(1)}"
          y1="${y1.toFixed(1)}"
          x2="${x2.toFixed(1)}"
          y2="${y2.toFixed(1)}"
          stroke="${color}"
          stroke-width="${isMajor ? majorWidth : minorWidth}"
          opacity="${isMajor ? majorOpacity : minorOpacity}"
        />
      `;
    }).join("");
  }

  render() {
    this.container.innerHTML = `
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

            ${this._ticks({
              r: 136,
              count: 40,
              majorEvery: 8,
              majorLen: 12,
              minorLen: 5,
              majorWidth: 1.3,
              minorWidth: 0.55,
              majorOpacity: 0.48,
              minorOpacity: 0.12,
            })}
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
    `;
  }

  spawnParticles(count) {
    const zone = document.getElementById("orb-particles");
    if (!zone) return;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "orb-particle";

      const size = Math.random() * 2.2 + 0.8;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 8 + 8;
      const delay = Math.random() * -14;
      const drift = (Math.random() - 0.5) * 52;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift-x: ${drift}px;
        --drift-y: ${-Math.random() * 86 - 18}px;
        --p-opacity: ${Math.random() * 0.22 + 0.08};
      `;

      zone.appendChild(p);
    }
  }

  startDataScroll() {
    this.dataInterval = setInterval(() => {
      const el = document.getElementById("hud-status");
      if (el) el.textContent = this._hudData();
    }, 2400);
  }

  init() {
    this.scene = document.getElementById("orb-scene");
    this.label = document.getElementById("orb-label");

    store.subscribe((state) => {
      if (state.orbStatus !== this.currentStatus) {
        this.currentStatus = state.orbStatus;
        this.updateState(state.orbStatus);
      }
    });
  }

  updateState(status) {
    this.scene.setAttribute("data-status", status);

    const labels = {
      idle: "VEILLE",
      listening: "ANALYSE VOIX",
      thinking: "TRAITEMENT",
      speaking: "ALLOCUTION",
    };

    this.label.textContent = labels[status] || status.toUpperCase();
  }
}
