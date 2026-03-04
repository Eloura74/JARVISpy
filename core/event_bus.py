import asyncio
from typing import Callable, Dict, List, Any
from .logger import get_logger

logger = get_logger("event_bus")

class EventBus:
    """
    Bus d'événements asynchrone pour la communication inter-modules.
    Permet un couplage lâche (Pub/Sub).
    """
    def __init__(self):
        self._subscribers: Dict[str, List[Callable[..., Any]]] = {}

    def subscribe(self, event_name: str, callback: Callable[..., Any]):
        """Abonne une coroutine à un événement spécifique."""
        if event_name not in self._subscribers:
            self._subscribers[event_name] = []
        if callback not in self._subscribers[event_name]:
            if not asyncio.iscoroutinefunction(callback):
                logger.warning(f"Le callback {callback.__name__} pour '{event_name}' n'est pas asynchrone !")
            self._subscribers[event_name].append(callback)
            logger.debug(f"Abonnement de {callback.__name__} à '{event_name}'")

    def unsubscribe(self, event_name: str, callback: Callable[..., Any]):
        """Désabonne une fonction d'un événement spécifique."""
        if event_name in self._subscribers and callback in self._subscribers[event_name]:
            self._subscribers[event_name].remove(callback)
            logger.debug(f"Désabonnement de {callback.__name__} de '{event_name}'")

    async def emit(self, event_name: str, *args, **kwargs):
        """
        Déclenche un événement de manière asynchrone, 
        appelant toutes les coroutines abonnées.
        """
        logger.debug(f"Émission de l'événement: '{event_name}' avec args={args} kwargs={kwargs}")
        if event_name in self._subscribers:
            tasks = []
            for callback in self._subscribers[event_name]:
                if asyncio.iscoroutinefunction(callback):
                    tasks.append(asyncio.create_task(callback(*args, **kwargs)))
                else:
                    logger.error(f"Callback synchrone '{callback.__name__}' ignoré pour l'événement asynchrone '{event_name}'.")
            
            if tasks:
                await asyncio.gather(*tasks, return_exceptions=True)

# Instance globale (Singleton) de l'EventBus
bus = EventBus()
