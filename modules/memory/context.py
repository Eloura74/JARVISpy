"""
Mémoire contextuelle légère — buffer circulaire des 25 dernières actions JARVIS.
Injectée dans le système prompt sous forme de 2 lignes. Zéro appel Gemini supplémentaire.
"""
from collections import deque
from datetime import datetime
from typing import Deque, Dict
from core.logger import get_logger

logger = get_logger("memory.context")

class ContextBuffer:
    """
    Buffer circulaire des actions récentes.
    Utilisé pour enrichir le contexte Gemini et détecter des patterns répétitifs.
    """
    MAX_SIZE = 25

    def __init__(self):
        self._buffer: Deque[Dict] = deque(maxlen=self.MAX_SIZE)

    def record(self, action: str, tool: str | None = None):
        """Enregistre une action utilisateur avec timestamp."""
        self._buffer.append({
            "time": datetime.now().strftime("%H:%M"),
            "action": action[:80],  # Tronquer pour économiser la mémoire
            "tool": tool,
        })

    def get_summary(self) -> str:
        """
        Retourne un résumé ultra-compact des activités récentes (2 lignes max).
        Optimisé pour injection dans system_instruction sans gaspiller les tokens.
        """
        if not self._buffer:
            return ""

        # Dernières 5 actions seulement pour le résumé
        recent = list(self._buffer)[-5:]
        lines = [f"{e['time']} {e['action']}" for e in recent]
        return "ACTIVITÉS RÉCENTES:\n" + " | ".join(lines)

    def get_suggestions(self) -> str:
        """
        Détecte les patterns répétitifs (même action 3x) et retourne une suggestion.
        Outil IA exposé à Gemini — renvoie une suggestion contextuelle concise.
        """
        if len(self._buffer) < 3:
            return "Pas encore assez d'activité pour proposer des suggestions."

        # Compte les actions répétées dans les 15 dernières
        from collections import Counter
        recent_tools = [e["tool"] for e in list(self._buffer)[-15:] if e["tool"]]
        counts = Counter(recent_tools)
        top_tool, top_count = counts.most_common(1)[0] if counts else (None, 0)

        if top_count >= 3:
            return (
                f"Vous avez utilisé '{top_tool}' {top_count} fois récemment. "
                f"Souhaitez-vous que je crée une routine automatique pour ça ?"
            )
        return "Aucun pattern répétitif détecté pour le moment."

    def as_list(self) -> list:
        """Retourne toutes les actions pour analyse complète si demandé."""
        return list(self._buffer)


# Singleton partagé
context_buffer = ContextBuffer()
