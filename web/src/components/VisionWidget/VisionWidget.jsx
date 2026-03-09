import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./VisionWidget.css";

export const VisionWidget = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (state.visionData && state.visionData.data) {
        setData(state.visionData);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsub();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    store.setState({ visionData: null });
  };

  if (!isVisible || !data) return null;

  return (
    <div className="vision-widget glass visible">
      <div className="vision-widget__header">
        <div className="vision-icon">👁️</div>
        <span className="vision-title">VISION SYSTÈME</span>
        <button
          className="vision-close"
          id="vision-close-btn"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      <div className="vision-widget__content">
        <img
          id="vision-image"
          src={`data:${data.mime_type};base64,${data.data}`}
          alt="Analyse JARVIS"
        />
      </div>
      <div className="vision-widget__footer">
        <span className="vision-status">ANALYSE EN COURS...</span>
      </div>
    </div>
  );
};
