"""
Endpoint webhook pour la réception de messages WhatsApp entrants.
Appelé par le bridge Node.js à chaque message reçu.
Déclenche un toast bureau et une annonce JARVIS vocale.
"""
from fastapi import APIRouter, Request
from core.logger import get_logger
from core.event_bus import bus

router = APIRouter()
logger = get_logger("api.wa_webhook")


@router.post("/api/wa/incoming")
async def whatsapp_incoming(request: Request):
    """Reçoit un message WhatsApp entrant depuis le bridge Node.js."""
    try:
        data = await request.json()
        sender = data.get("name", data.get("from", "Inconnu"))
        body = data.get("body", "")

        if not body:
            return {"status": "ignored"}

        logger.info(f"📩 WhatsApp de {sender}: {body}")

        # Toast bureau avec le contenu complet
        from modules.notifications.toast import show_toast
        show_toast(title=f"💬 WhatsApp — {sender}", message=body)

        # Annonce vocale : nom uniquement, PAS le contenu (choix utilisateur)
        announcement = f"Monsieur, vous avez un message WhatsApp de {sender}."
        await bus.emit("brain.response_generated", {"text": announcement})

        return {"status": "ok"}
    except Exception as e:
        logger.error(f"wa_webhook: {e}")
        return {"status": "error", "detail": str(e)}
