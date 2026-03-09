import React, { useEffect, useState, useRef } from "react";
import { store } from "../../services/state.js";
import { decryptText } from "../../utils/textEffect.js";

export const Status = () => {
  const [connection, setConnection] = useState("OFFLINE");
  const [brainStatus, setBrainStatus] = useState("IDLE");
  const [ttsStatus, setTtsStatus] = useState("INACTIVE");
  const [orbStatus, setOrbStatus] = useState("idle");
  const logoRef = useRef(null);

  useEffect(() => {
    // Effet initial sur le logo
    if (logoRef.current) {
      decryptText(logoRef.current, "J.A.R.V.I.S. 0.3", 1200);
    }

    // Abonnement au store global
    const unsub = store.subscribe((state) => {
      setConnection(state.connection || "OFFLINE");
      setBrainStatus(state.brainStatus || "IDLE");
      setTtsStatus(state.ttsStatus || "INACTIVE");
      setOrbStatus(state.orbStatus || "idle");
    });

    return () => unsub();
  }, []);

  return (
    <div className="status-bar glass">
      <div className="status-logo">
        <div className="mini-reactor"></div>
        <span className="logo-text" id="main-logo" ref={logoRef}>
          J.A.R.V.I.S. <span className="v">0.3</span>
        </span>
      </div>

      <div className="status-items">
        <div className="status-item" id="stat-conn">
          <span className={`val ${connection.toLowerCase()}`}>
            {connection.toUpperCase()}
          </span>
          <span className="label">UPLINK</span>
        </div>
        <div className="status-item" id="stat-brain">
          <span className={`val ${orbStatus}`}>
            {brainStatus.toUpperCase()}
          </span>
          <span className="label">NEURAL NET</span>
        </div>
        <div className="status-item" id="stat-tts">
          <span className={`val ${ttsStatus === "Actif" ? "active" : ""}`}>
            {ttsStatus.toUpperCase()}
          </span>
          <span className="label">VOCAL LINK</span>
        </div>
      </div>
    </div>
  );
};
