import sys
import os
import asyncio
import json

# Ajout du chemin racine pour les imports
sys.path.append(os.getcwd())

from modules.system.screenshot import analyze_screen

def test_screenshot_vision():
    print("--- TEST SYSTÈME VISION JARVIS ---")
    
    # Test de capture
    print("\n1. Capture d'écran...")
    result_json = analyze_screen(monitor_index=1)
    
    try:
        result = json.loads(result_json)
        if result.get("type") == "image_data":
            print(f"   ✅ Capture réussie : {result.get('description')}")
            print(f"   Format : {result.get('mime_type')}")
            print(f"   Taille data : {len(result.get('data')) // 1024} KB")
        else:
            print(f"   ❌ Format incorrect : {result}")
    except Exception as e:
        print(f"   ❌ Erreur parsing : {e}\n   Brut : {result_json[:100]}...")

if __name__ == "__main__":
    test_screenshot_vision()
