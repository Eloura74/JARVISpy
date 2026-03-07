import sys
import os
import asyncio

# Ajout du chemin racine pour les imports
sys.path.append(os.getcwd())

from modules.memory.manager import memory
from modules.memory.vector import vector_memory

async def test_memory_systems():
    print("--- TEST SYSTÈME MÉMOIRE JARVIS ---")
    
    # 1. Test SQLite (Faits)
    print("\n1. Test SQLite...")
    memory.remember_fact("test_key", "Ceci est une valeur de test")
    val = memory.get_fact("test_key")
    print(f"   Récupération SQLite : {val}")
    
    # 2. Test Vectoriel (Indexation)
    print("\n2. Test Vectoriel (ChromaDB)...")
    # Note: Cela peut prendre quelques secondes la première fois (téléchargement modèle)
    vector_memory.add_memory(
        "L'utilisateur aime particulièrement les sushis au saumon.",
        {"type": "pref_alimentaire"}
    )
    print("   Donnée indexée.")
    
    # 3. Test RAG (Recherche sémantique)
    print("\n3. Test RAG...")
    context = memory.get_relevant_context("Qu'est-ce que l'utilisateur aime manger ?")
    print(f"   Contexte retrouvé :\n{context}")
    
    if "sushis" in context:
        print("\n✅ TEST MÉMOIRE VECTORIELLE RÉUSSI")
    else:
        print("\n❌ ÉCHEC DU TEST MÉMOIRE VECTORIELLE")

if __name__ == "__main__":
    asyncio.run(test_memory_systems())
