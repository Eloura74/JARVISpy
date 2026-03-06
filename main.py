import asyncio
import threading
import time
import uvicorn
from typing import Dict, Any

from core.config import settings
from core.logger import get_logger
from core.event_bus import bus
from api.server import app

logger = get_logger("main")

async def on_system_start(event_data: Dict[str, Any]):
    logger.info(f"Événement de démarrage primitif reçu.")
    logger.info(f"Détails: {event_data.get('message', '')} - Version: {event_data.get('version', 'inconnue')}")

async def on_api_started(event_data: Dict[str, Any]):
    host = event_data.get('host', '127.0.0.1')
    port = event_data.get('port', 8000)
    url = f"http://{host}:{port}"
    
    logger.info(f"API démarrée sur {url}")
    logger.info(f"WebSocket disponible sur ws://{host}:{port}/ws")
    
    # Ouverture automatique de l'interface dans le navigateur par défaut
    import webbrowser
    webbrowser.open(url)
    logger.info("Navigateur web ouvert sur l'interface de J.A.R.V.I.S.")

async def on_client_connected(event_data: Dict[str, Any]):
    logger.info(f"Interface client connectée depuis {event_data.get('ip')}")

def run_api_server():
    """Lance le serveur FastAPI dans un thread séparé"""
    uvicorn.run(
        app, 
        host=settings.api_host, 
        port=settings.api_port, 
        log_level="error" # On garde les logs custom de notre appli propre
    )

def setup_modules():
    """Charge et abonne tous les modules fonctionnels de Jarvis"""
    # Import tardif pour éviter les erreurs si la config n'est pas encore prête
    from modules.brain.gemini import brain_instance
    from modules.audio.tts import tts_instance
    from modules.audio.stt import stt_instance
    
    brain_instance.start()
    tts_instance.start()
    stt_instance.start()
    
    logger.info("Modules fonctionnels chargés.")

async def main():
    logger.info(f"========== Démarrage de {settings.app_name} ==========")
    logger.info(f"Environnement: {settings.environment}")
    
    # Très important pour les workers asynchrones (TTS, STT, Web) :
    # Enregistrement de l'event loop principal dans le bus global
    bus.main_loop = asyncio.get_running_loop()
    
    # Inscription des événements
    bus.subscribe("system.start", on_system_start)
    bus.subscribe("system.api_started", on_api_started)
    bus.subscribe("api.client_connected", on_client_connected)
    
    # Lancement du serveur API dans un thread pour ne pas bloquer l'Event Loop du main
    api_thread = threading.Thread(target=run_api_server, daemon=True)
    api_thread.start()
    
    # Initialisation des différents modules de l'assistant
    setup_modules()
    
    # Démarrage du système d'alertes proactives (asyncio, non-bloquant, 0 token Gemini)
    from modules.alerts import start_all_monitors
    start_all_monitors()
    
    # Laisser un peu de temps au serveur pour démarrer
    await asyncio.sleep(1)
    
    # Émission d'événement pour tester l'Event Bus
    await bus.emit("system.start", {"version": "0.1.0", "message": "Noyau fonctionnel"})
    
    logger.info("Noyau et API démarrés. Prêt à intégrer des modules interactifs.")
    
    try:
        logger.info("En attente d'événements... (Ctrl+C pour quitter)")
        while True:
            # Boucle principale de l'assistant (maintient le programme en vie)
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        pass

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Arrêt du système demandé par l'utilisateur.")
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            loop.run_until_complete(bus.emit("system.stop", {"reason": "KeyboardInterrupt"}))
        finally:
            logger.info("Système arrêté proprement.")
