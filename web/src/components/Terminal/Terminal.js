import { decryptText } from "../../utils/textEffect.js";

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
        <div class="glass-edge"></div>
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

  init() {}

  addLog(text, type = "system") {
    const line = document.createElement("div");
    line.className = `log-line ${type}`;
    const time = new Date().toLocaleTimeString();
    line.innerHTML = `<span class="log-time" style="color: var(--text-dim); margin-right: 8px;">[${time}]</span> <span class="log-msg"></span>`;

    this.logsContainer.appendChild(line);
    const msgSpan = line.querySelector(".log-msg");
    // Coloration selon le type via CSS variables
    if (type === "info") msgSpan.style.color = "var(--primary)";
    if (type === "success") msgSpan.style.color = "var(--text-accent)";
    if (type === "error") msgSpan.style.color = "#ff4444";

    decryptText(msgSpan, text, 600);

    this.logsContainer.scrollTop = this.logsContainer.scrollHeight;

    // Limite à 100 lignes pour la performance
    if (this.logsContainer.children.length > 100) {
      this.logsContainer.removeChild(this.logsContainer.firstChild);
    }
  }
}
