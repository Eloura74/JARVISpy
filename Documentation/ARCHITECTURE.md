# ARCHITECTURE : Refonte Visuelle JARVIS

## 1. Vision

Transformer l'interface actuelle monolithique en une application web moderne, modulaire, fluide et haut de gamme.

## 2. Principes Fondamentaux

- **Modularité (SOLID)** : Chaque composant UI est isolé dans son propre dossier (JS/CSS). Aucun fichier ne doit dépasser 400 lignes.
- **Design System** : Utilisation de tokens de design pour la cohérence (couleurs HSL, espacements, flous).
- **Fluidité (60 FPS)** : Animations matérielles (transform/opacity), transitions douces et micro-interactions.
- **Performance** : Build optimisé via Vite.

## 3. Structure des fichiers (Cible)

```text
web/
├── src/
│   ├── components/       # Composants UI isolés
│   │   ├── Orb/          # Visualiseur central
│   │   ├── Terminal/     # Logs techniques
│   │   ├── Chat/         # Conversations
│   │   ├── Status/       # Barre d'état
│   │   └── Settings/     # Modal de configuration
│   ├── services/         # Logique métier (hors UI)
│   │   ├── websocket.js  # Gestionnaire de connexion
│   │   ├── state.js      # Gestionnaire d'état global (Store)
│   │   └── api.js        # Appels REST (fetch)
│   ├── styles/           # Styles globaux et design system
│   │   ├── tokens.css
│   │   └── global.css
│   └── app.js            # Point d'entrée principal (Bootstrapper)
├── public/               # Assets statiques (images, sons)
└── vite.config.js        # Configuration du build
```

## 4. Flux de Données

1. Le **WebSocketService** reçoit un événement du backend.
2. Le service met à jour le **StateStore**.
3. Les **Composants** abonnés au Store se mettent à jour visuellement via des transitions fluides.

## 5. Design Visuel

- **Thème** : Dark Premium "Cyberpunk Clean".
- **Effet** : Glassmorphism avancé (Dynamic Blur + Border Glow).
- **Animations** :
  - L'Orb utilisera des SVG animés pour une netteté parfaite.
  - Les listes (logs/chat) auront un effet "stagger" (apparition décalée).
  - Les changements d'état seront interpolés (fondu de couleurs).
