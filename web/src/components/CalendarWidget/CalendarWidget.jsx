import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./CalendarWidget.css";

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

export const CalendarWidget = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (state.calendarInfo) {
        setData(state.calendarInfo);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsub();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    store.setState({ calendarInfo: null });
  };

  if (!isVisible || !data) return null;

  const typeInfo = typeMap[data.type] || typeMap["create"];
  const start = new Date(data.start);
  const timeFormatted = start.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="calendar-widget glass visible">
      <div className="calendar-widget__header">
        <div className="calendar-icon" id="cal-icon">
          📅
        </div>
        <span className="calendar-title" id="cal-title">
          {typeInfo.title}
        </span>
      </div>
      <div className="calendar-widget__content">
        <div className="calendar-event-info">
          <div
            className="event-action-tag"
            id="cal-type"
            style={{ color: typeInfo.color, borderColor: typeInfo.color }}
          >
            {typeInfo.label}
          </div>
          <div className="event-label">ÉVÉNEMENT</div>
          <div className="event-value" id="cal-summary">
            {data.summary || "Sans titre"}
          </div>
          <div className="event-label">HORAIRES</div>
          <div className="event-value" id="cal-time">
            {timeFormatted}
          </div>
        </div>
      </div>
      <div className="calendar-widget__footer">
        <button
          className="cal-btn cancel"
          id="cal-cancel"
          onClick={handleClose}
        >
          ANNULER
        </button>
        <button
          className="cal-btn confirm"
          id="cal-confirm"
          onClick={handleClose}
        >
          CONFIRMER
        </button>
      </div>
    </div>
  );
};
