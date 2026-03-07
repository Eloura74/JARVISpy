import os
import chromadb
from chromadb.utils import embedding_functions
from core.logger import get_logger
from core.config import settings

logger = get_logger("memory.vector")

class VectorMemory:
    """
    Gère la mémoire sémantique (vectorielle) de J.A.R.V.I.S. utilisant ChromaDB.
    Permet de retrouver des informations par similarité contextuelle.
    """
    def __init__(self):
        self.db_path = os.path.join(os.getcwd(), "data", "vector_db")
        os.makedirs(self.db_path, exist_ok=True)
        
        # Initialisation du client persistant
        self.client = chromadb.PersistentClient(path=self.db_path)
        
        # Utilisation d'un modèle d'embedding local (léger)
        # Note: La première exécution téléchargera le modèle (~20MB)
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        
        # Création ou récupération de la collection principale
        self.collection = self.client.get_or_create_collection(
            name="jarvis_memory",
            embedding_function=self.embedding_fn,
            metadata={"hnsw:space": "cosine"} # Mesure de similarité
        )
        logger.info("Mémoire vectorielle initialisée (ChromaDB).")

    def add_memory(self, text: str, metadata: dict = None, doc_id: str = None):
        """Ajoute un fragment de texte à la mémoire vectorielle."""
        if not text.strip(): return
        
        try:
            import uuid
            uid = doc_id or str(uuid.uuid4())
            self.collection.add(
                documents=[text],
                metadatas=[metadata or {"source": "conversation"}],
                ids=[uid]
            )
            logger.debug(f"Nouveau souvenir indexé : {text[:50]}...")
        except Exception as e:
            logger.error(f"Erreur d'ajout en mémoire vectorielle : {e}")

    def search(self, query: str, n_results: int = 5) -> list:
        """Recherche les souvenirs les plus proches sémantiquement de la requête."""
        try:
            results = self.collection.query(
                query_texts=[query],
                n_results=n_results
            )
            
            # Formater les résultats pour qu'ils soient exploitables
            memories = []
            if results and results['documents']:
                for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
                    memories.append({"content": doc, "metadata": meta})
            return memories
        except Exception as e:
            logger.error(f"Erreur de recherche vectorielle : {e}")
            return []

# Instance globale
vector_memory = VectorMemory()
