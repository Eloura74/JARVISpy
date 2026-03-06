import { store } from "../../services/state.js";

/**
 * Orb V3 — JARVIS Premium Holographic Core
 * Design: noyau IA stratifié 3 couches, palette cyan/blanc, zéro orange
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

  // ── Génération des ticks d'anneaux (coords absolues SVG centree 250,250) ──
  _ticks(r, count, major_every, len_major, len_minor, cx = 250, cy = 250) {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const major = i % major_every === 0;
      const len = major ? len_major : len_minor;
      const x1 = cx + r * Math.sin(rad);
      const y1 = cy - r * Math.cos(rad);
      const x2 = cx + (r - len) * Math.sin(rad);
      const y2 = cy - (r - len) * Math.cos(rad);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}"
        x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
        stroke="var(--orb-cyan)" stroke-width="${major ? 1.3 : 0.6}"
        opacity="${major ? 0.55 : 0.22}"/>`;
    }).join("");
  }

  render() {
    this.container.innerHTML = `
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
              ${Array.from(
                { length: 22 },
                (_, i) =>
                  `<line x1="124" y1="${128 + i * 11}" x2="376" y2="${128 + i * 11}"
                  stroke="#00D9FF" stroke-width="0.6"/>`,
              ).join("")}
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
              ${this._ticks(90, 24, 6, 5, 3)}
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
            ${this._ticks(134, 36, 9, 11, 5)}
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
        --drift-x:${(Math.random() - 0.5) * 48}px;
        --drift-y:${-Math.random() * 80 - 20}px;
        --p-opacity:${Math.random() * 0.25 + 0.08};
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
