import logging
import sys
from .config import settings

def get_logger(name: str) -> logging.Logger:
    """
    Crée et configure un logger standardisé pour le projet.
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(settings.log_level.upper())
        handler = logging.StreamHandler(sys.stdout)
        
        # Format plus lisible pour la console
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)-8s | %(name)-12s | %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
        # Empêcher la propagation au logger root pour éviter les doublons
        logger.propagate = False

    return logger
