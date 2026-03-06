import { store } from "../../services/state.js";

/**
 * Orb V2 — Style Stark / Iron Man
 * Version centrée uniquement sur la sphère
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.currentStatus = "idle";
    this.render();
    this.init();
    this.spawnParticles(28);
    this.startDataScroll();
  }

  _hudData() {
    const rows = [
      "ARC CORE ▸ STABLE",
      `NEURAL SYNC ▸ ${(Math.random() * 0.6 + 99.1).toFixed(2)}%`,
      `LATENCY ▸ ${(Math.random() * 4 + 8).toFixed(0)}ms`,
      "PHASE ▸ LOCKED",
      `FREQ ▸ ${(Math.random() * 0.4 + 2.48).toFixed(2)} GHz`,
      "ENERGY GRID ▸ ACTIVE",
      `SIGNAL ▸ ${(Math.random() * 12 + 84).toFixed(0)}dB`,
      `CORE TEMP ▸ ${(Math.random() * 4 + 36).toFixed(1)}°C`,
    ];
    return rows[Math.floor(Math.random() * rows.length)];
  }

  render() {
    this.container.innerHTML = `
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
    `;
  }

  spawnParticles(count) {
    const zone = document.getElementById("orb-particles");
    if (!zone) return;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "orb-particle";

      const size = Math.random() * 2.6 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 7 + 7;
      const delay = Math.random() * -10;
      const drift = (Math.random() - 0.5) * 42;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift-x: ${drift}px;
        --drift-y: ${-Math.random() * 70 - 18}px;
        --p-opacity: ${Math.random() * 0.28 + 0.12};
      `;

      zone.appendChild(p);
    }
  }

  startDataScroll() {
    setInterval(() => {
      const center = document.getElementById("hud-line-c");
      if (center) center.textContent = this._hudData();
    }, 2200);
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
