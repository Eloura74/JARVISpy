import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import "./WebSearch.css";

export const WebSearch = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      setData(state.webSearchResults || null);
    });
    return () => unsub();
  }, []);

  if (!data) return null;

  const { query, results } = data;

  return (
    <div className="web-search-modal glass-modal">
      <div className="web-search-content glass">
        <div className="web-search-header">
          <div className="status-dot"></div>
          <h2>
            RECHERCHE WEB <span className="query-text">"{query}"</span>
          </h2>
        </div>
        <div className="web-search-body hide-scroll">
          <div className="web-results-grid">
            {results.map((r, idx) => (
              <div key={idx} className="web-result-card glass">
                <div className="web-result-id">{r.id}</div>
                <div className="web-result-content">
                  <h3 className="web-result-title">{r.title}</h3>
                  <p className="web-result-snippet">{r.snippet}</p>
                  <div className="web-result-url">{r.url}</div>
                </div>
                {r.image ? (
                  <div
                    className="web-result-image"
                    style={{ backgroundImage: `url('${r.image}')` }}
                  ></div>
                ) : (
                  <div className="web-result-image-placeholder">N/A</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="web-search-footer">
          <span className="pulsing-text">
            EN ATTENTE DE SÉLECTION VOCALE...
          </span>
        </div>
      </div>
    </div>
  );
};
