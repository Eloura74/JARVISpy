import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./DoorSensorWidget.css";

export const DoorSensorWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (state.doorData && state.doorData.sensors) {
        setData(state.doorData);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsub();
  }, []);

  const baseUrl = import.meta.env.BASE_URL || "/";

  if (!isVisible || !data) return null;

  return (
    <div
      className="door-sensor-widget glass margin-left-10px margin-right-10px"
      style={{
        animation: "slideInLeft 0.4s ease-out forwards",
      }}
    >
      <div className="card-header">
        <span className="door-icon">SÉCURITÉ</span>{" "}
        <span className="door-title">SYSTÈME DE SURVEILLANCE</span>
      </div>
      <div className="card-body">
        {data.sensors.map((sensor) => (
          <div key={sensor.id} className={`sensor-item state-${sensor.type}`}>
            <div className="sensor-visual">
              <img
                src={`${baseUrl}assets/${sensor.type === "secure" ? "door_closed.png" : "door_open.png"}`}
                alt={sensor.name}
                className="sensor-image"
              />
            </div>
            <div className="sensor-info">
              <div className="sensor-label">CAPTEUR : {sensor.name}</div>
              <div className="sensor-status">ÉTAT : {sensor.status}</div>
              {sensor.type === "secure" && (
                <div className="security-meter">
                  <div className="meter-label">SÉCURITÉ</div>
                  <div className="meter-bar">
                    <div className="meter-fill" style={{ width: "85%" }}></div>
                  </div>
                </div>
              )}
              {sensor.type === "alert" && (
                <div className="alert-icon-container">
                  <div className="alert-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
