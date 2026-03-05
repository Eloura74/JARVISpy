import psutil
import platform
import time
from core.logger import get_logger

logger = get_logger("system.monitor")

def get_system_health_report() -> str:
    """
    Récupère un rapport complet sur l'état de santé et de charge du système (PC).
    Retourne une chaîne de caractères lisible par le LLM.
    """
    try:
        # Temps écoulé pour moyenner le CPU (très court pour ne pas bloquer)
        cpu_usage = psutil.cpu_percent(interval=0.1)
        
        # Mémoire RAM
        ram_info = psutil.virtual_memory()
        ram_total_gb = ram_info.total / (1024 ** 3)
        ram_used_gb = ram_info.used / (1024 ** 3)
        ram_percent = ram_info.percent
        
        # Espace Disque (racine C:\ sur Windows, ou /, mais psutil gère par partition)
        # On prend la partition principale où tourne le script
        disk_info = psutil.disk_usage('C:\\')
        disk_total_gb = disk_info.total / (1024 ** 3)
        disk_used_gb = disk_info.used / (1024 ** 3)
        disk_percent = disk_info.percent
        
        # Batterie (si c'est un PC portable)
        battery_info = psutil.sensors_battery()
        battery_text = ""
        if battery_info:
            plugged = "sur secteur" if battery_info.power_plugged else "sur batterie"
            battery_text = f", Batterie: {battery_info.percent}% ({plugged})"
            
        # OS info
        os_name = platform.system()
        os_release = platform.release()

        report = (
            f"Système: {os_name} {os_release}\n"
            f"Charge CPU: {cpu_usage}%\n"
            f"Utilisation RAM: {ram_used_gb:.1f} Go / {ram_total_gb:.1f} Go ({ram_percent}%)\n"
            f"Espace Disque (C:): {disk_used_gb:.1f} Go / {disk_total_gb:.1f} Go ({disk_percent}%){battery_text}"
        )
        
        logger.debug(f"Rapport de santé généré: CPU {cpu_usage}% | RAM {ram_percent}%")
        return report

    except Exception as e:
        logger.error(f"Erreur lors de la récupération des infos système: {e}")
        return f"Erreur lors de la récupération de la santé du système: str{e}"

def get_heavy_processes(limit: int = 5) -> str:
    """
    Identifie les processus consommant le plus de RAM ou CPU. Utile en cas de surcharge.
    """
    try:
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_info']):
            try:
                # cpu_percent peut nécessiter un appel précédent ou être calculé sur un long intervalle,
                # mais ce n'est pas fiable sans blocage. On se base donc d'abord sur la RAM (RSS)
                pinfo = proc.info
                pinfo['vms'] = pinfo['memory_info'].vms / (1024 * 1024) if pinfo['memory_info'] else 0
                pinfo['rss'] = pinfo['memory_info'].rss / (1024 * 1024) if pinfo['memory_info'] else 0
                processes.append(pinfo)
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
                
        # Trier par utilisation RAM (rss) décroissante
        processes = sorted(processes, key=lambda p: p['rss'], reverse=True)
        
        report = "Processus les plus gourmands en mémoire (RAM):\n"
        for i, p in enumerate(processes[:limit]):
            report += f"- {p['name']} (PID: {p['pid']}) : {p['rss']:.1f} Mo\n"
            
        return report
        
    except Exception as e:
        logger.error(f"Erreur listage processus: {e}")
        return "Impossible d'obtenir la liste des processus."
