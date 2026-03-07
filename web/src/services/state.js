/**
 * State.js - Gestionnaire d'état réactif ultra-léger
 */

class StateStore {
  constructor() {
    this.state = {
      connection: "offline", // offline, connecting, online
      orbStatus: "idle", // idle, listening, thinking, speaking
      brainStatus: "En veille",
      ttsStatus: "Inactif",
      lastUserMessage: "",
      lastJarvisMessage: "",
      lastNeuralLog: null, // { query, memories: [] }
      calendarInfo: null, // { summary, start, link, type: 'create'|'update'|'delete' }
      travelInfo: null,
      activeTab: "general",
      webSearchResults: null, // { query, results: [] }
      printData: {
        bambu: null,
        moonraker: null,
      },
      audioLevel: 0, // 0.0 à 1.0 (RMS)
    };

    this.listeners = new Set();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const store = new StateStore();
