from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .db import SessionLocal
from .models import Movie, Person
from .schemas import MovieResponse, PersonResponse
import logging

app = FastAPI()

# CORS settings
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 settings
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dummy user credentials (replace with real authentication later)
DUMMY_USER = {
    "username": "testuser",
    "password": "testpassword"
}


# Dependency: Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Authentication functions
def verify_user_credentials(username: str, password: str):
    """Verify username and password."""
    if username == DUMMY_USER["username"] and password == DUMMY_USER["password"]:
        return {"username": username}
    return None


def get_current_user(token: str = Depends(oauth2_scheme)):
    """Retrieve current user from the token."""
    if token == "testtoken":  # Simulating a valid token for testing
        return {"username": DUMMY_USER["username"]}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )


# API Endpoints
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Simulate login and return an access token."""
    user = verify_user_credentials(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": "testtoken", "token_type": "bearer"}


@app.get("/movies/all", response_model=List[MovieResponse])
def get_all_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    response = []
    for movie in movies:
        response.append(
            MovieResponse(
                title=movie.primaryTitle,
                year_released=movie.startYear,
                type=movie.titleType,
                genre=movie.genres or "Unknown",  # Handle missing genre
            )
        )
    return response


@app.get("/people/all", response_model=List[PersonResponse])
def get_all_people(db: Session = Depends(get_db)):
    """Fetch all people."""
    try:
        people = db.query(Person).all()
        response = [
            PersonResponse(
                nconst=person.nconst,
                primaryName=person.primaryName,
                birthYear=person.birthYear if person.birthYear != '\\N' else None,
                deathYear=person.deathYear if person.deathYear != '\\N' else None,
                primaryProfession=person.primaryProfession if person.primaryProfession != '\\N' else None,
                knownForTitles=person.knownForTitles if person.knownForTitles != '\\N' else None,
            )
            for person in people
        ]
        if not response:
            raise HTTPException(status_code=404, detail="No people found")
        return response
    except Exception as e:
        import logging
        logging.error(f"Error fetching people: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/movies/search", response_model=List[MovieResponse])
def search_movies(
        year: Optional[str] = None,
        genre: Optional[str] = None,
        type: Optional[str] = None,
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_scheme),
):
    """Search movies with filters."""
    get_current_user(token)  # Authenticate user
    query = db.query(Movie)

    # Apply filters
    if year:
        query = query.filter(Movie.startYear == year)
    if genre:
        query = query.filter(Movie.genres.contains(genre))
    if type:
        query = query.filter(Movie.titleType == type)

    return query.all()


@app.get("/people/search", response_model=List[PersonResponse])
def search_people(
        movie_title: Optional[str] = None,
        name: Optional[str] = None,
        profession: Optional[str] = None,
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_scheme),
):
    """Search people with filters."""
    get_current_user(token)  # Authenticate user
    query = db.query(Person)

    # Apply filters
    if movie_title:
        query = query.filter(Person.knownForTitles.contains(movie_title))
    if name:
        query = query.filter(Person.primaryName.contains(name))
    if profession:
        query = query.filter(Person.primaryProfession.contains(profession))

    return query.all()
