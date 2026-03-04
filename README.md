# J.A.R.V.I.S. (Just A Rather Very Intelligent System)

## Présentation du Projet

J.A.R.V.I.S. est un assistant personnel intelligent et local, conçu pour s'intégrer profondément au système d'exploitation Windows et à l'environnement domotique. Il est doté d'une interface homme-machine (voix) et d'une WebUI "Glassmorphism" réactive.

Le cœur de J.A.R.V.I.S. est propulsé par **Gemini 2.5 Flash** (via `google-genai`), lui offrant des capacités de compréhension, de raisonnement et de déclenchement d'outils systèmes complexes.

---

## 🛠️ Fonctionnalités Implémentées (Actuellement Actives)

### 1. 🧠 Cerveau Cognitif (Gemini Flash)

- **Modèle :** `gemini-2.5-flash` intégré via le dernier SDK Google GenAI.
- **Tools Calling :** Capacité autonome de choisir et d'exécuter des scripts Python locaux en fonction de la demande de l'utilisateur.
- **Mémoire Contextuelle :** J.A.R.V.I.S. retient l'historique de la conversation active pour des requêtes multi-tours.

### 2. 🗣️ Interface Vocale (STT & TTS)

- **Recherche Vocale Continue (STT) :** Écoute passive via le microphone, calibrage automatique du bruit ambiant (via `SpeechRecognition`).
- **Voix de Synthèse (TTS) :** Réponse vocale générée localement sans latence de bout en bout (via `pyttsx3`).
- **Event-Driven :** Le micro se coupe intelligemment pendant que J.A.R.V.I.S. parle pour éviter qu'il ne s'écoute lui-même.

### 3. 🌐 Interface Web (WebUI)

- **Serveur FastAPI :** Déploiement d'un backend léger et rapide sur le port local `8000`.
- **WebSocket Temps Réel :** Les logs systèmes, la réflexion de l'IA (Orb), et la transcription vocale sont envoyés en live au navigateur Web.
- **Design "Iron Man" :** Thème sombre dynamique avec un orbe interactif réagissant aux états (Écoute, Réflexion, Parole).

### 4. 💻 Contrôle de l'OS Intégral (Smart Window Manager)

- **Détection & Lancement Autonome :** Capacité de trouver et d'ouvrir des logiciels localement sans chemin prédéfini via le shell Windows.
- **Gestion des Fenêtres :** J.A.R.V.I.S. peut fermer (kill/WM_CLOSE), réduire, agrandir ou restaurer n'importe quelle fenêtre existante à la voix.
- **Support Multi-Écrans :** Téléportation algorithmique d'une application d'un moniteur à un autre ("Déplace Spotify sur l'écran 2").
- **Statut Système :** Lecture de l'heure locale, du niveau de batterie et statistiques de la machine.
- **Exploration Fichiers :** Lecture et écriture de fichiers textes sur le disque.

### 5. 🔍 Recherche Web Augmentée (Tavily API)

- **Moteur d'Intelligence Artificielle (Tavily) :** Remplacement des moteurs de recherche classiques par Tavily. J.A.R.V.I.S. lit le contenu des pages pour une compréhension type "Perplexity".
- **Tuiles Graphiques :** Affichage d'une Pop-up visuelle sur la WebUI avec les sources, résumés et **miniatures** des articles trouvés.
- **Ouverture Vocale :** L'utilisateur peut regarder les tuiles générées (ex: 5 résultats) et demander à la voix "Ouvre le numéro 3". L'IA ouvre le site ciblé et referme la pop-up visuellement.

---

## 🚀 Prochaines Étapes (Feuille de Route)

### Phase 5 : Services et Vision (En cours)

- [ ] **Home Assistant :** Connecter l'API domotique pour allumer/éteindre les lumières, gérer les prises connectées ou interroger les capteurs de la maison.
- [ ] **API Externes :** Intégration de la lecture de mails, de calendriers, ou d'envois de messages.
- [ ] **Vision par Ordinateur :** Intégration d'OpenCV pour permettre à J.A.R.V.I.S. d'utiliser la webcam (lecture de QRCode, détection de présence).

---

_Document mis à jour de manière autonome par J.A.R.V.I.S. au fur et à mesure de son évolution._
