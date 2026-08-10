from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Admin

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def create_admin():
    db: Session = SessionLocal()

    username = input("Username: ")
    password = input("Password: ")

    existing = db.query(Admin).filter(Admin.username == username).first()

    if existing:
        print("Admin already exists.")
        return

    admin = Admin(
        username=username,
        password=hash_password(password),
    )

    db.add(admin)
    db.commit()

    print("✅ Admin created successfully!")


if __name__ == "__main__":
    create_admin()