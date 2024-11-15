from pydantic import BaseModel
from typing import List, Optional


class Movie(BaseModel):
    title: str
    year_released: int
    type: str
    genre: str
    people_associated: List[str]

class Person(BaseModel):
    name: str
    birth_year: int
    profession: str
    known_for_titles: List[str]

class MovieSearchResponse(BaseModel):
    title: str
    year_released: str
    genre: str
    people_associated: List[str]

class PersonSearchResponse(BaseModel):
    name: str
    birth_year: Optional[str]
    profession: str
    known_for_titles: List[str]

