import { store } from "../../services/state.js";

/**
 * EmailWidget - Affiche les derniers e-mails non lus dans le HUD
 */
export class EmailWidget {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "email-widget-container";
    document.body.appendChild(this.container);
    this.isVisible = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="email-widget glass">
        <div class="email-widget__header">
          <div class="email-icon">✉️</div>
          <span class="email-title">COURRIERS RÉCENTS</span>
          <button class="email-close" id="email-close-btn">×</button>
        </div>
        <div class="email-widget__list" id="email-list">
          <!-- Injecté dynamiquement -->
        </div>
        <div class="email-widget__footer">
          <span class="email-status">SOURCE : GMAIL PRIMARY</span>
        </div>
      </div>
    `;

    this.el = this.container.querySelector(".email-widget");
    this.listEl = this.container.querySelector("#email-list");
    this.container.querySelector("#email-close-btn").onclick = () =>
      this.hide();
  }

  show(emailData) {
    if (!emailData || !Array.isArray(emailData)) return;

    this.listEl.innerHTML = emailData
      .map(
        (email) => `
      <div class="email-item">
        <div class="email-item__top">
          <span class="email-sender">${this.escapeHtml(email.from)}</span>
          <span class="email-date">${this.formatDate(email.date)}</span>
        </div>
        <div class="email-subject">${this.escapeHtml(email.subject)}</div>
      </div>
    `,
      )
      .join("");

    this.isVisible = true;
    this.el.classList.add("visible");
    console.log("[GMAIL] Affichage des e-mails");
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.el.classList.remove("visible");
    store.setState({ emailData: null });
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  formatDate(dateStr) {
    // Simplification pour le HUD (HH:MM ou Date courte)
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return dateStr;
    }
  }
}
