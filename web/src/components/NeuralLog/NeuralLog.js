import { store } from "../../services/state.js";

/**
 * NeuralLog Component - Affiche les processus cognitifs (mémoire RAG) de JARVIS
 */
export class NeuralLog {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    if (!this.container) {
      console.warn(`[NeuralLog] Élément #${elementId} introuvable.`);
      return;
    }
    this.render();
    this.logList = this.container.querySelector(".neural-log-list");
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="neural-log glass">
        <div class="card-header">
          <span class="pulse-icon"></span> COGNITIVE FEEDBACK
        </div>
        <div class="card-body">
          <div class="neural-log-list hide-scroll">
            <div class="empty-log">EN ATTENTE D'ACTIVITÉ COGNITIVE...</div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    store.subscribe((state) => {
      if (state.lastNeuralLog) {
        this.addLog(state.lastNeuralLog);
      }
    });
  }

  addLog(data) {
    // Nettoyer le message vide
    const emptyLog = this.logList.querySelector(".empty-log");
    if (emptyLog) emptyLog.remove();

    const { query, memories } = data;

    const logItem = document.createElement("div");
    logItem.className = "neural-log-item";

    let memoriesHtml = memories
      .map(
        (m) => `
      <div class="memory-fragment">
        <span class="memory-icon">◈</span> ${m.content}
      </div>
    `,
      )
      .join("");

    logItem.innerHTML = `
      <div class="query-trigger">CONTEXT SEARCH: "${query}"</div>
      <div class="memory-results">
        ${memoriesHtml}
      </div>
    `;

    // Garder seulement les 3 derniers pour ne pas surcharger
    if (this.logList.children.length >= 3) {
      this.logList.removeChild(this.logList.lastElementChild);
    }

    this.logList.prepend(logItem);

    // Animation d'entrée
    logItem.animate(
      [
        { opacity: 0, filter: "blur(5px)", transform: "translateX(-20px)" },
        { opacity: 1, filter: "blur(0)", transform: "translateX(0)" },
      ],
      { duration: 400, easing: "ease-out" },
    );
  }
}
