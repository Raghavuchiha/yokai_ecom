# Run once from the project root: python create_admin.py
import getpass

from app.database import supabase
from app.utils import get_hashed_password

username = input("Admin username: ").strip()
password = getpass.getpass("Admin password: ")

supabase.table("admins").insert(
    {"username": username, "password_hash": get_hashed_password(password)}
).execute()
print("Admin created.")
