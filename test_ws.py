import asyncio
import websockets
import json

async def test_client():
    uri = "ws://127.0.0.1:8000/ws"
    print(f"Tentative de connexion à {uri}...")
    
    try:
        async with websockets.connect(uri) as websocket:
            print("Connecté au serveur WebSocket !")
            
            # Écoute du message de bienvenue
            welcome = await websocket.recv()
            print(f"Reçu du serveur: {welcome}")
            
            # Envoi d'un événement factice pour tester
            test_msg = {
                "action": "test_ping",
                "payload": {"data": "Bonjour depuis le client de test"}
            }
            await websocket.send(json.dumps(test_msg))
            print(f"Envoyé au serveur: {test_msg}")
            
            # On attend un peu pour laisser le serveur traiter
            await asyncio.sleep(2)
            print("Test terminé avec succès.")
            
    except ConnectionRefusedError:
        print("Erreur: Connexion refusée. Le serveur est-il bien lancé avec 'venv\\Scripts\\python.exe main.py' ?")
    except Exception as e:
        print(f"Erreur inattendue: {e}")

if __name__ == "__main__":
    asyncio.run(test_client())
