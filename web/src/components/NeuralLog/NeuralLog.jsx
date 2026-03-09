import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./NeuralLog.css"; // Ensure CSS is imported

export const NeuralLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (state.lastNeuralLog) {
        setLogs((prevLogs) => {
          // On évite les doublons consécutifs très rapides si l'objet de log est le même
          if (
            prevLogs.length > 0 &&
            prevLogs[0].query === state.lastNeuralLog.query &&
            prevLogs[0].memories === state.lastNeuralLog.memories
          ) {
            return prevLogs;
          }

          const newLogs = [state.lastNeuralLog, ...prevLogs];
          // On garde les 3 derniers
          return newLogs.slice(0, 3);
        });
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="neural-log glass">
      <div className="card-header">
        <span className="pulse-icon"></span> COGNITIVE FEEDBACK
      </div>
      <div className="card-body">
        <div className="neural-log-list hide-scroll">
          {logs.length === 0 ? (
            <div className="empty-log">EN ATTENTE D'ACTIVITÉ COGNITIVE...</div>
          ) : (
            logs.map((log, index) => (
              <div
                key={`${log.query}-${index}`}
                className="neural-log-item"
                style={{
                  animation: "fadeInBlur 0.4s ease-out forwards",
                }}
              >
                <div className="query-trigger">
                  CONTEXT SEARCH: "{log.query}"
                </div>
                <div className="memory-results">
                  {log.memories &&
                    log.memories.map((m, i) => (
                      <div key={i} className="memory-fragment">
                        <span className="memory-icon">◈</span> {m.content}
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
