import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./PrinterWidget.css";

export const PrinterWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      const printerData = state.printData?.moonraker || state.printData?.bambu;
      if (printerData) {
        setData(printerData);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsub();
  }, []);

  if (!isVisible || !data) return null;

  const isMoonraker = data.type === "moonraker";
  const printerName = isMoonraker ? "VZBOT STATS" : "BAMBU STATS";
  const filename = data.fichier || data.fichier_en_cours || "Inconnu";
  const progress = data["avancement_%"] || 0;

  const ext = data.extrudeur || data["extrudeur_°C"] || {};
  const bed = data.plateau || data["plateau_°C"] || {};
  const extActual = ext.actuel || 0;
  const extTarget = ext.cible || 0;
  const bedActual = bed.actuel || 0;
  const bedTarget = bed.cible || 0;

  const status = (data.état || "IDLE").toUpperCase();
  const statusClass = (data.état || "idle").toLowerCase();

  return (
    <div
      className="printer-widget glass margin-left-10px margin-right-10px"
      style={{
        animation: "slideInLeft 0.4s ease-out forwards",
      }}
    >
      <div className="card-header">
        <span className="printer-icon">Imprimante</span>{" "}
        <span className="printer-name">{printerName}</span>
      </div>
      <div className="card-body">
        <div className="print-info">
          <div className="print-file-name" id="p-filename">
            {filename}
          </div>
          <div className="print-progress-container">
            <div
              className="print-progress-bar"
              id="p-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="print-progress-text" id="p-progress-text">
              {progress}%
            </span>
          </div>
        </div>
        <div className="print-metrics">
          <div className="p-metric">
            <span className="label">EXTRUDEUR</span>
            <span className="val" id="p-temp-ext">
              {extActual}°C / {extTarget}°C
            </span>
          </div>
          <div className="p-metric">
            <span className="label">PLATEAU</span>
            <span className="val" id="p-temp-bed">
              {bedActual}°C / {bedTarget}°C
            </span>
          </div>
        </div>
        <div
          className={`print-status-label state-${statusClass}`}
          id="p-status"
        >
          {status}
        </div>
      </div>
    </div>
  );
};
