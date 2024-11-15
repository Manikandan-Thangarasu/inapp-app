# backend/fastapi_app/create_db.py

from .db import engine  # assuming engine is defined in db.py
from .models import Base  # Make sure this import is correct

# Create the database tables
Base.metadata.create_all(bind=engine)
