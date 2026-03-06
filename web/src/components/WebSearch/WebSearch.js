import { store } from "../../services/state.js";

/**
 * WebSearch Component - Affiche les résultats de recherche Web sous forme de tuiles
 */
export class WebSearch {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.mounted = false;
    this.init();
  }

  init() {
    store.subscribe((state) => {
      this.render(state.webSearchResults);
    });
  }

  render(data) {
    if (!data) {
      if (this.mounted) {
        this.container.innerHTML = "";
        this.mounted = false;
      }
      return;
    }

    const { query, results } = data;

    const resultsHtml = results
      .map(
        (r) => `
        <div class="web-result-card glass">
          <div class="web-result-id">${r.id}</div>
          <div class="web-result-content">
            <h3 class="web-result-title">${this.escapeHtml(r.title)}</h3>
            <p class="web-result-snippet">${this.escapeHtml(r.snippet)}</p>
            <div class="web-result-url">${this.escapeHtml(r.url)}</div>
          </div>
          ${
            r.image
              ? `<div class="web-result-image" style="background-image: url('${r.image}')"></div>`
              : `<div class="web-result-image-placeholder">N/A</div>`
          }
        </div>
      `,
      )
      .join("");

    this.container.innerHTML = `
      <div class="web-search-modal glass-modal">
        <div class="web-search-content glass">
          <div class="web-search-header">
            <div class="status-dot"></div>
            <h2>RECHERCHE WEB <span class="query-text">"${this.escapeHtml(query)}"</span></h2>
          </div>
          <div class="web-search-body hide-scroll">
            <div class="web-results-grid">
              ${resultsHtml}
            </div>
          </div>
          <div class="web-search-footer">
            <span class="pulsing-text">EN ATTENTE DE SÉLECTION VOCALE...</span>
          </div>
        </div>
      </div>
    `;

    this.mounted = true;
  }

  escapeHtml(unsafe) {
    if (!unsafe) return "";
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
