import { store } from "../../services/state.js";

/**
 * VisionWidget - Affiche ce que JARVIS voit (captures d'écran)
 */
export class VisionWidget {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "vision-widget-container";
    document.body.appendChild(this.container);
    this.isVisible = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="vision-widget glass">
        <div class="vision-widget__header">
          <div class="vision-icon">👁️</div>
          <span class="vision-title">VISION SYSTÈME</span>
          <button class="vision-close" id="vision-close-btn">×</button>
        </div>
        <div class="vision-widget__content">
          <img id="vision-image" src="" alt="Analyse JARVIS" />
        </div>
        <div class="vision-widget__footer">
          <span class="vision-status">ANALYSE EN COURS...</span>
        </div>
      </div>
    `;

    this.el = this.container.querySelector(".vision-widget");
    this.imgEl = this.container.querySelector("#vision-image");

    this.container.querySelector("#vision-close-btn").onclick = () =>
      this.hide();
  }

  show(visionData) {
    if (!visionData || !visionData.data) return;

    this.imgEl.src = `data:${visionData.mime_type};base64,${visionData.data}`;
    this.isVisible = true;
    this.el.classList.add("visible");
    console.log("[VISION] Affichage de la capture d'écran");
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.el.classList.remove("visible");
    // Nettoyage du store pour éviter la réouverture
    store.setState({ visionData: null });
  }
}
