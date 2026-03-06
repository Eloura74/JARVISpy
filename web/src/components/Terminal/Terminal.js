import { store } from "../../services/state.js";

/**
 * Terminal Component - Affiche les logs techniques de manière élégante
 */
export class Terminal {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.render();
    this.logsContainer = this.container.querySelector(".terminal-content");
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="terminal glass">
        <div class="terminal-header">
          <span class="terminal-title">FLUX DE DONNÉES</span>
          <div class="terminal-controls">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
        </div>
        <div class="terminal-content">
          <div class="log-line system">Initialisation du noyau visuel...</div>
        </div>
      </div>
    `;
  }

  init() {
    // Écoute les logs globaux (via console par exemple ou un bus dédié)
    // Pour cet exemple, on injecte manuellement via une méthode statique
  }

  addLog(text, type = "system") {
    const line = document.createElement("div");
    line.className = `log-line ${type}`;
    const time = new Date().toLocaleTimeString();
    line.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-msg">${text}</span>`;

    this.logsContainer.appendChild(line);
    this.logsContainer.scrollTop = this.logsContainer.scrollHeight;

    // Limite à 100 lignes pour la performance
    if (this.logsContainer.children.length > 100) {
      this.logsContainer.removeChild(this.logsContainer.firstChild);
    }
  }
}
