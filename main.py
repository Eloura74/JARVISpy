import asyncio
import sys

# CRITIQUE: Python 3.12+ Windows — le ProactorEventLoop (par défaut) a un bug
# connu (AssertionError dans _loop_writing) quand on lit des pipes de sous-processus
# (ex: WhatsApp Bridge) de façon concurrente. On force le SelectorEventLoop ici.
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import threading
import subprocess
import os
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
    
    # ESP32-S3 sphère physique (optionnel — se désactive si non branché)
    try:
        from modules.hardware.esp_sphere import esp_sphere
        esp_sphere.start()
    except Exception as e:
        logger.warning(f"Module ESP32-S3 non chargé: {e}")
    
    logger.info("Modules fonctionnels chargés.")


def start_whatsapp_bridge():
    """Démarre le bridge WhatsApp Node.js en sous-processus silencieux (sans fenêtre)."""
    bridge_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "services", "whatsapp_bridge"
    )
    bridge_script = os.path.join(bridge_dir, "index.js")
    if not os.path.exists(bridge_script):
        logger.debug("Bridge WhatsApp non trouvé, skip.")
        return None
    try:
        # Libérer le port 3001 s'il est déjà occupé par une ancienne instance
        import socket
        port = int(os.environ.get("WA_PORT", "3001"))
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) == 0:
                logger.warning(f"Port {port} déjà utilisé. Tentative de libération...")
                if os.name == "nt":
                    out = subprocess.check_output(f"netstat -ano | findstr :{port}", shell=True, text=True)
                    for line in out.splitlines():
                        if "LISTENING" in line:
                            pid = line.strip().split()[-1]
                            subprocess.run(f"taskkill /F /PID {pid}", shell=True, capture_output=True)
                            logger.info(f"Ancien processus WA Bridge (PID {pid}) terminé.")
                            break
                time.sleep(1)

        flags = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
        proc = subprocess.Popen(
            ["node", bridge_script],
            cwd=bridge_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            creationflags=flags,
        )
        
        # Thread pour lire les logs du bridge et les afficher dans la console JARVIS
        def stream_logs(process):
            for line in iter(process.stdout.readline, ''):
                if line:
                    logger.info(f"WA Bridge | {line.strip()}")
            process.stdout.close()
            
        threading.Thread(target=stream_logs, args=(proc,), daemon=True).start()
        
        logger.info(f"Bridge WhatsApp auto-démarré (PID {proc.pid}).")
        return proc
    except FileNotFoundError:
        logger.warning("Node.js introuvable — bridge WhatsApp non démarré.")
    except Exception as e:
        logger.error(f"Bridge WhatsApp: {e}")
    return None

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
    
    # Démarrage automatique du bridge WhatsApp (sous-processus silencieux)
    start_whatsapp_bridge()
    
    # Initialisation des différents modules de l'assistant
    setup_modules()
    
    # Démarrage du système d'alertes proactives (asyncio, non-bloquant, 0 token Gemini)
    from modules.alerts import start_all_monitors
    start_all_monitors()
    
    # Démarrage du gestionnaire de notifications (Toast + WhatsApp)
    from modules.notifications import start as start_notifications
    start_notifications()
    
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
