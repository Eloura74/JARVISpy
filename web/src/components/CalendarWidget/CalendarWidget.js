import { store } from "../../services/state.js";

/**
 * CalendarWidget - Pop-up de confirmation pour les actions d'agenda (CRUD)
 */
export class CalendarWidget {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "calendar-widget-container";
    document.body.appendChild(this.container);
    this.isVisible = false;
    this.currentData = null;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="calendar-widget glass">
        <div class="calendar-widget__header">
          <div class="calendar-icon" id="cal-icon">📅</div>
          <span class="calendar-title" id="cal-title">CONFIRMATION AGENDA</span>
        </div>
        <div class="calendar-widget__content">
           <div class="calendar-event-info">
             <div class="event-action-tag" id="cal-type">ACTION</div>
             <div class="event-label">ÉVÉNEMENT</div>
             <div class="event-value" id="cal-summary">-</div>
             <div class="event-label">HORAIRES</div>
             <div class="event-value" id="cal-time">-</div>
           </div>
        </div>
        <div class="calendar-widget__footer">
          <button class="cal-btn cancel" id="cal-cancel">ANNULER</button>
          <button class="cal-btn confirm" id="cal-confirm">CONFIRMER</button>
        </div>
      </div>
    `;

    this.el = this.container.querySelector(".calendar-widget");
    this.summaryEl = this.container.querySelector("#cal-summary");
    this.timeEl = this.container.querySelector("#cal-time");
    this.typeEl = this.container.querySelector("#cal-type");
    this.titleEl = this.container.querySelector("#cal-title");

    // Listeners pour fermeture manuelle si besoin
    this.container.querySelector("#cal-cancel").onclick = () => this.hide();
    this.container.querySelector("#cal-confirm").onclick = () => this.hide();
  }

  show(data) {
    if (this.isVisible) return;

    this.currentData = data;
    this.summaryEl.textContent = data.summary || "Sans titre";

    const typeMap = {
      create: {
        label: "CRÉATION",
        color: "var(--primary)",
        title: "NOUVEAU RENDEZ-VOUS",
      },
      update: {
        label: "MODIFICATION",
        color: "var(--secondary)",
        title: "MISE À JOUR AGENDA",
      },
      delete: {
        label: "SUPPRESSION",
        color: "#ff4b2b",
        title: "SUPPRESSION AGENDA",
      },
    };

    const typeInfo = typeMap[data.type] || typeMap["create"];
    this.typeEl.textContent = typeInfo.label;
    this.typeEl.style.color = typeInfo.color;
    this.typeEl.style.borderColor = typeInfo.color;
    this.titleEl.textContent = typeInfo.title;

    const start = new Date(data.start);
    this.timeEl.textContent = start.toLocaleString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

    this.isVisible = true;
    this.el.classList.add("visible");
    console.log("[CALENDAR] Affichage du widget de confirmation", data);
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.el.classList.remove("visible");
    this.currentData = null;
    // On nettoie aussi le store pour éviter qu'il ne se ré-affiche au prochain changement de state
    store.setState({ calendarInfo: null });
  }
}
