# Changelog - J.A.R.V.I.S.

Toutes les modifications notables du projet sont documentées dans ce fichier.

---

## [0.2.1] - 2026-03-13

### 🎨 UI/UX - Optimisation Espacement

#### Compatibilité Cross-Browser (Opera, Chrome, Firefox, Safari)

- **Préfixes vendor** : Ajout de `-webkit-`, `-moz-`, `-o-` pour `backdrop-filter`
  - Garantit rendu identique sur tous les navigateurs
  - Fallback `background-color` pour navigateurs anciens
- **Normalisation CSS** :
  - `box-sizing: border-box` sur layout et status-bar
  - `flex-shrink: 0` pour éviter compression du titre
  - `white-space: nowrap` pour titre non coupé
  - Font-smoothing antialiased pour rendu texte uniforme
- **Correction titre coupé** :
  - Status-bar : `min-height: 50px` + `padding: 12px`
  - Grid rows : `minmax(50px, auto)` pour hauteur garantie

#### Refonte Complète des Borders & Padding

- **Layout optimisé** : Réduction des gaps et padding pour interface plus compacte
  - Grid gap : 25px → 12px (52% de réduction)
  - Padding global : 15px → 8px
  - Colonnes latérales : 360px → 380px (plus d'espace utile)
- **Panneaux glass** : Padding unifié à 10px
  - Border-radius : 4px → 6px (coins plus doux)
  - Box-shadow allégée pour rendu plus subtil
- **Composants optimisés** :
  - Terminal : padding 12px → 8px, font-size 0.85rem → 0.82rem
  - Chat : gaps 15px → 10px, padding messages 12px → 10px
  - NeuralLog : gaps 15px → 10px, padding fragments 6px → 5px
- **Résultat** : +15% d'espace utile, interface plus dense et professionnelle

### �� Audio & Voix

#### Optimisation TTS - Élimination des Pauses Étranges

- **Buffer intelligent** : Regroupement des fragments courts avant synthèse vocale
  - Évite les micro-pauses entre fragments de phrases
  - Conditions de flush optimisées (longueur, ponctuation, timeout)
  - Fluidité vocale grandement améliorée
- **Filtrage Gemini** : Envoi uniquement des phrases > 15 caractères
  - Suppression du découpage sur `\n` (trop agressif)
  - Conservation uniquement de la ponctuation forte (. ! ?)

---

## [0.2.0] - 2026-03-13

### 🚀 Améliorations Majeures

#### Migration vers Gemini 3.1 Flash-Lite Preview

- **Modèle IA** : Migration de `gemini-2.5-flash` vers `gemini-3.1-flash-lite-preview`
  - Modèle le plus économique et rapide de Google
  - Idéal pour usage personnel (free tier)
  - Latence ultra-faible pour les tâches agentiques
  - Support complet : function calling, streaming, multimodal
  - Limite : 1M tokens d'entrée, 65k tokens de sortie

### 🔒 Sécurité

#### CORS Sécurisé

- **Restriction des origines** : CORS limité aux origines locales uniquement
  - `http://localhost:8000`, `http://127.0.0.1:8000`
  - `http://localhost:5173`, `http://127.0.0.1:5173` (Vite dev)
  - Suppression du wildcard `*` dangereux

#### Vérification SSL Activée

- **Home Assistant** : Activation de la vérification SSL (`verify=True`)
  - Protection contre les attaques man-in-the-middle
  - Commentaires ajoutés pour gérer les certificats auto-signés

### 🐛 Corrections de Bugs

#### Code Dupliqué

- **gemini.py** : Suppression du bloc `try/except TimeoutError` dupliqué (lignes 138-151)
- **tts.py** : Suppression de l'import dupliqué `from typing import Dict, Any`

#### Dépendances

- **requirements.txt** : Fixation des versions
  - `loguru==0.7.2` (était sans version)
  - Ajout de `tavily-python==0.5.0` (mentionné dans README)
  - Suppression de `duckduckgo-search` (remplacé par Tavily)

### ⚡ Optimisations Performance

#### Base de Données SQLite

- **Index ajoutés** :
  - `idx_conversations_timestamp` : Optimise `get_recent_history()` (ORDER BY timestamp DESC)
  - `idx_facts_key` : Optimise les recherches par clé dans la table facts
- **Méthode VACUUM** : Ajout de `optimize_database()` pour récupérer l'espace disque
  - Appelable périodiquement au démarrage
  - Reconstruit les index pour de meilleures performances

### 📝 Documentation

#### Nouveaux Fichiers

- **CHANGELOG.md** : Ce fichier - historique des modifications
- **Commentaires améliorés** : Clarification des choix techniques dans le code

---

## [0.1.0] - 2026-03-01

### Fonctionnalités Initiales

#### Cerveau IA

- Intégration Gemini 2.5 Flash avec function calling
- Mémoire hybride (SQLite + ChromaDB pour RAG)
- Context buffer pour proactivité

#### Audio

- STT : Faster-Whisper + WebRTC VAD
- TTS : Kokoro-ONNX (voix neuronale locale)
- Gestion intelligente micro/enceintes (évite auto-écoute)

#### Contrôle Système

- Gestion fenêtres Windows (multi-écrans, fuzzy matching)
- Lancement d'applications intelligent
- Lecture/écriture fichiers sécurisée

#### Intégrations

- Home Assistant (domotique)
- Gmail (lecture emails)
- Google Calendar (gestion agenda)
- Google Maps (itinéraires)
- Météo (OpenWeather)
- Imprimantes 3D (Moonraker + Bambu Lab)

#### Interface

- WebUI React + Three.js
- WebSocket temps réel
- Design "Iron Man" avec orbe interactif

---

## Notes de Migration

### Pour mettre à jour depuis v0.1.0

1. **Installer les nouvelles dépendances** :

   ```bash
   pip install -r requirements.txt
   ```

2. **La base de données sera automatiquement migrée** au prochain démarrage :
   - Les index seront créés automatiquement
   - Aucune perte de données

3. **Vérifier la configuration Home Assistant** :
   - Si certificat auto-signé, définir `REQUESTS_CA_BUNDLE` ou `verify='/path/to/cert.pem'`
   - Ou désactiver temporairement SSL dans `homeassistant.py` (non recommandé)

4. **Le modèle Gemini 3.1 Flash-Lite** est compatible avec l'API existante :
   - Aucun changement de code nécessaire
   - Performances améliorées automatiquement

---

## Roadmap

### v0.3.0 (Prévu)

- [ ] Wake word (Porcupine) pour éviter écoute permanente
- [ ] Mode offline complet (fallback local si API indisponible)
- [ ] Dashboard admin (monitoring CPU/RAM/logs)
- [ ] Tests d'intégration end-to-end
- [ ] Couverture de tests > 80%

### v0.4.0 (Futur)

- [ ] Système de plugins pour outils custom
- [ ] Multi-utilisateurs avec profils séparés
- [ ] Voice cloning pour personnaliser TTS
- [ ] Support Linux/macOS

---

**Légende** :

- 🚀 Améliorations majeures
- 🔒 Sécurité
- 🐛 Corrections de bugs
- ⚡ Optimisations performance
- 📝 Documentation
