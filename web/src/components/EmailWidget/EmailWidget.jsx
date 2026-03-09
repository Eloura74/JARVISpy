import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./EmailWidget.css";

export const EmailWidget = () => {
  const [emails, setEmails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (state.emailData && Array.isArray(state.emailData)) {
        setEmails(state.emailData);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsub();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    store.setState({ emailData: null });
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return dateStr;
    }
  };

  if (!isVisible || !emails) return null;

  return (
    <div className="email-widget glass visible">
      <div className="email-widget__header">
        <div className="email-icon">✉️</div>
        <span className="email-title">COURRIERS RÉCENTS</span>
        <button
          className="email-close"
          id="email-close-btn"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      <div className="email-widget__list" id="email-list">
        {emails.map((email, idx) => (
          <div key={idx} className="email-item">
            <div className="email-item__top">
              <span className="email-sender">{email.from}</span>
              <span className="email-date">{formatDate(email.date)}</span>
            </div>
            <div className="email-subject">{email.subject}</div>
          </div>
        ))}
      </div>
      <div className="email-widget__footer">
        <span className="email-status">SOURCE : GMAIL PRIMARY</span>
      </div>
    </div>
  );
};
