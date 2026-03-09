import { store } from "../../services/state.js";

/**
 * PrinterWidget Component - Affiche le statut des imprimantes 3D (VZbot / Bambu)
 */
export class PrinterWidget {
  constructor(containerId = "printer-widget-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      // Si le conteneur n'existe pas dans le DOM, on le crée
      this.container = document.createElement("div");
      this.container.id = containerId;
      document.querySelector(".stage-left").appendChild(this.container);
    }
    this.isVisible = false;
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="printer-widget glass margin-left-10px margin-right-10px" style="display: none;">
        <div class="card-header">
          <span class="printer-icon">Imprimante</span> <span class="printer-name">PRINTER STATUS</span>
        </div>
        <div class="card-body">
          <div class="print-info">
            <div class="print-file-name" id="p-filename">Aucun fichier</div>
            <div class="print-progress-container">
              <div class="print-progress-bar" id="p-progress-bar"></div>
              <span class="print-progress-text" id="p-progress-text">0%</span>
            </div>
          </div>
          <div class="print-metrics">
            <div class="p-metric">
              <span class="label">EXTRUDEUR</span>
              <span class="val" id="p-temp-ext">0°C</span>
            </div>
            <div class="p-metric">
              <span class="label">PLATEAU</span>
              <span class="val" id="p-temp-bed">0°C</span>
            </div>
          </div>
          <div class="print-status-label" id="p-status">IDLE</div>
        </div>
      </div>
    `;
    this.widgetEl = this.container.querySelector(".printer-widget");
  }

  init() {
    store.subscribe((state) => {
      const data = state.printData.moonraker || state.printData.bambu;
      if (data) {
        this.update(data);
        this.show();
      } else {
        this.hide();
      }
    });
  }

  update(data) {
    const filenameEl = this.container.querySelector("#p-filename");
    const progressTextEl = this.container.querySelector("#p-progress-text");
    const progressBarEl = this.container.querySelector("#p-progress-bar");
    const tempExtEl = this.container.querySelector("#p-temp-ext");
    const tempBedEl = this.container.querySelector("#p-temp-bed");
    const statusEl = this.container.querySelector("#p-status");
    const nameEl = this.container.querySelector(".printer-name");

    nameEl.textContent =
      data.type === "moonraker" ? "VZBOT STATS" : "BAMBU STATS";
    filenameEl.textContent = data.fichier || data.fichier_en_cours || "Inconnu";

    const progress = data["avancement_%"] || 0;
    progressTextEl.textContent = `${progress}%`;
    progressBarEl.style.width = `${progress}%`;

    const ext = data.extrudeur || data["extrudeur_°C"] || {};
    const bed = data.plateau || data["plateau_°C"] || {};

    tempExtEl.textContent = `${ext.actuel || 0}°C / ${ext.cible || 0}°C`;
    tempBedEl.textContent = `${bed.actuel || 0}°C / ${bed.cible || 0}°C`;

    statusEl.textContent = (data.état || "IDLE").toUpperCase();
    statusEl.className = `print-status-label state-${(data.état || "idle").toLowerCase()}`;
  }

  show() {
    if (!this.isVisible) {
      this.widgetEl.style.display = "block";
      this.widgetEl.animate(
        [
          { opacity: 0, transform: "translateX(-20px) scale(0.95)" },
          { opacity: 1, transform: "translateX(0) scale(1)" },
        ],
        { duration: 400, easing: "ease-out", fill: "both" },
      );
      this.isVisible = true;
    }
  }

  hide() {
    if (this.isVisible) {
      this.widgetEl.animate(
        [
          { opacity: 1, transform: "translateX(0) scale(1)" },
          { opacity: 0, transform: "translateX(-20px) scale(0.95)" },
        ],
        { duration: 300, easing: "ease-in", fill: "both" },
      ).onfinish = () => {
        this.widgetEl.style.display = "none";
      };
      this.isVisible = false;
    }
  }
}
