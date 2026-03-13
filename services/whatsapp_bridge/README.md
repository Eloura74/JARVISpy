# WhatsApp Bridge - J.A.R.V.I.S.

Module Node.js permettant à J.A.R.V.I.S. d'envoyer et recevoir des messages WhatsApp via l'API whatsapp-web.js.

---

## 📋 Prérequis

- **Node.js** : Version 18+ recommandée
- **npm** : Gestionnaire de paquets Node.js
- **Téléphone avec WhatsApp** : Pour scanner le QR code d'authentification

---

## 🚀 Installation

### 1. Installer les dépendances Node.js

Depuis le dossier `services/whatsapp_bridge/` :

```bash
npm install
```

### 2. Dépendances installées

Le fichier `package.json` contient :
- `whatsapp-web.js` : Client WhatsApp Web
- `qrcode-terminal` : Affichage du QR code dans le terminal
- `express` : Serveur HTTP pour les webhooks

---

## ⚙️ Configuration

### Variables d'environnement

Le bridge utilise les variables suivantes (définies dans `.env` à la racine du projet) :

```env
# Port du serveur WhatsApp Bridge
WA_PORT=3001

# Numéro de téléphone par défaut (format international sans +)
WA_DEFAULT_PHONE=33612345678

# Activer les notifications WhatsApp pour les alertes
WA_NOTIFY_ON_ALERTS=false
```

### Authentification WhatsApp

Au premier lancement, un **QR code** s'affichera dans la console :

1. Ouvrir WhatsApp sur votre téléphone
2. Aller dans **Paramètres > Appareils connectés**
3. Scanner le QR code affiché dans le terminal
4. La session sera sauvegardée dans `.wwebjs_cache/`

---

## 🎯 Utilisation

### Démarrage automatique

Le bridge est **automatiquement démarré** par `main.py` au lancement de J.A.R.V.I.S. :

```python
# Dans main.py
start_whatsapp_bridge()  # Lance le sous-processus Node.js
```

### Démarrage manuel (développement)

```bash
cd services/whatsapp_bridge
node index.js
```

### Vérification du statut

Le bridge expose un endpoint de santé :

```bash
curl http://localhost:3001/health
```

Réponse :
```json
{
  "status": "ok",
  "whatsapp": "ready"
}
```

---

## 📡 API Endpoints

### POST `/send`

Envoie un message WhatsApp.

**Body (JSON)** :
```json
{
  "phone": "33612345678",
  "message": "Bonjour depuis J.A.R.V.I.S. !"
}
```

**Réponse** :
```json
{
  "success": true,
  "messageId": "true_33612345678@c.us_..."
}
```

### GET `/health`

Vérifie l'état du bridge.

**Réponse** :
```json
{
  "status": "ok",
  "whatsapp": "ready"
}
```

---

## 🔧 Intégration Python

Le module Python `modules/notifications/whatsapp.py` communique avec le bridge :

```python
from modules.notifications.whatsapp import send_whatsapp

# Envoyer un message
send_whatsapp(
    phone="33612345678",
    message="Impression 3D terminée !"
)
```

---

## 🐛 Dépannage

### Le QR code ne s'affiche pas

**Cause** : Le port 3001 est déjà utilisé.

**Solution** :
```bash
# Windows
netstat -ano | findstr :3001
taskkill /F /PID <PID>

# Linux/macOS
lsof -ti:3001 | xargs kill -9
```

### Erreur "Session closed"

**Cause** : WhatsApp a déconnecté la session (inactivité, changement de téléphone).

**Solution** :
1. Supprimer le cache : `rm -rf .wwebjs_cache/`
2. Redémarrer J.A.R.V.I.S.
3. Scanner à nouveau le QR code

### Messages non envoyés

**Cause** : Numéro de téléphone invalide ou non enregistré sur WhatsApp.

**Solution** :
- Vérifier le format : `33612345678` (sans `+` ni espaces)
- S'assurer que le numéro est actif sur WhatsApp

---

## 📊 Logs

Les logs du bridge sont automatiquement redirigés vers la console J.A.R.V.I.S. :

```
2026-03-13 18:45:12 | INFO     | main         | WA Bridge | WhatsApp client ready
2026-03-13 18:45:15 | INFO     | main         | WA Bridge | Message sent to 33612345678
```

---

## 🔒 Sécurité

### Données sensibles

- **Session WhatsApp** : Stockée dans `.wwebjs_cache/` (ajouté au `.gitignore`)
- **Numéros de téléphone** : Jamais loggés en clair (masqués dans les logs)

### Recommandations

1. **Ne pas partager** le dossier `.wwebjs_cache/`
2. **Déconnecter** la session WhatsApp si le PC est compromis
3. **Utiliser** un numéro secondaire pour J.A.R.V.I.S. (recommandé)

---

## 📝 Architecture

```
services/whatsapp_bridge/
├── index.js           # Point d'entrée du bridge
├── package.json       # Dépendances Node.js
├── package-lock.json  # Versions verrouillées
└── README.md          # Ce fichier
```

### Flux de communication

```
J.A.R.V.I.S. (Python)
    ↓ HTTP POST
WhatsApp Bridge (Node.js)
    ↓ whatsapp-web.js
WhatsApp Web API
    ↓
Téléphone WhatsApp
```

---

## 🚀 Améliorations Futures

- [ ] Support des médias (images, vidéos, audio)
- [ ] Réception de messages (webhooks vers Python)
- [ ] Groupes WhatsApp
- [ ] Statuts de lecture
- [ ] Chiffrement end-to-end des logs

---

## 📚 Ressources

- [whatsapp-web.js Documentation](https://wwebjs.dev/)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Dernière mise à jour** : 13 mars 2026
