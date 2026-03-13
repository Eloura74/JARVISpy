import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./TravelWidget.css";

export const TravelWidget = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // La fermeture est dictée par App.jsx qui met travelInfo à null dans le state
    const unsub = store.subscribe((state) => {
      if (state.travelInfo) {
        setData(state.travelInfo);
        setIsVisible(true);
        setIsClosing(false);
      } else {
        if (isVisible && !isClosing) {
          handleClose();
        }
      }
    });
    return () => unsub();
  }, [isVisible, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      // Optionnel: Nettoyer le store pour éviter une réouverture
      if (store.getState().travelInfo) {
        store.setState({ travelInfo: null });
      }
    }, 400); // Durée de l'animation
  };

  if (!isVisible || !data) return null;

  const basePathUrl =
    data.api_key && data.polyline
      ? `https://maps.googleapis.com/maps/api/staticmap?size=600x300&scale=2&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20|invert_lightness:true&path=${encodeURIComponent(`color:0x00d2ff|weight:5|enc:${data.polyline}`)}&markers=color:blue|label:S|${encodeURIComponent(data.origin)}&markers=color:red|label:D|${encodeURIComponent(data.destination)}&key=${data.api_key}`
      : null;

  return (
    <div
      id="travel-widget"
      className={`travel-widget glass-panel ${isClosing ? "fade-out" : "slide-in"}`}
    >
      <div className="widget-header">
        <div className="location-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div className="header-text">
          <span className="label">TRANSIT INTELLIGENCE</span>
          <h3 id="travel-destination">{data.destination}</h3>
        </div>
        <button id="close-travel" className="close-btn" onClick={handleClose}>
          ✕
        </button>
      </div>

      <div className="widget-body">
        <div
          id="travel-map-container"
          className={`map-container ${!basePathUrl ? "empty" : ""}`}
        >
          {basePathUrl ? (
            <img id="travel-map-img" src={basePathUrl} alt="Carte Trajet" />
          ) : (
            <div className="map-placeholder">
              ITINÉRAIRE SANS CARTE RÉTROCÉDÉ...
            </div>
          )}
        </div>

        <div className="travel-stats">
          <div className="stat">
            <span className="s-label">DURÉE (TRAFIC)</span>
            <span id="travel-duration" className="s-value">
              {data.duration}
            </span>
          </div>
          <div className="stat highlight">
            <span className="s-label">DÉPART CONSEILLÉ</span>
            <span id="travel-departure" className="s-value">
              {data.suggested_departure ? data.suggested_departure : "NOW"}
            </span>
          </div>
        </div>

        {data.suggested_departure && (
          <div id="travel-arrival-box" className="arrival-target">
            Cible :{" "}
            <span id="travel-arrival-target">{data.arrival_target}</span>
          </div>
        )}

        <div className="route-info">
          <span className="dist" id="travel-distance">
            {data.distance}
          </span>
          <span className="via" id="travel-origin">
            Depuis: {data.origin}
          </span>
        </div>

        {data.alternatives && data.alternatives.length > 0 && (
          <div className="alternatives-section">
            <div className="alternatives-header">ITINÉRAIRES ALTERNATIFS</div>
            {data.alternatives.map((alt, idx) => (
              <div key={idx} className="alternative-route">
                <span className="alt-number">Route {alt.route_number}</span>
                <span className="alt-duration">{alt.duration}</span>
                <span className="alt-via">{alt.via}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="widget-footer">
        <div className="live-indicator">
          <span className="dot pulse"></span> LIVE TRAFFIC
        </div>
      </div>
    </div>
  );
};
