from duckduckgo_search import DDGS

print("\n--- TEST DDGS DIRECT ---")
query = "les 5 meilleures intelligences artificielles"

print("\n1. Test sans arguments additionnels:")
with DDGS() as ddgs:
    for r in ddgs.text(query, max_results=3):
        print(f"  - {r.get('title')}")

print("\n2. Test avec region='fr-fr':")
with DDGS() as ddgs:
    for r in ddgs.text(query, region='fr-fr', max_results=3):
        print(f"  - {r.get('title')}")

print("\n3. Test avec mots clés francophone strict:")
with DDGS() as ddgs:
    for r in ddgs.text(query + " en france en français", region='fr-fr', max_results=3):
        print(f"  - {r.get('title')}")
