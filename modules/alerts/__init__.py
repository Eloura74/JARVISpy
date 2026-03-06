"""
Gestionnaire principal des alertes proactives JARVIS.
Lance tous les monitors en tâches asyncio parallèles.
S'abonne aux alertes et les dirige vers la synthèse vocale directement.
"""
import asyncio
from core.logger import get_logger
from core.event_bus import bus

logger = get_logger("alerts")


async def _handle_proactive_alert(payload: dict):
    """
    Reçoit une alerte et la traduit en parole SANS passer par Gemini.
    Économie directe de tokens (0 appel LLM pour les alertes templates).
    """
    text = payload.get("text", "")
    source = payload.get("source", "système")
    if text:
        logger.info(f"🔔 Alerte proactive [{source}]: {text}")
        # Injection directe dans le pipeline TTS (bypass Gemini)
        await bus.emit("brain.response_generated", {"text": text})


def start_all_monitors():
    """
    Démarre tous les monitors en tâches asyncio d'arrière-plan.
    À appeler une seule fois au démarrage de l'application.
    """
    from modules.alerts import print_monitor, ha_monitor, gmail_monitor

    # Abonnement à l'événement central d'alertes
    bus.subscribe("alerts.proactive", _handle_proactive_alert)

    # Création des tâches asyncio (non-bloquantes)
    loop = asyncio.get_event_loop()
    loop.create_task(print_monitor.run(interval_seconds=15))
    loop.create_task(ha_monitor.run(interval_seconds=30))
    loop.create_task(gmail_monitor.run(interval_seconds=300))

    logger.info("✅ Système d'alertes proactives démarré (print/HA/Gmail).")
