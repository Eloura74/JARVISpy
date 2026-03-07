import os
import asyncio
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

def open_application(app_name: str) -> str:
    """
    Ouvre une application sur le système Windows.
    Appelé par l'IA lorsqu'elle cherche à ouvrir un programme.
    
    Args:
        app_name (str): Le nom de l'application à ouvrir (ex: "notepad", "calc", "chrome").
        
    Returns:
        str: Un message de confirmation ou d'erreur.
    """
    print(f"[TEST] Ouverture de {app_name}")
    return f"Application '{app_name}' lancée avec succès."

async def test_tools():
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
    
    config = types.GenerateContentConfig(
        temperature=0.7,
        tools=[open_application],
    )
    
    chat = client.chats.create(model="gemini-2.5-flash", config=config)
    
    response = chat.send_message("Ouvre la calculatrice s'il te plait.")
    
    print("Response:")
    print(response.text)
    
    if response.function_calls:
        print("\nFunction calls detected:")
        for fn in response.function_calls:
            print(f"Name: {fn.name}")
            print(f"Args: {fn.args}")
            
            # Execute
            if fn.name == "open_application":
                res = open_application(**fn.args)
                # send back
                res2 = chat.send_message(
                    [types.Part.from_function_response(
                        name=fn.name,
                        response={"result": res}
                    )]
                )
                print("\nFinal response:")
                print(res2.text)

if __name__ == "__main__":
    asyncio.run(test_tools())
