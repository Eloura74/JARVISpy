from typing import Dict, List, Optional
from core.logger import get_logger
from core.event_bus import bus
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

    async def get_relevant_context(self, query: str, limit: int = 5) -> str:
        """
        Récupère le contexte sémantique le plus pertinent pour une requête donnée (RAG).
        Filtre les bruits (ex: listes d'emails) pour les commandes physiques.
        """
        memories = vector_memory.search(query, n_results=limit)
        if not memories:
            return ""
        
        # Filtrage radical pour les commandes physiques (VZbot/Bambu)
        # On ne veut AUCUN bruit de souvenirs quand on demande un état réel.
        is_printer_query = any(k in query.lower() for k in ["vzbot", "bambu", "imprimante", "status", "etat"])
        if is_printer_query:
            logger.debug(f"[MEMORY] Requête physique détectée ({query}). Suppression du contexte RAG pour éviter les hallucinations.")
            return ""

        filtered_memories = memories

        if not filtered_memories:
            return ""

        # Feedback visuel pour l'utilisateur (Neural Log)
        await bus.emit("memory.context_retrieved", {
            "query": query,
            "memories": filtered_memories
        })
        
        context_parts = ["--- SOUVENIRS PERTINENTS ---"]
        for m in filtered_memories:
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

    def get_message_count(self) -> int:
        """Retourne le nombre total de messages conservés dans l'historique SQL."""
        row = db_manager.fetch_one("SELECT COUNT(*) as cnt FROM conversations")
        return row["cnt"] if row else 0

    async def summarize_history(self, limit_threshold: int = 50):
        """
        Condense l'historique s'il dépasse limit_threshold messages.
        Les messages sont résumés et envoyés dans vector_memory, puis la table SQL est purgée.
        C'est le processus de "rêve" / "consolidation" de JARVIS pour limiter les tokens.
        """
        count = self.get_message_count()
        if count < limit_threshold:
            return

        logger.info(f"Historique lourd détecté ({count} messages). Lancement de la consolidation sémantique...")
        
        # On récupère toute l'histoire récente (ordre chrono pour la cohérence)
        history = self.get_recent_history(limit=count)
        
        # Formatage brut du bloc texte pour le résumé
        dialogue = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
        
        # Demande à LLM de résumer...
        # On doit utiliser import différé pour éviter la boucle circulaire avec gemini.py
        try:
            from modules.brain.gemini import brain_instance
            if not brain_instance._is_ready.is_set():
                return
                
            prompt = (
                "Voici l'historique récent de notre conversation. Résume les points clés, "
                "les préférences exprimées par l'utilisateur, et les actions importantes réalisées. "
                "Ce résumé deviendra un souvenir long terme. Garde uniquement les informations pérennes. "
                "Conversations:\n" + dialogue
            )
            
            # Appel direct .generate_content sans tools pour un résumé strict
            response = await asyncio.to_thread(
                brain_instance.client.models.generate_content,
                model=brain_instance.model_name,
                contents=prompt
            )
            
            summary = response.text
            if summary:
                logger.debug(f"[MEMORY] Résumé généré: {summary[:100]}...")
                vector_memory.add_memory(
                    f"Souvenir consolidé: {summary}", 
                    {"type": "summary", "source": "history_consolidation"}
                )
                self.clear_history()
                logger.info("Consolidation terminée: Historique SQL purgé et indexé en vectoriel.")
                
        except Exception as e:
            logger.error(f"Erreur lors de la summarization de l'historique: {e}")

    def wipe_all_memories(self):
        """Efface TOUT (SQL + Vectoriel)."""
        logger.warning("Purge COMPLÈTE de la mémoire demandée.")
        self.clear_history()
        db_manager.execute_query("DELETE FROM facts")
        vector_memory.clear_all()

# Instance globale
memory = MemoryManager()


# --- OUTILS POUR GEMINI ---

def reset_all_memories() -> str:
    """Efface intégralement la mémoire de JARVIS (conversations, faits et souvenirs sémantiques)."""
    memory.wipe_all_memories()
    return "Ma mémoire a été intégralement réinitialisée, Monsieur. Je repars d'une feuille blanche."

def remember_info(key: str, value: str) -> str:
    """Mémorise une info à long terme (SQL + Vectoriel)."""
    success = memory.remember_fact(key, value)
    return f"Information '{key}' mémorisée." if success else "Échec de mémorisation."

def forget_info(key: str) -> str:
    """Oublie une info (SQL)."""
    success = memory.forget_fact(key)
    return f"L'information '{key}' a été effacée." if success else "Info non trouvée."
