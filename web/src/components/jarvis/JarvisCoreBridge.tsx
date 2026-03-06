import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "../../services/state.js";
import { audioAnalyzer } from "../../services/audioAnalyzer.js";
import { JarvisCore } from "./JarvisCore";
import { JarvisMode } from "./jarvisCoreConfig";

/**
 * JarvisCoreBridge - Le pont entre l'architecture Vanilla JS et le composant React Three.js.
 * Il s'abonne au store et re-rend le composant React quand l'état change.
 */
export class JarvisCoreBridge {
  private container: HTMLElement;
  private root: any; // Rapidité: avoid strict type root for now
  private currentOrbStatus: JarvisMode;
  private currentAudioLevel: number;

  constructor(elementId: string) {
    this.container = document.getElementById(elementId) as HTMLElement;

    this.root = createRoot(this.container);
    this.currentOrbStatus = store.state.orbStatus as JarvisMode;
    this.currentAudioLevel = 0;

    this.init();
  }

  init() {
    // Premier rendu
    this.render();

    // Abonnement aux changements d'état
    store.subscribe((state) => {
      let needsUpdate = false;

      if (state.orbStatus !== this.currentOrbStatus) {
        this.currentOrbStatus = state.orbStatus as JarvisMode;
        needsUpdate = true;
      }

      // On récupère le niveau audio depuis le store (mis à jour par AudioAnalyzer)
      if (state.audioLevel !== this.currentAudioLevel) {
        this.currentAudioLevel = state.audioLevel;
        needsUpdate = true;
      }

      if (needsUpdate) {
        this.render();
      }
    });

    // Démarrer l'analyseur audio au premier rendu (nécessite une interaction utilisateur ou peut être lancé ici)
    // Note: Chrome bloque parfois l'AudioContext sans interaction.
    // On le lancera au premier "click" sur la page si besoin dans app.js.
  }

  render() {
    this.root.render(
      <JarvisCore
        mode={this.currentOrbStatus}
        audioLevel={this.currentAudioLevel}
        size={540}
      />,
    );
  }
}
