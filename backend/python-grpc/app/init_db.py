from app.database import engine, Base
from app.models import menu_categories, menu_items, menus, order_items, orders, restaurants
from app.models import tasks, user_favorite_menu_items, user_favorite_restaurants, users


def init_db():
    print("Tworzenie tabel w bazie danych...")
    Base.metadata.create_all(engine)
    print("Baza danych została zainicjalizowana.")

if __name__ == "__main__":
    init_db()
