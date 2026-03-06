/**
 * J.A.R.V.I.S — WhatsApp Bridge
 * Microservice Node.js qui connecte WhatsApp Web via QR code
 * et expose une API REST pour envoyer/recevoir des messages.
 */
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");

const app = express();
app.use(express.json());

const PORT = process.env.WA_PORT || 3001;

// ── État global ──────────────────────────────────────────────────────────────
let qrCodeData = null; // Base64 PNG du QR code
let isConnected = false;
const recentMessages = []; // Buffer des 20 derniers messages reçus

// ── Client WhatsApp ──────────────────────────────────────────────────────────
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "./session" }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  },
});

client.on("qr", async (qr) => {
  qrCodeData = await qrcode.toDataURL(qr);
  qrcodeTerminal.generate(qr, { small: true });
  console.log("[JARVIS WA] QR Code généré — scannez avec votre téléphone.");
  console.log(
    `[JARVIS WA] Ou ouvrez http://localhost:${PORT}/qr dans le navigateur.`,
  );
});

client.on("ready", () => {
  isConnected = true;
  qrCodeData = null;
  console.log("[JARVIS WA] ✅ WhatsApp connecté et prêt.");
});

client.on("disconnected", (reason) => {
  isConnected = false;
  console.log(`[JARVIS WA] ⚠️ Déconnecté: ${reason}`);
});

client.on("message", async (msg) => {
  // Ignorer les messages de groupe et les messages système
  if (msg.isStatus || msg.from.endsWith("@g.us")) return;

  const contact = await msg.getContact();
  const entry = {
    from: msg.from,
    name: contact.name || contact.pushname || msg.from,
    body: msg.body,
    timestamp: new Date().toISOString(),
  };
  recentMessages.unshift(entry);
  if (recentMessages.length > 20) recentMessages.pop();
  console.log(`[JARVIS WA] 📩 Message de ${entry.name}: ${entry.body}`);

  // Transmission à JARVIS pour notification + lecture vocale
  try {
    await fetch("http://localhost:8000/api/wa/incoming", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
  } catch (e) {
    console.warn(`[JARVIS WA] Webhook JARVIS non disponible: ${e.message}`);
  }
});

// ── Routes REST ──────────────────────────────────────────────────────────────

/** Statut de connexion */
app.get("/status", (req, res) => {
  res.json({ connected: isConnected, qr_available: !!qrCodeData });
});

/** QR Code en HTML ou PNG base64 */
app.get("/qr", (req, res) => {
  if (isConnected)
    return res.json({ connected: true, message: "Déjà connecté." });
  if (!qrCodeData)
    return res
      .status(503)
      .json({ error: "QR non disponible — redémarrez le bridge." });
  res.send(`
        <!DOCTYPE html><html><head><title>JARVIS — WhatsApp QR</title>
        <meta http-equiv="refresh" content="15">
        <style>body{background:#0a0e1a;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}
        img{border-radius:12px;width:280px;}</style></head>
        <body><div style="text-align:center;color:#00c8ff;font-family:sans-serif;">
        <p style="margin-bottom:16px;">Scannez avec WhatsApp → Appareils liés</p>
        <img src="${qrCodeData}" />
        <p style="margin-top:12px;font-size:.8rem;opacity:.5">Page actualisée automatiquement</p>
        </div></body></html>
    `);
});

/** Envoyer un message */
app.post("/send", async (req, res) => {
  if (!isConnected)
    return res.status(503).json({ error: "WhatsApp non connecté." });
  const { to, message } = req.body;
  if (!to || !message)
    return res.status(400).json({ error: 'Champs "to" et "message" requis.' });

  try {
    const cleanNumber = to.replace(/\D/g, "");

    // Recherche l'id._serialized réel du contact (gère @c.us ET @lid)
    const contacts = await client.getContacts();
    const match = contacts.find(
      (c) => !c.isGroup && c.id && c.id.user === cleanNumber,
    );

    const chatId = match
      ? match.id._serialized // ID réel du contact (@c.us ou @lid)
      : cleanNumber + "@c.us"; // Fallback si inconnu

    await client.sendMessage(chatId, message);
    console.log(`[JARVIS WA] ✅ Envoyé à ${to} (${chatId}): ${message}`);
    res.json({ success: true, to, chatId });
  } catch (err) {
    console.error(`[JARVIS WA] Erreur envoi: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

/** Derniers messages reçus */
app.get("/messages", (req, res) => {
  res.json(recentMessages);
});

/** Recherche de contacts par nom (insensible à la casse) */
app.get("/contacts/search", async (req, res) => {
  if (!isConnected)
    return res.status(503).json({ error: "WhatsApp non connecté." });
  const q = (req.query.q || "").toLowerCase().trim();
  if (!q) return res.json([]);
  try {
    const contacts = await client.getContacts();
    const matches = contacts
      .filter((c) => !c.isGroup && c.name && c.name.toLowerCase().includes(q))
      .map((c) => ({ name: c.name, number: c.number, id: c.id.user }))
      .slice(0, 8);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Démarrage ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[JARVIS WA] Bridge démarré sur http://localhost:${PORT}`);
});

client.initialize();
