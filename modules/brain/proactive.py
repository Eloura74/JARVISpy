import asyncio
import time
from core.logger import get_logger
from core.event_bus import bus
from modules.services.vision import vision_service
from modules.memory.manager import memory

logger = get_logger("brain.proactive")

class ProactiveBrain:
    """
    Orchestrateur de la proactivité de J.A.R.V.I.S.
    Gère la détection de présence et déclenche des interactions autonomes.
    """
    def __init__(self):
        from core.config import settings
        self.user_present = False
        self.last_seen_time = time.time()
        self.absence_threshold = int(settings.absence_threshold)
        self.check_interval = int(settings.presence_check_interval)
        self._running = False

    async def run(self):
        """Boucle principale de surveillance proactive."""
        from core.config import settings
        if self._running:
            return
        
        if settings.proactive_enabled.lower() != "true":
            logger.info("Proactivité désactivée dans les réglages.")
            return

        self._running = True
        logger.info(f"Cerveau proactif démarré (Intervalle: {self.check_interval}s).")

        while self._running:
            # Re-vérification dynamique de l'activation
            if settings.proactive_enabled.lower() != "true":
                logger.info("Désactivation dynamique de la proactivité.")
                self.stop()
                break
            try:
                # 1. Vérifier la présence physique via la webcam
                is_now_present = await asyncio.to_thread(vision_service.detect_presence)
                
                if is_now_present and not self.user_present:
                    await self._on_user_appeared()
                elif not is_now_present and self.user_present:
                    await self._on_user_disappeared()
                
                if is_now_present:
                    self.last_seen_time = time.time()
                
                self.user_present = is_now_present
                
            except Exception as e:
                logger.error(f"Erreur boucle proactivité: {e}")
            
            await asyncio.sleep(self.check_interval)

    async def _on_user_appeared(self):
        """Déclenché quand l'utilisateur revient devant l'écran."""
        absence_duration = time.time() - self.last_seen_time
        logger.info(f"Utilisateur apparu (Absence: {absence_duration:.1f}s)")
        
        # Mise à jour de l'état UI
        await bus.emit("ui.presence_detected", {"status": "present", "duration": absence_duration})
        
        # Si l'absence était longue, on propose un petit briefing
        if absence_duration > self.absence_threshold:
            logger.info("Absence longue détectée. Déclenchement du briefing de retour.")
            from modules.brain.gemini import brain_instance
            
            prompt = (
                f"L'utilisateur vient de revenir devant son écran après {int(absence_duration/60)} minutes d'absence. "
                "Salue-le brièvement (ex: 'Ravi de vous revoir Monsieur') et demande-lui s'il souhaite un compte-rendu "
                "des événements (mails, calendrier, système) passés pendant son absence."
            )
            # On lance une réflexion proactive (async)
            asyncio.create_task(brain_instance.process_text(prompt, role="system"))

    async def _on_user_disappeared(self):
        """Déclenché quand l'utilisateur quitte son poste."""
        logger.info("Utilisateur disparu.")
        await bus.emit("ui.presence_detected", {"status": "absent"})
        # On pourrait réduire la fréquence d'autres monitors ici pour économiser l'énergie

    def stop(self):
        self._running = False

# Instance globale
proactive_brain = ProactiveBrain()

def start_proactive_loop():
    """Point d'entrée pour main.py"""
    loop = asyncio.get_event_loop()
    loop.create_task(proactive_brain.run())
