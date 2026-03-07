from typing import Dict, List, Optional
from core.logger import get_logger
from modules.memory.db import db_manager
from modules.memory.vector import vector_memory

logger = get_logger("memory.manager")

class MemoryManager:
    """
    Couche métier pour la mémoire de J.A.R.V.I.S.
    Combine SQLite (faits structurés) et ChromaDB (mémoire sémantique).
    """
    
    # --- GESTION DES FAITS (FACTS - SQLite) ---
    
    def remember_fact(self, key: str, value: str) -> bool:
        """Insère ou met à jour une information structurée et l'indexe en vectoriel."""
        logger.info(f"Mémorisation: {key} = {value}")
        query = """
            INSERT INTO facts (key, value, updated_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET 
                value=excluded.value, 
                updated_at=CURRENT_TIMESTAMP
        """
        result = db_manager.execute_query(query, (key, value))
        if result != -1:
            # On indexe aussi dans la mémoire vectorielle pour la recherche sémantique
            vector_memory.add_memory(f"Fait important: {key} est {value}", {"type": "fact", "key": key})
            return True
        return False

    def get_fact(self, key: str) -> Optional[str]:
        """Récupère une valeur spécifique de la BDD SQLite."""
        row = db_manager.fetch_one("SELECT value FROM facts WHERE key = ?", (key,))
        if row:
            return row["value"]
        return None

    def forget_fact(self, key: str) -> bool:
        """Supprime une information mémorisée (SQLite uniquement ici)."""
        logger.info(f"Oubli de l'information (clé: {key})")
        query = "DELETE FROM facts WHERE key = ?"
        result = db_manager.execute_query(query, (key,))
        return result > 0

    def get_all_facts(self) -> Dict[str, str]:
        """Récupère l'intégralité du contexte factuel."""
        rows = db_manager.fetch_all("SELECT key, value FROM facts ORDER BY updated_at ASC")
        return {row["key"]: row["value"] for row in rows}
    
    # --- GESTION DE L'HISTORIQUE & RAG (Vectoriel + SQLite) ---

    def store_message(self, role: str, content: str):
        """Sauvegarde un message dans SQLite et l'indexe en vectoriel."""
        if not content.strip():
            return
            
        logger.debug(f"Historisation du message ({role})")
        # 1. Stockage permanent SQL
        query = "INSERT INTO conversations (role, content) VALUES (?, ?)"
        db_manager.execute_query(query, (role, content))
        
        # 2. Indexation sémantique (Vectorielle)
        if len(content) > 10: # On n'indexe pas les "Oui", "Ok", etc.
            prefix = "L'utilisateur a dit: " if role == "user" else "JARVIS a répondu: "
            vector_memory.add_memory(f"{prefix}{content}", {"role": role, "type": "conversation"})

    def get_relevant_context(self, query: str, limit: int = 5) -> str:
        """
        Récupère le contexte sémantique le plus pertinent pour une requête donnée (RAG).
        """
        memories = vector_memory.search(query, n_results=limit)
        if not memories:
            return ""
        
        context_parts = ["--- SOUVENIRS PERTINENTS ---"]
        for m in memories:
            context_parts.append(f"- {m['content']}")
        return "\n".join(context_parts)

    def get_recent_history(self, limit: int = 20) -> List[Dict[str, str]]:
        """Récupère les N derniers messages chronologiques (SQLite)."""
        query = "SELECT role, content FROM conversations ORDER BY timestamp DESC LIMIT ?"
        rows = db_manager.fetch_all(query, (limit,))
        return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]
    
    def clear_history(self):
        """Efface l'historique SQL (la mémoire vectorielle persiste)."""
        logger.info("Historique vidé.")
        db_manager.execute_query("DELETE FROM conversations")


# Instance globale
memory = MemoryManager()


# --- OUTILS POUR GEMINI ---

def remember_info(key: str, value: str) -> str:
    """Mémorise une info à long terme (SQL + Vectoriel)."""
    success = memory.remember_fact(key, value)
    return f"Information '{key}' mémorisée." if success else "Échec de mémorisation."

def forget_info(key: str) -> str:
    """Oublie une info (SQL)."""
    success = memory.forget_fact(key)
    return f"L'information '{key}' a été effacée." if success else "Info non trouvée."
