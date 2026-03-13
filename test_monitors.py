"""
Script de diagnostic pour identifier les écrans disponibles.
Exécute ce script pour voir la numérotation exacte de tes écrans.
"""
import mss

print("=== DIAGNOSTIC ÉCRANS MSS ===\n")

with mss.mss() as sct:
    monitors = sct.monitors
    
    print(f"Nombre total d'écrans détectés: {len(monitors) - 1}\n")
    
    for i, mon in enumerate(monitors):
        if i == 0:
            print(f"monitors[{i}] = TOUS LES ÉCRANS COMBINÉS")
            print(f"  Position: {mon}")
            print()
        else:
            print(f"monitors[{i}] = ÉCRAN {i}")
            print(f"  Position: left={mon['left']}, top={mon['top']}")
            print(f"  Taille: {mon['width']}x{mon['height']}")
            print()
    
    print("\n=== INSTRUCTIONS ===")
    print("Pour capturer l'écran en HAUT au centre, utilise le numéro de l'écran avec top < 0")
    print("Pour capturer les écrans en BAS, utilise les numéros avec top >= 0")
    print("\nExemple:")
    print("  'Jarvis, analyse écran 1' → Capture monitors[1]")
    print("  'Jarvis, analyse écran 2' → Capture monitors[2]")
    print("  etc.")
