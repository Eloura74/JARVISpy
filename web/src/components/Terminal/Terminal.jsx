import React, { useEffect, useState, useRef } from "react";
import { decryptText } from "../../utils/textEffect.js";
import "./Terminal.css";

export const Terminal = () => {
  const [logs, setLogs] = useState([
    {
      text: "Initialisation du noyau visuel...",
      type: "system",
      id: "init",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const logsContainerRef = useRef(null);

  useEffect(() => {
    const handleLogEvent = (e) => {
      const { text, type } = e.detail;
      setLogs((prev) => {
        const newLogs = [
          ...prev,
          {
            text,
            type: type || "system",
            id: Date.now() + Math.random().toString(),
            time: new Date().toLocaleTimeString(),
          },
        ];
        return newLogs.slice(-100); // Ne garder que les 100 derniers
      });
    };

    window.addEventListener("terminal-log", handleLogEvent);
    return () => window.removeEventListener("terminal-log", handleLogEvent);
  }, []);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Hook Custom pour appliquer decryptText sur les nouveaux logs
  const LogLine = ({ log }) => {
    const spanRef = useRef(null);
    useEffect(() => {
      if (spanRef.current && !spanRef.current.dataset.decrypted) {
        decryptText(spanRef.current, log.text, 600);
        spanRef.current.dataset.decrypted = "true";
      }
    }, [log.text]);

    let color = "inherit";
    if (log.type === "info") color = "var(--primary)";
    if (log.type === "success") color = "var(--text-accent)";
    if (log.type === "error") color = "#ff4444";

    return (
      <div className={`log-line ${log.type}`}>
        <span
          className="log-time"
          style={{ color: "var(--text-dim)", marginRight: "8px" }}
        >
          [{log.time}]
        </span>
        <span className="log-msg" ref={spanRef} style={{ color }}>
          {/* Le texte sera injecté par decryptText */}
        </span>
      </div>
    );
  };

  return (
    <div className="terminal glass">
      <div className="glass-edge"></div>
      <div className="terminal-header">
        <span className="terminal-title">FLUX DE DONNÉES</span>
        <div className="terminal-controls">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
      </div>
      <div className="terminal-content" ref={logsContainerRef}>
        {logs.map((log) => (
          <LogLine key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
};
