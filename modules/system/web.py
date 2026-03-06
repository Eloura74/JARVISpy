import urllib.parse
from tavily import TavilyClient
from core.logger import get_logger
from core.config import settings
from modules.system.windows import open_file_or_url

logger = get_logger("system.web")

def interactive_web_search(query: str, max_results: int = 5) -> str:
    """
    Recherche sur le web et affiche les résultats sous forme de "Tuiles" graphiques dans l'interface de J.A.R.V.I.S.
    À utiliser UNIQUEMENT si l'utilisateur demande explicitement "montre une sélection", "propose moi", 
    ou d'afficher les résultats. Pour les recherches web classiques ("recherche [X]", "cherche sur google"), 
    utilisez plutôt 'direct_google_search'.
    
    Args:
        query (str): La requête de recherche (ex: "actualité IA nov 2026").
        max_results (int): Le nombre maximum de résultats (défaut: 5).
        
    Returns:
        str: Un message secret interne destiné au LLM lui dictant sa prochaine action.
    """
    logger.info(f"Recherche Web Interactive demandée (Tavily): '{query}'")
    try:
        from core.event_bus import bus
        import asyncio
        results = []
        
        if not settings.tavily_api_key:
            return "Désolé Monsieur, mais la clé API Tavily n'est pas configurée dans mon système."
            
        tavily = TavilyClient(api_key=settings.tavily_api_key)
        
        # On peut laisser la query originale, Tavily a son propre NLP contextuel
        search_query = query
        if "franç" not in query.lower() and "france" not in query.lower():
            search_query = f"{query} (réponses en français)"
            
        # Exécution de la requête via Tavily en mode avancé pour de beaux snippets
        response = tavily.search(query=search_query, search_depth="advanced", include_images=True, max_results=max_results)
        
        # Les images retournées par Tavily sont dans une liste séparée
        images = response.get('images', [])
        
        for i, r in enumerate(response.get('results', [])):
            # On essaie d'associer une image à l'article si Tavily en a trouvé
            img_url = images[i] if i < len(images) else None
            
            results.append({
                "id": i + 1,
                "title": r.get('title', 'Sans Titre'),
                "url": r.get('url', '#'),
                "snippet": r.get('content', ''),
                "image": img_url
            })
                
        if not results:
            return f"Je n'ai trouvé aucun résultat pertinent sur le web pour '{query}'."

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

def direct_google_search(query: str) -> str:
    """
    Effectue une recherche directe sur Google en ouvrant un nouvel onglet dans le navigateur de l'utilisateur.
    À utiliser PAR DÉFAUT quand l'utilisateur dit "recherche [X]" ou "cherche sur google".
    """
    import subprocess
    import shutil
    import os

    logger.info(f"Recherche directe Google demandée: '{query}'")
    url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
    try:
        chrome_exe = None

        # 1) Cherche chrome dans le PATH (détecte aussi bien les installations standard qu'alternatives)
        chrome_exe = shutil.which("chrome") or shutil.which("google-chrome")

        # 2) Cherche dans les emplacements Windows les plus courants
        if not chrome_exe:
            candidates = [
                os.path.join(os.environ.get("PROGRAMFILES", "C:\\Program Files"), "Google", "Chrome", "Application", "chrome.exe"),
                os.path.join(os.environ.get("PROGRAMFILES(X86)", "C:\\Program Files (x86)"), "Google", "Chrome", "Application", "chrome.exe"),
                os.path.join(os.environ.get("LOCALAPPDATA", ""), "Google", "Chrome", "Application", "chrome.exe"),
            ]
            chrome_exe = next((p for p in candidates if p and os.path.exists(p)), None)

        # 3) Cherche dans le registre Windows
        if not chrome_exe:
            try:
                import winreg
                key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe")
                chrome_exe = winreg.QueryValue(key, None)
                winreg.CloseKey(key)
            except Exception:
                pass

        if chrome_exe and os.path.exists(chrome_exe):
            # Ouvre un NOUVEL onglet dans Chrome dans un processus TOTALEMENT détaché de JARVIS
            subprocess.Popen(
                [chrome_exe, "--new-tab", url],
                creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
            )
            logger.info(f"Ouverture Chrome: {chrome_exe}")
        else:
            # Fallback : utilise le navigateur par défaut du système via webbrowser
            import webbrowser
            logger.warning("Chrome non trouvé, utilisation du navigateur système par défaut.")
            webbrowser.open_new_tab(url)

        return "J'ai ouvert un onglet de recherche Google, Monsieur."
    except Exception as e:
        logger.error(f"Erreur ouverture recherche Google: {e}")
        return f"Erreur lors de l'ouverture du navigateur: {e}"
