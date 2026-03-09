# Architecture et Inventaire des Fonctions - J.A.R.V.I.S.

Ce document présente une vue d'ensemble technique du projet **JarvisDecoupe**, incluant l'architecture globale, le flux de données et un inventaire détaillé de chaque fonction et classe présente dans le code.

---

## 🏗️ Architecture Globale

Le projet est structuré en trois couches principales :

1.  **Core (Noyau)** : Gère la logique centrale, le bus d'événements asynchrone, la configuration et le logging.
2.  **Modules** : Composants fonctionnels indépendants (Cerveau, Audio, Mémoire, Services tiers comme Gmail/Calendar/Météo/Imprimantes 3D).
3.  **Interface (Web)** : Un HUD (Heads-Up Display) moderne en JavaScript/CSS communiquant via WebSocket avec le serveur FastAPI.

---

## 📂 Inventaire des Fonctions par Module

### 🚀 Point d'Entrée Central (`main.py`)

- `run_api_server` : Lance le serveur FastAPI de l'interface.
- `setup_modules` : Initialise et connecte les modules (Gemini, TTS, STT).
- `start_whatsapp_bridge` : Gère le cycle de vie du processus Node.js pour WhatsApp.
- `main` : Orchestre le démarrage complet de l'assistant.

### 🧠 Cerveau & Intelligence (`modules/brain/`)

- **`Brain` (Gemini)** : Point central de traitement NLU utilisant l'API Gemini.
- **`ProactiveBrain`** : Gère les interactions initiées par JARVIS (sans commande utilisateur).
- `get_system_instruction` : Assemble le prompt système dynamique avec le contexte mémoire.

### 🔈 Audio & Voix (`modules/audio/`)

- **`SpeechToText` (STT)** : Utilise `Faster-Whisper` pour transformer la voix en texte.
  - `_vad_filter` : Détecte la présence de voix pour optimiser le traitement.
  - `start`/`stop` : Contrôle de l'écoute micro.
- **`TextToSpeech` (TTS)** : Synthèse vocale pour les réponses de JARVIS.

### 💾 Mémoire & Contexte (`modules/memory/`)

- **`MemoryManager`** : Interface haut niveau SQL + Vectoriel.
  - `remember_fact` : Mémorise une info structurée.
  - `store_message` : Sauvegarde l'historique de conversation.
- **`VectorMemory` (ChromaDB)** : Recherche sémantique pour les souvenirs à long terme.
- **`ContextBuffer`** : Garde en mémoire les 10 dernières actions pour la proactivité.

### 🛠️ Services & Intégrations (`modules/services/`)

- **`GoogleCalendarService`** : CRUD sur l'agenda Google.
- **`GoogleMailService`** : Lecture et résumé d'emails non lus.
- **`HomeAssistantService`** : Contrôle domotique (lumières, entités).
- **`MapsService`** : Calcul d'itinéraires et temps de trajet.
- **`VisionService`** : Analyse d'images via webcam et détection de présence locale.
- **Imprimantes 3D** :
  - `BambuClient` : Client MQTT pour les imprimantes Bambu Lab.
  - `MoonrakerClient` : API HTTP pour Klipper (VZBot).

### 🖥️ Système Windows (`modules/system/`)

- `find_and_launch_app` : Lanceur d'applications intelligent.
- `close_application` : Fermeture propre de fenêtres.
- `manage_window_state` : Minimiser/Maximiser.
- `move_window_to_screen` : Gestion multi-écrans.
- `analyze_screen` : Capture d'écran pour analyse visuelle.
- `interactive_web_search` : Recherche Google avec affichage de résultats dans le HUD.

### 🌐 Interface Utilisateur (`web/src/`)

- **`app.js`** : Orchestrateur frontend du HUD.
- **Composants (Widgets)** :
  - `PrinterWidget` : Affichage temps réel de l'impression 3D.
  - `VisionWidget` : Retour vidéo et analyse de la caméra.
  - `TravelWidget` : Affichage des cartes et trajets Maps.
  - `CalendarWidget` / `EmailWidget` : Visualisation Proactive.
- **Services Frontend** :
  - `WebSocketService` : Communication bidirectionnelle avec le backend.
  - `AudioAnalyzer` : Visualisation de l'onde vocale (Orb).

---

## 🛠️ Checklist de Maintenance

- [ ] Vérifier la cohérence des docstrings sur les nouvelles fonctions.
- [ ] S'assurer que chaque service tiers a un fallback si l'API est indisponible.
- [ ] Maintenir ce document à jour lors de l'ajout de nouveaux modules.
