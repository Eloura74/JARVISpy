from typing import Dict, List, Optional
from core.logger import get_logger
from modules.memory.db import db_manager

logger = get_logger("memory.manager")

class MemoryManager:
    """
    Couche métier pour la mémoire de J.A.R.V.I.S.
    Fournit des méthodes sémantiques basées sur DatabaseManager.
    """
    
    # --- GESTION DES FAITS (FACTS) ---
    
    def remember_fact(self, key: str, value: str) -> bool:
        """Insère ou met à jour une information (ex: nom de l'utilisateur)."""
        logger.info(f"Mémorisation: {key} = {value}")
        query = """
            INSERT INTO facts (key, value, updated_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET 
                value=excluded.value, 
                updated_at=CURRENT_TIMESTAMP
        """
        result = db_manager.execute_query(query, (key, value))
        return result != -1

    def get_fact(self, key: str) -> Optional[str]:
        """Récupère une valeur spécifique de la BDD."""
        row = db_manager.fetch_one("SELECT value FROM facts WHERE key = ?", (key,))
        if row:
            return row["value"]
        return None

    def forget_fact(self, key: str) -> bool:
        """Supprime une information mémorisée."""
        logger.info(f"Oubli de l'information (clé: {key})")
        query = "DELETE FROM facts WHERE key = ?"
        result = db_manager.execute_query(query, (key,))
        return result > 0 # Retourne True si une ligne a été affectée

    def get_all_facts(self) -> Dict[str, str]:
        """Récupère l'intégralité du contexte mémorisé sous forme de dictionnaire."""
        rows = db_manager.fetch_all("SELECT key, value FROM facts ORDER BY updated_at ASC")
        return {row["key"]: row["value"] for row in rows}
    
    # --- GESTION DE L'HISTORIQUE DE CONVERSATION ---

    def store_message(self, role: str, content: str):
        """Sauvegarde un message de la conversation avec son rôle (user/assistant)."""
        # Limite de sécurité: on ne stocke pas des messages vides
        if not content.strip():
            return
            
        logger.debug(f"Historisation du message ({role})")
        query = "INSERT INTO conversations (role, content) VALUES (?, ?)"
        db_manager.execute_query(query, (role, content))

    def get_recent_history(self, limit: int = 20) -> List[Dict[str, str]]:
        """
        Récupère les N derniers messages d'historique.
        Les retourne du plus ancien au plus récent (d'où l'ordre inversé après requête).
        """
        query = "SELECT role, content FROM conversations ORDER BY timestamp DESC LIMIT ?"
        rows = db_manager.fetch_all(query, (limit,))
        
        # Inverser pour avoir l'ordre chronologique normal
        history = [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]
        return history
    
    def clear_history(self):
        """Efface tout l'historique de conversation (les faits restent)."""
        logger.info("Historique de conversation effacé de la base de données.")
        db_manager.execute_query("DELETE FROM conversations")


# Instance globale
memory = MemoryManager()


# --- OUTILS POUR GEMINI ---

def remember_info(key: str, value: str) -> str:
    """
    Mémorise une information importante sur le long terme dans la base de données de JARVIS.
    Utile pour retenir le nom de l'utilisateur, ses préférences, ou tout contexte à garder.
    
    Args:
        key: Clé ou sujet de l'information (ex: 'user_name', 'favorite_color').
        value: Valeur ou contenu de l'information à retenir.
    """
    success = memory.remember_fact(key, value)
    if success:
        return f"Information '{key}' mémorisée avec succès."
    return f"Erreur: Impossible de mémoriser '{key}'."

def forget_info(key: str) -> str:
    """
    Oublie ou supprime une information précédemment mémorisée de la base de données par sa clé.
    
    Args:
        key: Clé de l'information à oublier.
    """
    success = memory.forget_fact(key)
    if success:
        return f"L'information '{key}' a bien été effacée de ma mémoire."
    return f"Aucune information trouvée pour la clé '{key}'."
