# Inventaire Complet des Fonctions - J.A.R.V.I.S.

Ce document liste de manière exhaustive toutes les classes et fonctions détectées dans le projet **JarvisDecoupe**.

## 🐍 Modules Python

### `main.py`

- `on_system_start` : Log l'événement de démarrage primitif.
- `on_api_started` : Log l'URL de l'API et ouvre le navigateur.
- `on_client_connected` : Log l'IP du client connecté.
- `run_api_server` : Lance le serveur FastAPI via `uvicorn`.
- `setup_modules` : Initialise `Brain`, `TTS`, `STT` et `EspSphere`.
- `start_whatsapp_bridge` : Lance le bridge Node.js avec gestion des ports.
- `stream_logs` : Redirige la sortie du bridge vers les logs globaux.
- `main` : Point d'entrée asynchrone orchestrant tout le démarrage.

### `core/event_bus.py`

- `EventBus.subscribe` : Abonne une coroutine à un topic.
- `EventBus.unsubscribe` : Désabonne une fonction.
- `EventBus.emit` : Diffuse un événement à tous les abonnés.

### `modules/audio/stt.py`

- `SpeechToText._vad_filter` : Filtre WebRTC pour détecter la voix.
- `SpeechToText._callback` : Traitement de l'audio capté via Faster-Whisper.
- `SpeechToText.start` / `stop` : Gestion du flux audio micro.

### `modules/brain/gemini.py`

- `Brain.start` : Signature des outils et démarrage de l'instance.
- `Brain.process_text` : Envoie une requête au modèle LLM.

### `modules/memory/manager.py`

- `remember_fact` : Stockage persistant d'une donnée.
- `store_message` : Archivage des échanges.
- `get_recent_history` : Récupération du contexte récent.

### `modules/services/gmail.py`

- `get_unread_emails_summary` : Synthèse vocale des nouveaux messages.
- `mark_email_as_read` : Archivage rapide par voix.

### `modules/system/windows.py`

- `find_and_launch_app` : Recherche floue d'applications.
- `close_application` : Fermeture par titre ou PID.
- `manage_window_state` : Minimiser/Maximiser/Restaurer.
- `move_window_to_screen` : Positionnement multi-écrans.

_(Note : De nombreuses autres fonctions utilitaires sont présentes dans le code source pour la gestion d'erreurs et le parsing de données)._

---

## 📜 Frontend JavaScript (React/Vanilla)

### `web/src/app.js`

- `initAudio` : Initialise le contexte audio pour l'Orb.
- `createStream` : Gère le flux WebSocket pour les animations.
- `update` : Boucle de rendu principale du HUD.

### `web/src/components/`

- **`PrinterWidget.js`** : `update()`, `show()`, `hide()`.
- **`Settings.js`** : `loadSettings()`, `saveSettings()`, `switchTab()`.
- **`Chat.js`** : `sendMessage()`, `addMessage()`.
- **`VisionWidget.js`** : `show()`, `hide()` (contrôle de la webcam).

### `web/src/services/websocket.js`

- `connect()` : Établit la liaison avec le backend.
- `handleMessage()` : Route les messages entrants vers les composants.
- `send()` : Envoie des commandes ou messages au format JSON.
