import os
import re
import subprocess
import asyncio
from core.logger import get_logger

logger = get_logger("system.windows")

import win32gui
import win32con
import win32process
import psutil
from screeninfo import get_monitors
import glob
import difflib

def _get_all_start_menu_apps():
    """Récupère tous les raccourcis du menu Démarrer Windows (Commun et Utilisateur)"""
    apps = {}
    paths = [
        os.path.join(os.environ.get('PROGRAMDATA', 'C:\\ProgramData'), r'Microsoft\Windows\Start Menu\Programs'),
        os.path.join(os.environ.get('APPDATA', ''), r'Microsoft\Windows\Start Menu\Programs'),
        os.path.join(os.environ.get('USERPROFILE', ''), 'Desktop'),
        os.path.join(os.environ.get('PUBLIC', 'C:\\Users\\Public'), 'Desktop')
    ]
    
    for base_path in paths:
        if os.path.exists(base_path):
            for root, dirs, files in os.walk(base_path):
                for file in files:
                    if file.lower().endswith('.lnk'):
                        name = os.path.splitext(file)[0].lower()
                        apps[name] = os.path.join(root, file)
    return apps

async def find_and_launch_app(app_name: str) -> str:
    """
    Ouvre une application sur le système Windows de manière intelligente (sans chemin en dur).
    Cherche l'exécutable via le Menu Démarrer (Fuzzy Matching) ou via le Shell.
    
    Args:
        app_name (str): Le nom de l'application à ouvrir (ex: "bambus studio", "google chrome").
    """
    return await asyncio.to_thread(_sync_find_and_launch_app, app_name)

def _sync_find_and_launch_app(app_name: str) -> str:
    logger.info(f"Recherche intelligente et ouverture de: {app_name}")
    try:
        app_name_lower = app_name.lower().strip()
        
        # 1. Phonétique et correspondances communes (les alias)
        app_map = {
            "bloc-notes": "notepad", "calculatrice": "calc",
            "navigateur": "chrome", "explorateur": "explorer",
            "cmd": "cmd", "terminal": "wt", 
            "winter": "windterm", "winter me": "windterm", 
            "hiver": "windterm", # Au cas où il traduit l'audio
            "codex": "code" # Pour VS Code souvent appelé code / codex
        }
        
        if app_name_lower in app_map:
            target = app_map[app_name_lower]
            # On vérifie si c'est un exécutable local dans le PATH ou Registre
            subprocess.Popen(f"start {target}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            return f"Ordre de lancement envoyé pour '{target}' (raccourci système)."
            
        # 2. Recherche par similarité (Fuzzy Matching) dans le Menu Démarrer
        start_menu_apps = _get_all_start_menu_apps()
        
        # On cherche la correspondance la plus proche (tolérance d'orthographe)
        matches = difflib.get_close_matches(app_name_lower, start_menu_apps.keys(), n=1, cutoff=0.6)
        
        if matches:
            best_match = matches[0]
            shortcut_path = start_menu_apps[best_match]
            logger.info(f"Similarité trouvée: '{app_name}' -> '{best_match}'")
            os.startfile(shortcut_path)
            return f"Application '{best_match}' trouvée (correction IA) et lancée avec succès."
            
        # 3. Fallback: On tente de le lancer via le Shell "start" (si enregistré dans les variables PATH)
        clean_name = re.sub(r'[^a-zA-Z0-9.\- ]', '', app_name_lower)
        subprocess.Popen(f"start {clean_name}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return f"Aucun raccourci exact trouvé. Demande de lancement manuel envoyée pour '{clean_name}'."
        
    except Exception as e:
        logger.error(f"Erreur d'ouverture d'application ({app_name}): {e}")
        return f"Erreur lors de l'ouverture de l'application: {str(e)}"

def _get_hwnds_for_pid(pid):
    """Trouve toutes les fenêtres (HWND) appartenant à un PID donné"""
    def callback(hwnd, hwnds):
        if win32gui.IsWindowVisible(hwnd) and win32gui.IsWindowEnabled(hwnd):
            _, found_pid = win32process.GetWindowThreadProcessId(hwnd)
            if found_pid == pid:
                hwnds.append(hwnd)
        return True
    
    hwnds = []
    win32gui.EnumWindows(callback, hwnds)
    return hwnds

def _find_window_by_title(title_chunk: str):
    """Trouve un HWND dont le titre correspond de près (Fuzzy Matching) ou contient le texte"""
    active_windows = {}
    
    def callback(hwnd, hwnds):
        if win32gui.IsWindowVisible(hwnd) and win32gui.GetWindowText(hwnd):
            title = win32gui.GetWindowText(hwnd).lower()
            active_windows[title] = hwnd
        return True
    
    win32gui.EnumWindows(callback, None)
    
    # 1. Correspondance exacte ou partielle (comme avant)
    title_chunk_lower = title_chunk.lower()
    for title, hwnd in active_windows.items():
        if title_chunk_lower in title:
            return hwnd
            
    # 2. Correspondance Floue (Fuzzy Matching) si le premier échoue
    # On découpe les titres de fenêtres pour match "Bambu" avec "Bambu Studio"
    all_words = []
    word_to_hwnd = {}
    for title, hwnd in active_windows.items():
        # Split par espaces ou tirets
        words = re.split(r'[-\s]+', title)
        for w in words:
            if len(w) > 3: # Ignorer les mots trop courts
                all_words.append(w)
                word_to_hwnd[w] = hwnd
                
    # On compare chaque mot de la requête avec les mots des titres
    query_words = re.split(r'[-\s]+', title_chunk_lower)
    for qw in query_words:
        if len(qw) > 3:
            matches = difflib.get_close_matches(qw, all_words, n=1, cutoff=0.7)
            if matches:
                logger.info(f"Fuzzy match HWND trouvé: '{qw}' -> '{matches[0]}'")
                return word_to_hwnd[matches[0]]
                
    return None

async def close_application(app_name: str) -> str:
    """
    Recherche et ferme une application en cours d'exécution de manière tolérante (Fuzzy).
    
    Args:
        app_name (str): Nom de l'application (ex: "bambus studio", "chrome").
    """
    return await asyncio.to_thread(_sync_close_application, app_name)

def _sync_close_application(app_name: str) -> str:
    logger.info(f"Demande de fermeture (Smart): {app_name}")
    closed_count = 0
    app_name_lower = app_name.lower().replace(".exe", "")
    
    try:
        # Phase 1: On tente par fenêtre (plus "propre" et marche avec les noms d'apps bizarres)
        target_hwnd = _find_window_by_title(app_name_lower)
        if target_hwnd:
            _, pid = win32process.GetWindowThreadProcessId(target_hwnd)
            hwnds = _get_hwnds_for_pid(pid)
            for hwnd in hwnds:
                win32gui.PostMessage(hwnd, win32con.WM_CLOSE, 0, 0)
            logger.info("Fermeture propre envoyée (WM_CLOSE).")
            closed_count = len(hwnds)
            
        # Phase 2: Kill en profondeur process par process si rien n'a été fermé via HWND
        if closed_count == 0:
            active_procs = {}
            for proc in psutil.process_iter(['pid', 'name']):
                try:
                    if proc.info['name']:
                        proc_name = proc.info['name'].lower().replace('.exe', '')
                        active_procs[proc_name] = proc
                except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                    pass
            
            # Substring strict d'abord
            procs_to_kill = [proc for name, proc in active_procs.items() if app_name_lower in name]
            
            # Fuzzy Matching (si l'utilisateur a prononcé de travers)
            if not procs_to_kill:
                matches = difflib.get_close_matches(app_name_lower, active_procs.keys(), n=1, cutoff=0.6)
                if matches:
                    logger.info(f"Process PID Fuzzy match: '{app_name_lower}' -> '{matches[0]}'")
                    procs_to_kill.append(active_procs[matches[0]])
                    
            for p in procs_to_kill:
                try:
                    p.kill()
                    closed_count += 1
                except Exception:
                    pass
                    
        if closed_count > 0:
            return f"Opération réussie. Cible fermée."
        else:
            return f"Je n'ai trouvé aucun programme nommé '{app_name}' en cours d'exécution."
            
    except Exception as e:
        return f"Erreur lors de la fermeture: {str(e)}"

async def manage_window_state(app_name: str, state: str) -> str:
    """
    Réduit (minimise) ou Agrandit (maximise) une fenêtre en cours d'exécution.
    
    Args:
        app_name (str): Nom de l'application appartenant à la fenêtre.
        state (str): 'minimize' pour réduire, 'maximize' pour agrandir en plein écran, 'restore' pour vue normale.
    """
    return await asyncio.to_thread(_sync_manage_window_state, app_name, state)

def _sync_manage_window_state(app_name: str, state: str) -> str:
    logger.info(f"Demande état fenêtre: {app_name} -> {state}")
    hwnd = _find_window_by_title(app_name)
    
    if not hwnd:
        return f"Je n'ai pas trouvé de fenêtre ouverte correspondant à '{app_name}'."
        
    try:
        if state == "minimize" or "rédui" in state.lower():
            win32gui.ShowWindow(hwnd, win32con.SW_MINIMIZE)
            action = "réduite"
        elif state == "maximize" or "agrandi" in state.lower():
            win32gui.ShowWindow(hwnd, win32con.SW_MAXIMIZE)
            action = "agrandie"
        else:
            win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
            action = "restaurée"
            
        # Place la fenêtre au premier plan
        if action != "réduite":
            win32gui.SetForegroundWindow(hwnd)
            
        return f"La fenêtre '{app_name}' a été {action}."
    except Exception as e:
        return f"Erreur manipulation fenêtre: {str(e)}"

async def move_window_to_screen(app_name: str, screen_number: int) -> str:
    """
    Déplace la fenêtre d'une application sur un autre écran (1, 2, 3...) dans une configuration Multi-écrans.
    
    Args:
        app_name (str): Nom de la fenêtre à déplacer.
        screen_number (int): Numéro de l'écran de destination (1 pour l'écran primaire, 2 pour le secondaire, etc).
    """
    return await asyncio.to_thread(_sync_move_window_to_screen, app_name, screen_number)

def _sync_move_window_to_screen(app_name: str, screen_number: int) -> str:
    logger.info(f"Demande de déplacement de {app_name} vers écran {screen_number}")
    
    try:
        monitors = get_monitors()
        if not monitors:
            return "Impossible de détecter les écrans connectés sur ce système."
            
        # Tri des écrans de gauche à droite (coordonnée X) pour une logique humaine "1, 2, 3..."
        monitors.sort(key=lambda m: m.x)
            
        if screen_number < 1 or screen_number > len(monitors):
            return f"Écran {screen_number} introuvable. Vous n'avez que {len(monitors)} écran(s) détecté(s)."
            
        target_monitor = monitors[screen_number - 1] # Indexe base 0
        
        hwnd = _find_window_by_title(app_name)
        if not hwnd:
            return f"Je n'ai pas trouvé la fenêtre '{app_name}'."
            
        # Si la fenêtre est maximisée, il faut la réstaurer avant de la bouger
        placement = win32gui.GetWindowPlacement(hwnd)
        if placement[1] == win32con.SW_SHOWMAXIMIZED:
            win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
            
        # Lecture des dimensions actuelles de la fenêtre
        rect = win32gui.GetWindowRect(hwnd)
        w = rect[2] - rect[0]
        h = rect[3] - rect[1]
        
        # Déplacement au milieu supérieur de l'écran cible
        new_x = target_monitor.x + (target_monitor.width // 4)
        new_y = target_monitor.y + 50
        
        # Remplacement de MoveWindow par SetWindowPos pour éviter les "fantômes" (fantômes UWP type Calculatrice)
        flags = win32con.SWP_NOZORDER | win32con.SWP_NOACTIVATE | win32con.SWP_FRAMECHANGED
        win32gui.SetWindowPos(hwnd, 0, new_x, new_y, w, h, flags)
        
        # Autoriser Windows à redessiner la fenêtre
        win32gui.RedrawWindow(hwnd, None, None, win32con.RDW_INVALIDATE | win32con.RDW_UPDATENOW)
        
        # On remet en maximisé si c'était le cas
        if placement[1] == win32con.SW_SHOWMAXIMIZED:
            win32gui.ShowWindow(hwnd, win32con.SW_MAXIMIZE)
            
        win32gui.SetForegroundWindow(hwnd)
        return f"J'ai téléporté '{app_name}' sur votre écran numéro {screen_number}."
        
    except Exception as e:
        return f"Erreur lors du déplacement de l'écran: {str(e)}"

async def open_file_or_url(target: str) -> str:
    """
    Ouvre n'importe quel type de fichier (image, modèle 3D, texte) ou une URL de site web 
    avec le programme par défaut de Windows.
    Appelé par l'IA lorsqu'on demande d'afficher une image, un fichier ou d'ouvrir un site.
    
    Args:
        target (str): Le chemin absolu du fichier ou l'URL du site web (ex: "https://google.com").
    """
    return await asyncio.to_thread(_sync_open_file_or_url, target)

def _sync_open_file_or_url(target: str) -> str:
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

async def get_system_time() -> str:
    """
    Retourne l'heure locale et la date actuelle du système Windows.
    Appelé par l'IA lorsqu'on lui demande l'heure ou la date.
    """
    return await asyncio.to_thread(_sync_get_system_time)

def _sync_get_system_time() -> str:
    from datetime import datetime
    now = datetime.now()
    logger.info("Demande de l'heure système.")
    return f"Date et heure actuelles: {now.strftime('%d/%m/%Y %H:%M:%S')}"

async def get_battery_status() -> str:
    """
    Retourne le niveau de batterie du système Windows si applicable.
    Appelé par l'IA pour conseiller sur le branchement de l'ordinateur.
    """
    return await asyncio.to_thread(_sync_get_battery_status)

def _sync_get_battery_status() -> str:
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

async def list_directory(path: str = ".") -> str:
    """
    Liste les fichiers et dossiers présents dans le répertoire indiqué.
    Appelé par l'IA pour explorer le système de fichiers.
    
    Args:
        path (str): Le chemin absolu ou relatif du dossier à lister. Défaut au répertoire courant.
    """
    return await asyncio.to_thread(_sync_list_directory, path)

def _sync_list_directory(path: str = ".") -> str:
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

async def read_file(filepath: str) -> str:
    """
    Lit le contenu d'un fichier texte.
    Appelé par l'IA lorsqu'on lui demande de lire un fichier.
    
    Args:
        filepath (str): Le chemin du fichier à lire.
    """
    return await asyncio.to_thread(_sync_read_file, filepath)

def _sync_read_file(filepath: str) -> str:
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

async def write_to_file(filepath: str, content: str) -> str:
    """
    Écrit du contenu dans un fichier (écrase le contenu s'il existe).
    Appelé par l'IA lorsqu'elle doit sauvegarder une note ou créer un fichier texte.
    
    Args:
        filepath (str): Le chemin du fichier.
        content (str): Le texte à écrire dans le fichier.
    """
    return await asyncio.to_thread(_sync_write_to_file, filepath, content)

def _sync_write_to_file(filepath: str, content: str) -> str:
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
