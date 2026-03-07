import os
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, HTMLResponse
import uvicorn

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus
from api.routes.settings import router as settings_router
from api.routes.print_status import router as print_status_router
from api.routes.wa_webhook import router as wa_webhook_router

logger = get_logger("api.server")

app = FastAPI(
    title=settings.app_name,
    description="API centrale de l'assistant personnel JarvisDecoupe",
    version="0.1.0",
)

# Inclusion des routeurs
app.include_router(settings_router)
app.include_router(print_status_router)
app.include_router(wa_webhook_router)

# Configuration CORS pour permettre aux interfaces web de se connecter
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en production !
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration des dossiers statiques
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(base_dir, "dist")
web_dir = os.path.join(base_dir, "web")

# Choix du dossier source
if os.path.exists(os.path.join(dist_dir, "index.html")):
    static_dir = dist_dir
    logger.info("Utilisation de l'interface PRODUCTION (dist/)")
    # Montage critique pour les assets Vite
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_dir, "assets")), name="assets")
else:
    static_dir = web_dir
    logger.info("Utilisation de l'interface DÉVELOPPEMENT (web/)")
    # Montage critique pour les imports de modules JS/CSS en dev
    app.mount("/src", StaticFiles(directory=os.path.join(web_dir, "src")), name="src")

# Montage générique pour les fichiers à la racine de static_dir (PNG, Favicon, etc)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Liste des connexions WebSocket actives
active_connections = []

@app.on_event("startup")
async def startup_event():
    """Exécuté au démarrage du serveur FastAPI"""
    logger.info("Démarrage du serveur API...")
    # On émet un événement système pour notifier le reste de l'application
    await bus.emit("system.api_started", {"host": settings.api_host, "port": settings.api_port})

@app.on_event("shutdown")
async def shutdown_event():
    """Exécuté à l'arrêt du serveur FastAPI"""
    logger.info("Arrêt du serveur API...")
    await bus.emit("system.api_stopped", {})

@app.get("/", response_class=HTMLResponse)
async def root():
    """Point d'entrée de l'API - Retourne l'interface WebUI par défaut"""
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>J.A.R.V.I.S API Online</h1><p>Interface Web introuvable.</p>"

@app.get("/health")
async def health_check():
    """Vérification de l'état de santé du système"""
    # Ici on pourrait interroger d'autres modules via l'event bus
    return {"status": "healthy"}

@app.post("/api/event")
async def receive_event(request: Request):
    """
    Endpoint HTTP pur pour recevoir des événements (ex: webhooks externes).
    """
    try:
        data = await request.json()
        event_name = data.get("event")
        payload = data.get("payload", {})
        
        if not event_name:
            return JSONResponse(status_code=400, content={"error": "Le champ 'event' est requis"})
            
        logger.info(f"Événement HTTP reçu: {event_name}")
        await bus.emit(f"http.{event_name}", payload)
        
        return {"status": "received", "event": event_name}
    except Exception as e:
        logger.error(f"Erreur lors de la réception de l'événement HTTP: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Endpoint WebSocket ultra-rapide pour la communication bidirectionnelle
    avec une interface graphique locale ou Web.
    """
    await websocket.accept()
    active_connections.append(websocket)
    client_host = websocket.client.host if websocket.client else "Inconnu"
    logger.info(f"Nouvelle connexion WebSocket de {client_host}")
    
    try:
        # On notifie le système de la nouvelle UI/client
        await bus.emit("api.client_connected", {"ip": client_host})
        
        # On envoie un message de bienvenue
        await websocket.send_text(json.dumps({
            "type": "system", 
            "message": "Bienvenue sur JarvisDecoupe API", 
            "version": "0.1.0"
        }))
        
        while True:
            # Attente de messages du client (UI)
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                
                # Format attendu: {"action": "execute", "payload": {...}} ou {"event": "...", "data": {...}}
                event_type = msg.get("action") or msg.get("event", "unknown")
                payload = msg.get("payload") or msg.get("data", {})
                
                logger.debug(f"Message WS reçu [{event_type}]: {payload}")
                
                # Relais du message vers le bus d'événements interne
                # Ex: "ui.button_clicked", "audio.start_listening"
                await bus.emit(f"ws.{event_type}", payload)
                
            except json.JSONDecodeError:
                logger.warning(f"Message non-JSON reçu sur le WebSocket: {data[:50]}...")
                await websocket.send_text(json.dumps({"error": "Format JSON invalide"}))
                
    except WebSocketDisconnect:
        logger.info(f"Déconnexion WebSocket de {client_host}")
        active_connections.remove(websocket)
        await bus.emit("api.client_disconnected", {"ip": client_host})
    except Exception as e:
        logger.error(f"Erreur inattendue sur le WebSocket: {e}")
        if websocket in active_connections:
            active_connections.remove(websocket)

# Fonction pour relayer les événements du bus VERS les clients WebSockets
async def broadcast_to_websockets(event_name: str, payload: dict):
    """
    Écoute certains événements système et les renvoie vers l'interface utilisateur.
    (Peut être attaché à des événements spécifiques via bus.subscribe)
    """
    if not active_connections:
        return
        
    dead_connections = []
    message = json.dumps({"event": event_name, "data": payload})
    
    for connection in active_connections:
        try:
            await connection.send_text(message)
        except Exception:
            dead_connections.append(connection)
            
    # Nettoyage des connexions mortes silencieusement
    for conn in dead_connections:
        if conn in active_connections:
            active_connections.remove(conn)

def _setup_bus_to_ws_bridge():
    """
    Fonction utilitaire pour s'abonner aux événements du Core 
    et les renvoyer automatiquement vers le WebSocket (UI).
    """
    events_to_forward = [
        "audio.speech_recognized",
        "brain.thinking",
        "brain.response_generated",
        "memory.context_retrieved",
        "audio.tts_started",
        "audio.tts_stopped",
        "audio.stt_activated",
        "ui.show_web_results",
        "ui.hide_web_results",
        "maps.travel_info",
        "system.calendar"
    ]
    
    for event_name in events_to_forward:
        def make_handler(name):
            async def bridge_handler(payload):
                await broadcast_to_websockets(name, payload)
            return bridge_handler
            
        bus.subscribe(event_name, make_handler(event_name))

# On appelle le pont au chargement du module
_setup_bus_to_ws_bridge()
        
def start_server():
    """Fonction utilitaire pour lancer le serveur (si l'on ne passe pas par uvicorn en ligne de commande)"""
    uvicorn.run(
        "api.server:app", 
        host=settings.api_host, 
        port=settings.api_port, 
        log_level=settings.log_level.lower(),
        reload=False # Ne pas utiliser reload ici si on lance depuis main.py
    )
