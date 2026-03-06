"""
Monitor Home Assistant — surveille des seuils de capteurs configurés.
Exemples: température trop haute, porte restée ouverte, humidité hors plage.
Alerte TTS directe (pas de Gemini) pour économiser les tokens.
"""
import asyncio
from core.logger import get_logger
from core.event_bus import bus
from core.config import settings

logger = get_logger("alerts.ha")

# Seuils par défaut — à terme configurable via GUI
ALERT_RULES = [
    # (entity_id_pattern, friendly_label, threshold_state, message)
    # Exemples basiques actifs par défaut :
    # Les règles sont des tuples (entity_keyword, state_trigger, message_template)
    # Format: {"keyword": "...", "state": "...", "message": "..."}
]

_last_states: dict = {}

async def _check_rules():
    """Vérifie les règles HA configurées."""
    if not (settings.ha_url and settings.ha_token):
        return
    if not ALERT_RULES:
        return

    try:
        import httpx
        url = f"{settings.ha_url.rstrip('/')}/api/states"
        headers = {"Authorization": f"Bearer {settings.ha_token}"}
        async with httpx.AsyncClient(timeout=5.0, verify=False) as client:
            resp = await client.get(url, headers=headers)
            all_states = resp.json()

        for rule in ALERT_RULES:
            kw = rule.get("keyword", "")
            trigger_state = rule.get("state")
            msg = rule.get("message", "Alerte Home Assistant.")

            for entity in all_states:
                eid = entity.get("entity_id", "")
                if kw not in eid:
                    continue
                current = entity.get("state")
                prev = _last_states.get(eid)

                if current != prev and current == trigger_state:
                    fname = entity.get("attributes", {}).get("friendly_name", eid)
                    full_msg = msg.replace("{name}", fname).replace("{state}", current)
                    logger.info(f"Alerte HA: {eid} → {current}")
                    await bus.emit("alerts.proactive", {"text": full_msg, "source": "home_assistant"})

                _last_states[eid] = current

    except Exception as e:
        logger.error(f"ha_monitor: {e}")


async def run(interval_seconds: int = 30):
    """Boucle de surveillance HA."""
    logger.info("Monitor Home Assistant démarré.")
    while True:
        await _check_rules()
        await asyncio.sleep(interval_seconds)
