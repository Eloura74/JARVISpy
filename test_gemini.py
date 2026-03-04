import asyncio
from core.event_bus import bus
from core.config import settings

# S'assurer d'avoir importé le brain pour qu'il s'abonne
from modules.brain.gemini import brain_instance

async def console_chat():
    """Petit script pour tester Gemini en console via l'EventBus"""
    print(f"--- Jarvis Console (Gemini) ---")
    if not settings.gemini_api_key or settings.gemini_api_key == "votre_cle_gemini_ici":
        print("ERREUR: N'oubliez pas d'ajouter votre vraie clé dans le fichier .env")
        return

    # On démarre le brain pour qu'il s'abonne
    brain_instance.start()
    
    # On s'abonne pour capturer la réponse de Gemini
    response_received = asyncio.Event()
    
    async def on_response(data):
        print(f"\n[Jarvis] {data.get('text')}")
        response_received.set()
        
    async def on_error(data):
        print(f"\n[Jarvis ERROR] {data.get('error')}")
        response_received.set()
        
    bus.subscribe("brain.response_generated", on_response)
    bus.subscribe("brain.error", on_error)

    while True:
        try:
            # Demande synchrone dans un async... on bricole pour le test console
            user_input = input("\n[Vous] (tapez 'exit' pour quitter) > ")
            
            if user_input.lower() in ["exit", "quit", "q"]:
                break
                
            if not user_input.strip():
                continue
                
            # Émission de l'événement comme le ferait l'UI ou la Voix
            response_received.clear()
            await bus.emit("ui.text_input", {"text": user_input})
            
            # Attente de la réponse
            await response_received.wait()
            
        except KeyboardInterrupt:
            break

if __name__ == "__main__":
    asyncio.run(console_chat())
