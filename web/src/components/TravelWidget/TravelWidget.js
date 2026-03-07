import { store } from "../../services/state.js";

/**
 * TravelWidget - Aide à la mobilité éphémère
 * Affiche les infos de trajet et se ferme automatiquement.
 */
export class TravelWidget {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.isVisible = false;
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div id="travel-widget" class="travel-widget glass-panel hidden">
        <div class="widget-header">
          <div class="location-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="header-text">
            <span class="label">TRANSIT INTELLIGENCE</span>
            <h3 id="travel-destination">DESTINATION</h3>
          </div>
          <button id="close-travel" class="close-btn">✕</button>
        </div>
        
        <div class="widget-body">
          <div id="travel-map-container" class="map-container empty">
             <img id="travel-map-img" src="" alt="Carte Trajet" class="hidden" />
             <div class="map-placeholder">GÉNÉRATION DE L'ITINÉRAIRE...</div>
          </div>

          <div class="travel-stats">
            <div class="stat">
              <span class="s-label">DURÉE (TRAFIC)</span>
              <span id="travel-duration" class="s-value">-- min</span>
            </div>
            <div class="stat highlight">
              <span class="s-label">DÉPART CONSEILLÉ</span>
              <span id="travel-departure" class="s-value">--:--</span>
            </div>
          </div>
          
          <div id="travel-arrival-box" class="arrival-target">
            Cible : <span id="travel-arrival-target">--:--</span>
          </div>
          
          <div class="route-info">
            <span class="dist" id="travel-distance">-- km</span>
            <span class="via" id="travel-origin">via Route</span>
          </div>
        </div>
        
        <div class="widget-footer">
          <div class="live-indicator">
            <span class="dot pulse"></span> LIVE TRAFFIC
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.widget = this.container.querySelector("#travel-widget");
    this.closeBtn = this.container.querySelector("#close-travel");

    this.closeBtn.onclick = () => this.hide();

    // S'abonner aux changements d'état (si on veut passer par le store plus tard)
    // Mais ici on va piloter en direct via des événements ou des appels directs
  }

  show(data) {
    if (!data || data.error) return;

    this.container.querySelector("#travel-destination").textContent =
      data.destination;
    this.container.querySelector("#travel-duration").textContent =
      data.duration;
    this.container.querySelector("#travel-distance").textContent =
      data.distance;
    this.container.querySelector("#travel-origin").textContent =
      `Depuis: ${data.origin}`;

    const departure = this.container.querySelector("#travel-departure");
    const arrivalBox = this.container.querySelector("#travel-arrival-box");
    const arrivalTarget = this.container.querySelector(
      "#travel-arrival-target",
    );

    if (data.suggested_departure) {
      departure.textContent = data.suggested_departure;
      arrivalTarget.textContent = data.arrival_target;
      arrivalBox.classList.remove("hidden");
    } else {
      departure.textContent = "NOW";
      arrivalBox.classList.add("hidden");
    }

    const mapImg = this.container.querySelector("#travel-map-img");
    const mapContainer = this.container.querySelector("#travel-map-container");

    if (data.api_key && data.polyline) {
      // On encode l'INTÉGRALITÉ de la valeur du paramètre path pour protéger les caractères
      // spéciaux de la polyline (comme le backslash \ ou le pipe | interne).
      const pathValue = `color:0x00d2ff|weight:5|enc:${data.polyline}`;
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&scale=2&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20|invert_lightness:true&path=${encodeURIComponent(pathValue)}&markers=color:blue|label:S|${encodeURIComponent(data.origin)}&markers=color:red|label:D|${encodeURIComponent(data.destination)}&key=${data.api_key}`;

      console.debug("[TRAVEL] URL Carte (Directions API):", mapUrl);
      mapImg.src = mapUrl;
      mapImg.onload = () => {
        mapImg.classList.remove("hidden");
        mapContainer.classList.remove("empty");
      };
    }

    this.widget.classList.remove("hidden", "fade-out");
    this.widget.classList.add("slide-in");
    this.isVisible = true;

    console.log("[TRAVEL] Widget affiché (isVisible=true)");
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false; // Fermeture logique immédiate
    this.widget.classList.add("fade-out");
    setTimeout(() => {
      this.widget.classList.add("hidden");
      this.widget.classList.remove("fade-out", "slide-in");
    }, 400);
  }
}
