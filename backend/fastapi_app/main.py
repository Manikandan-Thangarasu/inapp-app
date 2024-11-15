from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from .db import SessionLocal
from .models import Movie, Person
from .schemas import MovieSearchResponse, PersonSearchResponse

app = FastAPI()

origins = [
    "http://localhost:3000",  # React app's domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy user for testing purposes
dummy_user = {
    "username": "testuser",
    "password": "testpassword"
}

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# OAuth2PasswordBearer for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Authentication functions
def verify_token(username: str, password: str):
    if username == dummy_user["username"] and password == dummy_user["password"]:
        return {"username": username}
    return None

def get_current_active_user(token: str = Depends(oauth2_scheme)):
    if token:
        return {"username": dummy_user["username"]}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Endpoints
@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = verify_token(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = "testtoken"  # For testing, use a static token
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/movies/", response_model=MovieSearchResponse)
def search_movie(
    year: Optional[str] = None,
    genre: Optional[str] = None,
    person_name: Optional[str] = None,
    type: Optional[str] = None,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = get_current_active_user(token=token)
    query = db.query(Movie)
    if year:
        query = query.filter(Movie.startYear == year)
    if genre:
        query = query.filter(Movie.genres.contains(genre))
    if type:
        query = query.filter(Movie.titleType == type)
    results = query.all()
    return {"movies": results}

@app.get("/people/", response_model=PersonSearchResponse)
def search_person(
    movie_title: Optional[str] = None,
    name: Optional[str] = None,
    profession: Optional[str] = None,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = get_current_active_user(token=token)
    query = db.query(Person)
    if movie_title:
        query = query.filter(Person.knownForTitles.contains(movie_title))
    if name:
        query = query.filter(Person.primaryName.contains(name))
    if profession:
        query = query.filter(Person.primaryProfession.contains(profession))
    results = query.all()
    return {"people": results}
