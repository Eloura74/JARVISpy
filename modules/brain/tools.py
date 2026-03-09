"""
Module de gestion des outils (functions) pour Gemini.
Permet de regrouper et d'exporter proprement les outils disponibles pour l'intelligence artificielle.
"""

# Import des fonctions système Windows
from modules.system.windows import (
    find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
    get_system_time, get_battery_status,
    list_directory, read_file, write_to_file, open_file_or_url
)

# Import des fonctions Web
from modules.system.web import interactive_web_search, close_web_results, direct_google_search

# Import des services tiers (Maison Connectée, Calendrier, etc.)
from modules.services.calendar import calendar_service
from modules.services.vision import vision_service
from modules.services.gmail import gmail_service
from modules.services.homeassistant import ha_service
from modules.services.moonraker import (
    get_printer_status, get_print_progress,
    pause_print, resume_print, cancel_print, emergency_stop,
    set_moonraker_extruder_temp, set_moonraker_bed_temp, show_moonraker_camera
)
from modules.services.bambu import (
    get_bambu_status, get_bambu_progress,
    pause_bambu, resume_bambu, stop_bambu,
    set_bambu_extruder_temp, set_bambu_bed_temp, show_bambu_camera
)

# Utils, Intelligence et Mémoire
from modules.system.screenshot import analyze_screen
from modules.memory.context import context_buffer
from modules.memory.manager import reset_all_memories, remember_info, forget_info
from modules.notifications.whatsapp import send_whatsapp, get_whatsapp_status
from modules.services.weather import get_current_weather, get_weather_forecast
from modules.services.maps import maps_service

# Liste exhaustives des outils passés à l'API Gemini
JARVIS_TOOLS = [
    find_and_launch_app, close_application, manage_window_state, move_window_to_screen,
    get_system_time, get_battery_status,
    list_directory, read_file, write_to_file,
    open_file_or_url, interactive_web_search, close_web_results, direct_google_search,
    remember_info, forget_info, reset_all_memories,
    # get_system_health_report, get_heavy_processes, # Retirés pour le moment (si installés)
    calendar_service.get_upcoming_events, calendar_service.create_event,
    calendar_service.prepare_calendar_action,
    calendar_service.update_event, calendar_service.delete_event,
    vision_service.analyze_surroundings,
    gmail_service.get_unread_emails_summary, gmail_service.mark_email_as_read,
    ha_service.get_entity_state, ha_service.call_service, ha_service.list_entities,
    ha_service.search_entities_by_name,
    get_printer_status, get_print_progress,
    pause_print, resume_print, cancel_print, emergency_stop,
    set_moonraker_extruder_temp, set_moonraker_bed_temp, show_moonraker_camera,
    get_bambu_status, get_bambu_progress,
    pause_bambu, resume_bambu, stop_bambu,
    set_bambu_extruder_temp, set_bambu_bed_temp, show_bambu_camera,
    analyze_screen,
    context_buffer.get_suggestions,
    send_whatsapp, get_whatsapp_status,
    get_current_weather, get_weather_forecast,
    maps_service.get_travel_info
]

# Dictionnaire de mapping pour l'exécution automatique des fonctions par le SDK
# (Le SDK google-genai utilise normalement directement la liste ci-dessus, 
# mais un mapping peut aider pour la validation manuelle si besoin)
TOOLS_MAPPING = {func.__name__: func for func in JARVIS_TOOLS}
