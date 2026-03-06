import { store } from "./state.js";

/**
 * AudioAnalyzer - Capture le flux micro et calcule le niveau audio (RMS)
 * pour animer le Particle Core en temps réel.
 */
class AudioAnalyzer {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.stream = null;
    this.isActive = false;
  }

  async start() {
    if (this.isActive) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const source = this.audioContext.createMediaStreamSource(this.stream);

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.isActive = true;
      this._tick();
      console.log("[AUDIO] Analyseur démarré.");
    } catch (err) {
      console.error(
        "[AUDIO] Impossible d'accéder au micro pour l'analyse visuelle:",
        err,
      );
    }
  }

  _tick() {
    if (!this.isActive) return;

    this.analyser.getByteTimeDomainData(this.dataArray);

    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const v = (this.dataArray[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this.dataArray.length);

    // Mise à jour du niveau sonore
    store.setState({ audioLevel: rms });

    // --- LOGIQUE DE TRANSITION D'ÉTAT LOCALE ---
    // Si on détecte un volume signifiant (> 0.05)
    // On passe en "listening" si on n'est pas déjà en train de "penser" ou "parler"
    const currentStatus = store.state.orbStatus;

    if (rms > 0.05) {
      if (currentStatus === "idle") {
        store.setState({ orbStatus: "listening" });
      }
      this.silenceCounter = 0; // Reset silence si bruit
    } else {
      // Si silence prolongé (~1s à 60fps = 60 ticks)
      if (currentStatus === "listening") {
        this.silenceCounter = (this.silenceCounter || 0) + 1;
        if (this.silenceCounter > 60) {
          store.setState({ orbStatus: "idle" });
          this.silenceCounter = 0;
        }
      }
    }

    requestAnimationFrame(() => this._tick());
  }

  stop() {
    this.isActive = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export const audioAnalyzer = new AudioAnalyzer();
