import sqlite3
import json

def read_history():
    conn = sqlite3.connect("a:/02-PROJECTS/JarvisDecoupe/data/jarvis.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # On regarde les 10 derniers messages
    cursor.execute("SELECT * FROM conversations ORDER BY id DESC LIMIT 10")
    rows = cursor.fetchall()
    
    print("--- DERNIERS MESSAGES ---")
    for row in rows:
        print(f"[{row['timestamp']}] {row['role'].upper()}: {row['content'][:200]}...")

if __name__ == "__main__":
    read_history()
