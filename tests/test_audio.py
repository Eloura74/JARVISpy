import asyncio
import time
from core.event_bus import bus
from core.config import settings

# On importe les modules pour qu'ils s'instancient et s'abonnent
from modules.brain.gemini import brain_instance
from modules.audio.tts import tts_instance
from modules.audio.stt import stt_instance

async def voice_chat():
    """Test ultime de la boucle STT -> Brain -> TTS"""
    print(f"--- JARVIS Test Audio ---")
    if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
        print("ERREUR: Clé API manquante dans .env")
        return

    # Démarrage des modules (abonnement au bus)
    brain_instance.start()
    tts_instance.start()
    
    print("\nInitialisation du micro... Patientez 2 secondes.")
    # Le start du STT prend un peu de temps pour calibrer le bruit de fond
    stt_instance.start()
    
    # On joue un petit son d'intro via le bus directement
    await bus.emit("brain.response_generated", {"text": "Système audio en ligne. À votre écoute, Monsieur."})
    
    # On laisse le programme tourner à l'infini pour écouter
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("\nArrêt du test audio.")
        stt_instance.stop()

if __name__ == "__main__":
    asyncio.run(voice_chat())
