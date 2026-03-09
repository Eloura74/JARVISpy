import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Les styles sont injectés depuis l'index.html ou les composants directement.

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error(
    "Impossible de trouver la div #root pour attacher l'application React J.A.R.V.I.S.",
  );
}
