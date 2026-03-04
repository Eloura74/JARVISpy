import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("api.server")

app = FastAPI(
    title=settings.app_name,
    description="API centrale de l'assistant personnel JarvisDecoupe",
    version="0.1.0",
)

# Configuration CORS pour permettre aux interfaces web de se connecter
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en production !
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/")
async def root():
    """Point d'entrée de l'API pour vérifier son statut"""
    return {"status": "online", "app": settings.app_name, "version": "0.1.0"}

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
    On pourrait rajouter des filtres pour ne pas TOUT envoyer.
    """
    async def bridge_handler(*args, **kwargs):
        # Cette fonction captera l'événement global
        # MAIS dans notre architecture on va s'abonner manuellement depuis main.py ou api_manager.py
        pass
        
def start_server():
    """Fonction utilitaire pour lancer le serveur (si l'on ne passe pas par uvicorn en ligne de commande)"""
    uvicorn.run(
        "api.server:app", 
        host=settings.api_host, 
        port=settings.api_port, 
        log_level=settings.log_level.lower(),
        reload=False # Ne pas utiliser reload ici si on lance depuis main.py
    )
