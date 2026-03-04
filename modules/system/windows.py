import os
import re
import subprocess
from core.logger import get_logger

logger = get_logger("system.windows")

def open_application(app_name: str) -> str:
    """
    Ouvre une application sur le système Windows.
    Appelé par l'IA lorsqu'elle cherche à ouvrir un programme.
    
    Args:
        app_name (str): Le nom de l'application à ouvrir.
    """
    logger.info(f"Demande d'ouverture de l'application: {app_name}")
    try:
        # Correspondances communes
        app_map = {
            "bloc-notes": "notepad.exe",
            "calculatrice": "calc.exe",
            "navigateur": "chrome.exe", # ou msedge.exe
            "explorateur": "explorer.exe",
            "cmd": "cmd.exe",
            "terminal": "wt.exe"
        }
        
        target = app_map.get(app_name.lower().strip(), None)
        
        # Sécurité anti-injection shell : on n'accepte que des noms de fichiers alphanumériques basiques
        if not target:
            # Nettoyage strict (lettres, chiffres, tirets, points)
            clean_name = re.sub(r'[^a-zA-Z0-9.\-]', '', app_name)
            if not clean_name.endswith('.exe'):
                target = f"{clean_name}.exe"
            else:
                target = clean_name
                
        # os.startfile est plus sûr sur Windows que Popen avec shell=True
        os.startfile(target)
        return f"Application '{target}' lancée avec succès."
    except FileNotFoundError:
        return f"Erreur: L'application '{target}' est introuvable."
    except Exception as e:
        logger.error(f"Erreur d'ouverture d'application ({app_name}): {e}")
        return f"Erreur lors de l'ouverture de l'application: {str(e)}"

def open_file_or_url(target: str) -> str:
    """
    Ouvre n'importe quel type de fichier (image, modèle 3D, texte) ou une URL de site web 
    avec le programme par défaut de Windows.
    Appelé par l'IA lorsqu'on demande d'afficher une image, un fichier ou d'ouvrir un site.
    
    Args:
        target (str): Le chemin absolu du fichier ou l'URL du site web (ex: "https://google.com").
    """
    logger.info(f"Demande d'ouverture universelle: {target}")
    try:
        if not target.startswith("http") and not os.path.exists(target):
            return f"Erreur: Le fichier '{target}' n'existe pas."
            
        os.startfile(target)
        return f"La cible '{target}' a été ouverte et affichée à l'écran."
    except Exception as e:
        logger.error(f"Erreur d'ouverture de l'élément ({target}): {e}")
        return f"Erreur lors de l'ouverture: {str(e)}"

# On pourrait ajouter close_application, list_processes, etc.

def get_system_time() -> str:
    """
    Retourne l'heure locale et la date actuelle du système Windows.
    Appelé par l'IA lorsqu'on lui demande l'heure ou la date.
    """
    from datetime import datetime
    now = datetime.now()
    logger.info("Demande de l'heure système.")
    return f"Date et heure actuelles: {now.strftime('%d/%m/%Y %H:%M:%S')}"

def get_battery_status() -> str:
    """
    Retourne le niveau de batterie du système Windows si applicable.
    Appelé par l'IA pour conseiller sur le branchement de l'ordinateur.
    """
    import psutil
    logger.info("Demande de l'état de la batterie.")
    try:
        battery = psutil.sensors_battery()
        if battery is None:
            return "Aucune batterie détectée (probablement un ordinateur de bureau)."
        percent = battery.percent
        plugged = "branché" if battery.power_plugged else "sur batterie"
        return f"Batterie à {percent}%, le système est {plugged}."
    except Exception as e:
        return f"Erreur lors de la lecture de la batterie: {str(e)}"

# --- GESTION DE FICHIERS ---

def list_directory(path: str = ".") -> str:
    """
    Liste les fichiers et dossiers présents dans le répertoire indiqué.
    Appelé par l'IA pour explorer le système de fichiers.
    
    Args:
        path (str): Le chemin absolu ou relatif du dossier à lister. Défaut au répertoire courant.
    """
    logger.info(f"Demande de listage du dossier: {path}")
    try:
        if not os.path.exists(path):
            return f"Erreur: Le chemin '{path}' n'existe pas."
        
        items = os.listdir(path)
        if not items:
            return f"Le dossier {path} est vide."
            
        folders = [f for f in items if os.path.isdir(os.path.join(path, f))]
        files = [f for f in items if os.path.isfile(os.path.join(path, f))]
        
        res = f"Contenu de {os.path.abspath(path)}:\n"
        res += f"- Dossiers ({len(folders)}) : {', '.join(folders[:10])}{' ...' if len(folders)>10 else ''}\n"
        res += f"- Fichiers ({len(files)}) : {', '.join(files[:10])}{' ...' if len(files)>10 else ''}"
        return res
    except Exception as e:
        return f"Erreur lors du listage: {str(e)}"

def read_file(filepath: str) -> str:
    """
    Lit le contenu d'un fichier texte.
    Appelé par l'IA lorsqu'on lui demande de lire un fichier.
    
    Args:
        filepath (str): Le chemin du fichier à lire.
    """
    logger.info(f"Demande de lecture du fichier: {filepath}")
    try:
        if not os.path.exists(filepath):
            return f"Erreur: Le fichier '{filepath}' n'existe pas."
            
        # On limite la taille pour ne pas exploser le contexte LLM
        size = os.path.getsize(filepath)
        if size > 50000: # 50 KB max direct
            return f"Le fichier est trop volumineux ({size} bytes) pour être lu entièrement d'un coup."
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return content
    except UnicodeDecodeError:
        return "Erreur: Ce fichier semble être un binaire, je ne peux pas le lire comme du texte."
    except Exception as e:
        return f"Erreur de lecture: {str(e)}"

def _is_safe_path(filepath: str) -> bool:
    """Vérifie que le chemin ne vise pas des dossiers systèmes critiques"""
    abs_path = os.path.abspath(filepath).lower()
    forbidden_prefixes = [
        r"c:\windows",
        r"c:\program files",
        r"c:\program files (x86)"
    ]
    for prefix in forbidden_prefixes:
        if abs_path.startswith(prefix):
            return False
    return True

def write_to_file(filepath: str, content: str) -> str:
    """
    Écrit du contenu dans un fichier (écrase le contenu s'il existe).
    Appelé par l'IA lorsqu'elle doit sauvegarder une note ou créer un fichier texte.
    
    Args:
        filepath (str): Le chemin du fichier.
        content (str): Le texte à écrire dans le fichier.
    """
    logger.info(f"Demande d'écriture dans le fichier: {filepath}")
    
    if not _is_safe_path(filepath):
        logger.warning(f"Tentative de modification d'un fichier système bloquée: {filepath}")
        return "Opération refusée: Raisons de sécurité (Accès à un dossier système interdit)."
        
    try:
        # Création des sous-dossiers si nécessaire
        os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"Le fichier '{filepath}' a été enregistré avec succès."
    except Exception as e:
        return f"Erreur d'écriture: {str(e)}"
