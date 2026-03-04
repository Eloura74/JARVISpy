import urllib.parse
from ddgs import DDGS
from core.logger import get_logger
from modules.system.windows import open_file_or_url

logger = get_logger("system.web")

def interactive_web_search(query: str, max_results: int = 5) -> str:
    """
    Recherche sur le web et affiche les résultats sous forme de "Tuiles" graphiques à l'utilisateur.
    A utiliser par exemple si l'utilisateur demande "fais une recherche sur le web et affiche-moi les résultats".
    
    Args:
        query (str): La requête de recherche (ex: "actualité IA nov 2026").
        max_results (int): Le nombre maximum de résultats (défaut: 5).
        
    Returns:
        str: Un message secret interne destiné au LLM lui dictant sa prochaine action.
    """
    logger.info(f"Recherche Web Interactive demandée: '{query}'")
    try:
        from core.event_bus import bus
        import asyncio
        results = []
        
        # Astuce absolue pour DuckDuckGo : la région 'fr-fr' ne suffit parfois pas
        # sur les mots génériques anglais ou très globaux (ex: 'intelligence').
        # On force la requête en forçant des résultats en français.
        search_query = query
        if not any(w in query.lower() for w in ["france", "français", "francais", " fr "]):
            search_query = f"{query} en français"
            
        with DDGS() as ddgs:
            # On force le backend "lite" qui est le plus robuste pour le français actuellement
            for i, r in enumerate(ddgs.text(search_query, max_results=max_results, region='fr-fr', safesearch='moderate', backend='lite')):
                results.append({
                    "id": i + 1,
                    "title": r.get('title', 'Sans Titre'),
                    "url": r.get('href', '#'),
                    "snippet": r.get('body', '')
                })
                
        if not results:
            return f"Je n'ai trouvé aucun résultat pour '{query}'."

        # Broadcast au WebSocket pour apparition Popup de manière thread-safe
        if hasattr(bus, 'main_loop') and bus.main_loop:
            asyncio.run_coroutine_threadsafe(bus.emit("ui.show_web_results", {
                "query": query,
                "results": results
            }), bus.main_loop)
        
        # Le contenu retourné dicte au LLM comment réagir oralement
        links_context = "\n".join([f"Résultat {r['id']} : {r['url']}" for r in results])
        return (
            f"Tu as affiché {len(results)} résultats sur l'écran de l'utilisateur.\n"
            f"Voici les identifiants et les liens associés enregistrés en mémoire :\n{links_context}\n\n"
            "Demande VOCALEMENT à l'utilisateur de sélectionner le numéro du résultat qu'il souhaite ouvrir. "
            "Lorsqu'il te répondra par un numéro (ex: 'le 4'), tu dois FAIRE DEUX CHOSES: "
            "1. Utiliser IMPÉRATIVEMENT l'outil 'open_file_or_url' avec le lien URL correspondant au numéro."
            "2. Utiliser l'outil 'close_web_results'."
        )
    except Exception as e:
        logger.error(f"Erreur recherche DDG interactive: {e}")
        return f"Je n'ai pas pu lancer la recherche à cause d'une erreur: {str(e)}"

def close_web_results() -> str:
    """
    Ferme la popup des résultats de recherche sur l'interface de l'utilisateur.
    S'utilise juste après que l'utilisateur a sélectionné son choix et que la page est ouverte.
    """
    from core.event_bus import bus
    import asyncio
    if hasattr(bus, 'main_loop') and bus.main_loop:
        asyncio.run_coroutine_threadsafe(bus.emit("ui.hide_web_results", {}), bus.main_loop)
    return "Popup fermée avec succès."
