import subprocess
import os

def run_migrations():
    print("🔍 Sprawdzanie migracji...")
    alembic_dir = os.path.join(os.path.dirname(__file__), "..", "migrations")

    if not os.path.exists(alembic_dir):
        print("⚠️  Brak folderu migrations. Tworzenie...")
        subprocess.run(["alembic", "init", "migrations"], check=True)

    print("🚀 Generowanie nowych migracji...")
    subprocess.run(["alembic", "revision", "--autogenerate", "-m", "Auto migration"], check=True)

    print("✅ Aplikowanie migracji...")
    subprocess.run(["alembic", "upgrade", "head"], check=True)

if __name__ == "__main__":
    run_migrations()
