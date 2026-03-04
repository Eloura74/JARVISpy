import urllib.parse
from core.logger import get_logger
from modules.system.windows import open_file_or_url

logger = get_logger("system.web")

def web_search(query: str, category: str = "general") -> str:
    """
    Ouvre le navigateur système pour effectuer une recherche sur le web selon la catégorie.
    Appelé par l'IA lorsqu'on lui demande de chercher quelque chose sur internet, de trouver une image,
    un fichier 3D (ex: Thingiverse), un repo code (ex: Github), ou une info générale.
    
    Args:
        query (str): La requête de recherche (ex: "chaton mignon", "support téléphone klipper", "meilleure IA 2026").
        category (str): Le type de recherche. Valeurs possibles: "general", "image", "video", "3d", "code".
        
    Returns:
        str: Un message confirmant l'ouverture de la recherche dans le navigateur.
    """
    logger.info(f"Recherche Navigateur demandée: '{query}' (Catégorie: {category})")
    
    try:
        # Encodage de la recherche pour URL
        encoded_query = urllib.parse.quote_plus(query)
        
        # Moteur par défaut : Google
        url = f"https://www.google.com/search?q={encoded_query}"
        
        # Redirection selon la catégorie
        if category == "image":
            url = f"https://www.google.com/search?tbm=isch&q={encoded_query}"
        elif category == "video":
            url = f"https://www.youtube.com/results?search_query={encoded_query}"
        elif category == "3d":
            # Thingiverse, Printables ou Yeggi sont les standards
            url = f"https://www.yeggi.com/q/{encoded_query}/" 
        elif category == "code" or "github" in query.lower():
            url = f"https://github.com/search?q={encoded_query}&type=Repositories"
            
        # Appel à notre fonction universelle d'ouverture
        open_file_or_url(url)
        
        # Message de retour pour le LLM
        return f"La recherche pour '{query}' a été ouverte dans le navigateur web."
        
    except Exception as e:
        logger.error(f"Erreur lors de la préparation de la recherche web ({query}): {e}")
        return f"Je n'ai pas pu ouvrir le navigateur suite à une erreur : {str(e)}"
