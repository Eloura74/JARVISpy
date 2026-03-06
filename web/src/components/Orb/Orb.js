import { store } from "../../services/state.js";

/**
 * Orb — Hologramme 3D avec particules dynamiques et anneaux SVG
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.currentStatus = "idle";
    this.particles = [];
    this.render();
    this.init();
    this.spawnParticles(40); // 40 particules initiales
    this.startDataScroll(); // Démarrer le défilement des données HUD
  }

  // ── Données HUD flottantes ──────────────────────────────────
  _hudData() {
    const rows = [
      "SYS.CORE ▸ ONLINE",
      `NEURAL-LINK ▸ ${(Math.random() * 0.5 + 99).toFixed(2)}%`,
      `LATENCY ▸ ${(Math.random() * 5 + 8).toFixed(0)}ms`,
      "ENCRYPT ▸ AES-256",
      `FREQ ▸ ${(Math.random() * 0.5 + 2.44).toFixed(2)} GHz`,
      "SEC-LAYER ▸ ACTIVE",
      `SIG ▸ ${(Math.random() * 20 + 75).toFixed(0)}dB`,
    ];
    return rows[Math.floor(Math.random() * rows.length)];
  }

  // ── Rendu HTML principal ────────────────────────────────────
  render() {
    this.container.innerHTML = `
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
            ${Array.from({ length: 16 })
              .map(
                (_, i) =>
                  `<line x1="90" y1="${120 + i * 18}" x2="410" y2="${120 + i * 18}"
               stroke="var(--primary)" stroke-width="0.5"
               stroke-dasharray="${Math.random() * 20 + 5} ${Math.random() * 10 + 3}"/>`,
              )
              .join("")}
          </g>

          <!-- Anneau externe: ticks -->
          <g class="holo-ring ring-outer" transform="translate(250,250)">
            <circle r="185" fill="none" stroke="var(--primary)" stroke-width="0.5" opacity="0.15"/>
            ${Array.from({ length: 60 })
              .map((_, i) => {
                const major = i % 5 === 0;
                return `<line x1="0" y1="${-185}" x2="0" y2="${major ? -176 : -180}"
                stroke="var(--primary)" stroke-width="${major ? 1.5 : 0.6}"
                opacity="${major ? 0.7 : 0.25}" transform="rotate(${i * 6})"/>`;
              })
              .join("")}
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
    `;
  }

  // ── Particules flottantes ───────────────────────────────────
  spawnParticles(count) {
    const zone = document.getElementById("orb-particles");
    if (!zone) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "orb-particle";
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * -12;
      const drift = (Math.random() - 0.5) * 80;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${x}%; top: ${y}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift-x: ${drift}px;
        --drift-y: ${-Math.random() * 120 - 40}px;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      zone.appendChild(p);
    }
  }

  // ── Scroll des données HUD ──────────────────────────────────
  startDataScroll() {
    setInterval(() => {
      const l = document.getElementById("hud-line-l");
      const r = document.getElementById("hud-line-r");
      if (l) l.textContent = this._hudData();
      if (r) r.textContent = this._hudData();
    }, 2000);
  }

  // ── Init & subscribe ────────────────────────────────────────
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
