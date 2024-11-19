from pydantic import BaseModel
from typing import List, Optional

class MovieResponse(BaseModel):
    title: Optional[str]  # Optional in case of NULL
    year_released: Optional[int]
    type: Optional[str]
    genre: Optional[str]

    class Config:
        from_attributes = True

class PersonResponse(BaseModel):
    nconst: str
    primaryName: str
    birthYear: Optional[int] = None
    deathYear: Optional[int] = None
    primaryProfession: Optional[str] = None
    knownForTitles: Optional[str] = None

    class Config:
        from_attributes = True
