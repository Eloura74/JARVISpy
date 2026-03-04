from enum import Enum
from typing import List
from .logger import get_logger

logger = get_logger("security")

class Permission(Enum):
    """
    Liste des permissions disponibles dans le système.
    """
    READ_INFO = "read:info"
    SYSTEM_CONTROL = "system:control"
    VOICE_CONTROL = "voice:control"
    ADMIN = "admin"

class ActionValidator:
    """
    Classe utilitaire pour vérifier si une action critique peut être exécutée.
    """
    @staticmethod
    def validate_action(action_name: str, required_permissions: List[Permission], current_permissions: List[Permission]) -> bool:
        """
        Vérifie si les permissions actuelles sont suffisantes pour l'action.
        """
        if Permission.ADMIN in current_permissions:
            return True
            
        for req_perm in required_permissions:
            if req_perm not in current_permissions:
                logger.warning(f"Action '{action_name}' refusée. Permission manquante: {req_perm.value}")
                return False
                
        logger.debug(f"Action '{action_name}' validée.")
        return True
