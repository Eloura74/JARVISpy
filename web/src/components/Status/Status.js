import { store } from "../../services/state.js";
import { decryptText } from "../../utils/textEffect.js";

/**
 * Status Component - Affiche les indicateurs système (Micro, Brain, TTS, Connection)
 */
export class Status {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="status-bar glass">
        <div class="status-logo">
           <div class="mini-reactor"></div>
           <span class="logo-text" id="main-logo">J.A.R.V.I.S. <span class="v">0.2</span></span>
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
    `;
  }

  init() {
    const logoEl = this.container.querySelector("#main-logo");
    const connEl = this.container.querySelector("#stat-conn .val");
    const brainEl = this.container.querySelector("#stat-brain .val");
    const ttsEl = this.container.querySelector("#stat-tts .val");

    // Effet initial
    decryptText(logoEl, "J.A.R.V.I.S. 0.2", 1200);

    store.subscribe((state) => {
      connEl.textContent = state.connection.toUpperCase();
      connEl.className = `val ${state.connection}`;

      brainEl.textContent = state.brainStatus.toUpperCase();
      brainEl.className = `val ${state.orbStatus}`;

      ttsEl.textContent = state.ttsStatus.toUpperCase();
      ttsEl.className = `val ${state.ttsStatus === "Actif" ? "active" : ""}`;
    });
  }
}
