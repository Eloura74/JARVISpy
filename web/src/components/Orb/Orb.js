import { store } from "../../services/state.js";

/**
 * Orb Component - Visualiseur central animé
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
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
                 ${Array.from({ length: 72 })
                   .map(
                     (_, i) =>
                       `<line x1="0" y1="-185" x2="0" y2="-192" stroke="var(--primary)" stroke-width="${i % 6 === 0 ? 1.5 : 0.5}" transform="rotate(${i * 5})" opacity="${i % 6 === 0 ? 0.7 : 0.3}"/>`,
                   )
                   .join("")}
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
    `;
  }

  init() {
    this.label = document.getElementById("orb-label");
    this.svg = this.container.querySelector(".orb-svg");

    store.subscribe((state) => {
      this.updateState(state.orbStatus);
    });
  }

  updateState(status) {
    this.svg.setAttribute("data-status", status);
    const labels = {
      idle: "PRÊT / VEILLE",
      listening: "ANALYSE AUDIO",
      thinking: "RÉFLÉCHIT...",
      speaking: "COMMUNICATION",
    };
    this.label.textContent = labels[status] || status.toUpperCase();
  }
}
