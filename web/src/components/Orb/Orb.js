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
