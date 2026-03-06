import { store } from "../../services/state.js";

/**
 * Orb V4 — JARVIS Core Matrix
 * SVG aligné sur le système de classes V4 : couches, rotations différenciées, noyau stratifié
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.currentStatus = "idle";
    this.render();
    this.init();
    this.spawnParticles(22);
    this.startDataScroll();
  }

  _hudData() {
    const rows = [
      "NEURAL CORE ▸ NOMINAL",
      `SYNC ▸ ${(Math.random() * 0.4 + 99.5).toFixed(2)}%`,
      `LATENCY ▸ ${(Math.random() * 3 + 8).toFixed(0)}ms`,
      "PHASE ▸ LOCKED",
      `FREQ ▸ ${(Math.random() * 0.3 + 2.49).toFixed(2)} GHz`,
      "SHIELD ▸ ACTIVE",
      `UPTIME ▸ ${Math.floor(Math.random() * 24 + 1)}h ${String(Math.floor(Math.random() * 60)).padStart(2, "0")}m`,
    ];
    return rows[Math.floor(Math.random() * rows.length)];
  }

  // Génère des ticks à r donné, centrés sur (cx, cy) = (250, 250)
  _ticks(r, count, majorEvery, lenMaj, lenMin, cx = 250, cy = 250) {
    return Array.from({ length: count }, (_, i) => {
      const ang = (i * 360) / count;
      const rad = (ang * Math.PI) / 180;
      const major = i % majorEvery === 0;
      const len = major ? lenMaj : lenMin;
      const x1 = (cx + r * Math.sin(rad)).toFixed(1);
      const y1 = (cy - r * Math.cos(rad)).toFixed(1);
      const x2 = (cx + (r - len) * Math.sin(rad)).toFixed(1);
      const y2 = (cy - (r - len) * Math.cos(rad)).toFixed(1);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="#00d9ff" stroke-width="${major ? 1.4 : 0.55}"
        opacity="${major ? 0.52 : 0.2}"/>`;
    }).join("");
  }

  render() {
    this.container.innerHTML = `
      <div class="orb-scene" id="orb-scene" data-status="idle">

        <!-- Fond grille hexagonale -->
        <svg class="orb-hex-grid" viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="hex-p" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,15 54,39 28,52 2,39 2,15"
                fill="none" stroke="#00d9ff" stroke-width="0.3" opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hex-p)"/>
        </svg>

        <!-- Particules ambiantes -->
        <div class="orb-particles" id="orb-particles"></div>

        <!-- SVG hologramme V4 -->
        <svg class="orb-svg orb-svg--matrix" viewBox="0 0 500 500"
          overflow="visible" aria-label="JARVIS Holographic Core V4">
          <defs>
            <!-- Glow léger -->
            <filter id="gs" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <!-- Glow moyen -->
            <filter id="gm" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <!-- Glow fort (halo) -->
            <filter id="gl" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="14" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            <!-- Gradient coque : lumière haut-gauche → profondeur bas-droite -->
            <radialGradient id="grad-shell" cx="34%" cy="28%" r="68%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.90"/>
              <stop offset="9%"   stop-color="#cff8ff" stop-opacity="0.85"/>
              <stop offset="24%"  stop-color="#00d9ff" stop-opacity="0.65"/>
              <stop offset="52%"  stop-color="#0090b8" stop-opacity="0.28"/>
              <stop offset="80%"  stop-color="#002840" stop-opacity="0.10"/>
              <stop offset="100%" stop-color="#001018" stop-opacity="0.00"/>
            </radialGradient>

            <!-- Gradient halo ambiant -->
            <radialGradient id="grad-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stop-color="#00d9ff" stop-opacity="0.16"/>
              <stop offset="42%"  stop-color="#00d9ff" stop-opacity="0.05"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- Rim light bas-droite -->
            <radialGradient id="grad-rim" cx="72%" cy="75%" r="46%">
              <stop offset="0%"   stop-color="#60eeff" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- Noyau brillant -->
            <radialGradient id="grad-nucleus" cx="43%" cy="37%" r="62%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="1.00"/>
              <stop offset="14%"  stop-color="#e0feff" stop-opacity="0.95"/>
              <stop offset="38%"  stop-color="#00d9ff" stop-opacity="0.55"/>
              <stop offset="74%"  stop-color="#005a78" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- Gradient sheen diagonal -->
            <linearGradient id="grad-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.26"/>
              <stop offset="26%"  stop-color="#ffffff" stop-opacity="0.08"/>
              <stop offset="55%"  stop-color="transparent" stop-opacity="0"/>
            </linearGradient>

            <!-- Gradient scan band -->
            <linearGradient id="grad-scan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stop-color="transparent"/>
              <stop offset="50%"  stop-color="#00d9ff" stop-opacity="0.60"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>

            <!-- Clip sphère -->
            <clipPath id="clip-sphere">
              <circle cx="250" cy="250" r="126"/>
            </clipPath>
          </defs>

          <!-- ══ HALO AMBIANT ══ -->
          <circle cx="250" cy="250" r="185" fill="url(#grad-halo)" class="core-back-halo"/>

          <!-- ══ ANNEAU EXTÉRIEUR — rotation très lente ══ -->
          <g class="layer-back-rot slow-cw">
            ${this._ticks(136, 40, 8, 12, 5)}
            <!-- Arcs partiels signature haut/bas -->
            <path d="M 172 145 A 133 133 0 0 1 328 145"
              fill="none" stroke="#00d9ff" stroke-width="1.8"
              stroke-linecap="round" opacity="0.40" filter="url(#gs)"
              class="sig-arc"/>
            <path d="M 172 355 A 133 133 0 0 0 328 355"
              fill="none" stroke="#00d9ff" stroke-width="1.8"
              stroke-linecap="round" opacity="0.40" filter="url(#gs)"
              class="sig-arc sig-arc-alt"/>
          </g>

          <!-- ══ GROUPE PRINCIPAL — drift vertical ══ -->
          <g class="core-main-group">

            <!-- Coque volumétrique -->
            <circle cx="250" cy="250" r="126" fill="url(#grad-shell)" class="core-shell"/>
            <!-- Rim light -->
            <circle cx="250" cy="250" r="126" fill="url(#grad-rim)"/>

            <!-- ── CONTENU INTERNE CLIPPÉ ─────────────────── -->
            <g clip-path="url(#clip-sphere)">

              <!-- Scanlines horizontales subtiles -->
              <g class="core-scanlines" opacity="0.055">
                ${Array.from(
                  { length: 22 },
                  (_, i) =>
                    `<line x1="124" y1="${128 + i * 11}" x2="376" y2="${128 + i * 11}"
                    stroke="#00d9ff" stroke-width="0.5"/>`,
                ).join("")}
              </g>

              <!-- Bande de scan A -->
              <rect x="124" y="182" width="252" height="18"
                fill="url(#grad-scan)" class="scan-band scan-band-a"
                filter="url(#gs)"/>
              <!-- Bande de scan B -->
              <rect x="136" y="248" width="228" height="12"
                fill="url(#grad-scan)" class="scan-band scan-band-b"
                filter="url(#gs)"/>

              <!-- Anneau médian rotation CW -->
              <g class="layer-mid-rot mid-cw">
                <circle cx="250" cy="250" r="92" fill="none" stroke="#00d9ff"
                  stroke-width="0.8" stroke-dasharray="14 5" opacity="0.26"/>
                ${this._ticks(92, 24, 6, 5, 3)}
                <!-- Arc signature médian -->
                <path d="M 163 232 A 90 90 0 0 1 220 168"
                  fill="none" stroke="#00d9ff" stroke-width="1.8"
                  stroke-linecap="round" opacity="0.48" filter="url(#gs)"/>
                <!-- Particule orbitale -->
                <circle cx="250" cy="158" r="4.5" fill="#00d9ff"
                  filter="url(#gm)" class="orbit-dot"/>
              </g>

              <!-- Anneau médian rotation CCW -->
              <g class="layer-mid-rot mid-ccw">
                <circle cx="250" cy="250" r="78" fill="none" stroke="#80eeff"
                  stroke-width="0.6" stroke-dasharray="5 9" opacity="0.18"/>
              </g>

              <!-- Anneau interne arrière CCW -->
              <g class="layer-inner-back mid-ccw">
                <circle cx="250" cy="250" r="62" fill="none" stroke="#00d9ff"
                  stroke-width="0.7" stroke-dasharray="8 10" opacity="0.20"/>
              </g>

              <!-- Anneau interne avant — rotation rapide CCW -->
              <g class="layer-inner-front fast-ccw">
                <circle cx="250" cy="250" r="50" fill="none" stroke="#50e0ff"
                  stroke-width="0.5" stroke-dasharray="3 8" opacity="0.14"/>
                <!-- 2ème particule orbitale (plus petite) -->
                <circle cx="250" cy="200" r="3" fill="#80eeff"
                  filter="url(#gs)" class="orbit-dot"/>
              </g>

              <!-- Sheen diagonal traversant -->
              <path d="M 162 144 C 212 108, 308 118, 346 176
                       C 310 162, 262 165, 218 188
                       C 198 198, 180 184, 162 144 Z"
                fill="url(#grad-sheen)" class="diag-sheen"/>

            </g>
            <!-- ── FIN CLIP ─────────────────────────────────── -->

            <!-- Contour externe lumineux -->
            <circle cx="250" cy="250" r="126" fill="none" stroke="#00d9ff"
              stroke-width="1.5" class="core-shell-outline" filter="url(#gs)"/>
            <!-- Ligne interne fine (profondeur) -->
            <circle cx="250" cy="250" r="110" fill="none" stroke="#00d9ff"
              stroke-width="0.4" opacity="0.10"/>

            <!-- ══ NOYAU STRATIFIÉ ══ -->
            <g class="nucleus-group">
              <!-- Halo noyau -->
              <circle cx="250" cy="250" r="68" fill="url(#grad-nucleus)"
                class="nucleus-halo" filter="url(#gl)" opacity="0.5"/>
              <!-- Anneau noyau -->
              <circle cx="250" cy="250" r="58" fill="none" stroke="#00d9ff"
                stroke-width="0.8" stroke-dasharray="6 10"
                class="nucleus-ring" opacity="0.20"/>
              <!-- Corps noyau -->
              <circle cx="250" cy="250" r="52" fill="url(#grad-nucleus)"
                class="nucleus-core" filter="url(#gm)"/>
              <!-- Point central -->
              <circle cx="250" cy="250" r="13" fill="#ffffff" opacity="0.82"
                filter="url(#gs)"/>
            </g>

            <!-- ══ REFLETS SPÉCULAIRES ══ -->
            <!-- Grand reflet diffus -->
            <circle cx="216" cy="204" r="34" fill="white" opacity="0.15"
              filter="url(#gs)" class="front-spec-large"/>
            <!-- Point brillant net -->
            <circle cx="205" cy="192" r="9.5" fill="white" opacity="0.90"
              filter="url(#gs)"/>
            <!-- Reflet secondaire asymétrique -->
            <circle cx="278" cy="191" r="3.5" fill="white" opacity="0.36"/>

          </g>
          <!-- ══ FIN GROUPE PRINCIPAL ══ -->

          <!-- HUD texte minimal -->
          <g font-family="'Space Mono', monospace" fill="#00d9ff">
            <text x="250" y="420" text-anchor="middle" font-size="7.5"
              letter-spacing="3.5" opacity="0.52" class="hud-blink">
              J.A.R.V.I.S · CORE ONLINE
            </text>
            <text x="250" y="432" text-anchor="middle" font-size="6.5"
              id="hud-status" opacity="0.36">
              NEURAL CORE ▸ NOMINAL
            </text>
          </g>
        </svg>

        <!-- Étiquette statut -->
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
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%; top:${Math.random() * 100}%;
        animation-duration:${Math.random() * 9 + 7}s;
        animation-delay:${Math.random() * -15}s;
        --drift-x:${(Math.random() - 0.5) * 46}px;
        --drift-y:${-Math.random() * 80 - 18}px;
        --p-opacity:${Math.random() * 0.22 + 0.07};
      `;
      zone.appendChild(p);
    }
  }

  startDataScroll() {
    setInterval(() => {
      const el = document.getElementById("hud-status");
      if (el) el.textContent = this._hudData();
    }, 2500);
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
