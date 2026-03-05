import sqlite3
import os
from typing import List, Tuple, Any, Optional

from core.logger import get_logger
from core.config import settings

logger = get_logger("memory.db")

class DatabaseManager:
    """
    Gestionnaire bas niveau pour la connexion et les opérations SQLite.
    Assure l'initialisation du schéma et exécute les requêtes de façon sécurisée.
    """
    def __init__(self):
        self.db_path = settings.db_path
        self._ensure_db_dir()
        self._init_schema()
        logger.info(f"DatabaseManager initialisé sur {self.db_path}")

    def _ensure_db_dir(self):
        """S'assure que le dossier parent de la BDD existe."""
        db_dir = os.path.dirname(self.db_path)
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir, exist_ok=True)
            logger.debug(f"Dossier de base de données créé: {db_dir}")

    def _get_connection(self) -> sqlite3.Connection:
        """Retourne une nouvelle connexion sécurisée à SQLite."""
        # row_factory permet d'accéder aux colonnes par leur nom
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_schema(self):
        """Initialise les tables si elles n'existent pas encore."""
        schema = """
        -- Table des faits / préférences (Clé - Valeur)
        CREATE TABLE IF NOT EXISTS facts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Table de l'historique des conversations
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        try:
            with self._get_connection() as conn:
                conn.executescript(schema)
                conn.commit()
            logger.debug("Schéma de base de données vérifié/initialisé.")
        except sqlite3.Error as e:
            logger.error(f"Erreur d'initialisation du schéma SQLite: {e}")

    def execute_query(self, query: str, params: Tuple = ()) -> int:
        """Exécute une requête (INSERT, UPDATE, DELETE) et retourne le lastrowid ou rowcount."""
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(query, params)
                conn.commit()
                return cursor.lastrowid if cursor.lastrowid else cursor.rowcount
        except sqlite3.Error as e:
            logger.error(f"Erreur d'exécution de requête ({query}): {e}")
            return -1

    def fetch_all(self, query: str, params: Tuple = ()) -> List[sqlite3.Row]:
        """Exécute un SELECT et retourne plusieurs résultats."""
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(query, params)
                return cursor.fetchall()
        except sqlite3.Error as e:
            logger.error(f"Erreur fetch_all ({query}): {e}")
            return []

    def fetch_one(self, query: str, params: Tuple = ()) -> Optional[sqlite3.Row]:
        """Exécute un SELECT et retourne le premier résultat (ou None)."""
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(query, params)
                return cursor.fetchone()
        except sqlite3.Error as e:
            logger.error(f"Erreur fetch_one ({query}): {e}")
            return None

# Instance globale (Singleton)
db_manager = DatabaseManager()
