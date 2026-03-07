import psutil
import platform
import asyncio
from core.logger import get_logger

logger = get_logger("system.monitor")

def get_system_health_report() -> str:
    """
    Récupère un rapport complet sur l'état de santé et de charge du système (PC).
    Retourne une chaîne de caractères lisible par le LLM.
    """
    try:
        # Temps écoulé pour moyenner le CPU
        cpu_usage = psutil.cpu_percent(interval=0.1)
        
        # Mémoire RAM
        ram_info = psutil.virtual_memory()
        ram_total_gb = ram_info.total / (1024 ** 3)
        ram_used_gb = ram_info.used / (1024 ** 3)
        ram_percent = ram_info.percent
        
        # Espace Disque
        disk_info = psutil.disk_usage('C:\\')
        disk_total_gb = disk_info.total / (1024 ** 3)
        disk_used_gb = disk_info.used / (1024 ** 3)
        disk_percent = disk_info.percent
        
        # Batterie
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
        return f"Erreur lors de la récupération de la santé du système: {str(e)}"

def get_heavy_processes(limit: int = 5) -> str:
    """
    Identifie les processus consommant le plus de RAM ou CPU.
    """
    try:
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'memory_info']):
            try:
                pinfo = proc.info
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

async def run(interval_seconds: int = None):
    """
    Boucle de monitoring proactive.
    Émet des alertes si les ressources système sont critiques.
    """
    from core.event_bus import bus
    from core.config import settings
    
    interval = interval_seconds or int(settings.system_monitor_interval)
    logger.info(f"Monitor système démarré (Intervalle: {interval}s)")
    
    while True:
        try:
            # Re-lecture dynamique de l'intervalle au cas où il change
            interval = int(settings.system_monitor_interval)
            
            cpu = psutil.cpu_percent(interval=1)
            ram = psutil.virtual_memory().percent
            battery = psutil.sensors_battery()
            
            # Seuils d'alerte
            if cpu > 90:
                await bus.emit("alerts.proactive", {
                    "source": "système",
                    "text": f"Attention Monsieur, la charge CPU est critique ({cpu}%)."
                })
            
            if ram > 90:
                await bus.emit("alerts.proactive", {
                    "source": "système",
                    "text": "La mémoire vive est presque saturée. Le système risque de ralentir."
                })
                
            if battery and not battery.power_plugged and battery.percent < 20:
                await bus.emit("alerts.proactive", {
                    "source": "système",
                    "text": f"Monsieur, le niveau de batterie est faible ({battery.percent}%). Pensez à brancher le secteur."
                })
                
        except Exception as e:
            logger.error(f"Erreur boucle monitor système: {e}")
            
        await asyncio.sleep(interval_seconds)
