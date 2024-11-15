```markdown
# Movie Application - Task

## Overview
This project was created as part of an interview task. The project consists of both frontend and backend components, along with a database for storing movie-related data. The backend uses **FastAPI** with **SQLAlchemy** for database operations, and the frontend allows users to search for movies and people, with filters available for various attributes.

The project repository is hosted on [GitHub](https://github.com/Manikandan-Thangarasu/inapp-app.git).

## Project Structure

```
MovieApplication/
├── backend/
│   ├── fastapi/                # FastAPI server and database logic
│   ├── db.sqlite               # SQLite database
└── frontend/                   # Frontend UI files (HTML, JavaScript, CSS)
```

- **movieApplication_db**: Contains database-related files and sample datasets (in TSV format).
  - `name.basics.tsv.gz`: Dataset for person names in the movie industry.
  - `title.basics.tsv.gz`: Dataset for movie titles.
  
- **MovieApplication**: Contains both frontend and backend code for the application:
  - **backend**: FastAPI-based backend for serving movie and person data through REST APIs.
  - **frontend**: User interface for searching movies and people, with filter options.

## Features

### API Endpoints:
1. **Movie Search API**:
   - Allows searching for movies by:
     - Title, Year, Genre, Type, and People associated with the movie.
   - Supports filters for:
     - Year, Genre, Person Name, Type (Movie/TV Series/Documentary).
   
2. **Person Search API**:
   - Allows searching for people in the movie industry by:
     - Name, Profession, and Movie Title.
   - Supports filters for:
     - Movie Title, Name, Profession (Writer, Director, Actor).

### Frontend:
- UI to search for movies with filter options:
  - Year, Genre, Type, Person Name.
  - Results displayed in a grid with movie details.
  
- UI to search for people with filter options:
  - Movie Title, Name, Profession.
  - Results displayed in a grid with person details.

### Authentication:
- JWT-based authentication is used for API access.
- Hardcoded users are provided, and only authenticated users can search and access the APIs.

## Setup and Running Instructions

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/Manikandan-Thangarasu/inapp-app.git
```

### 2. Install Backend Dependencies
Navigate to the backend directory and install the required dependencies:

```bash
cd MovieApplication/backend
pip install -r requirements.txt
```

### 3. Set Up the Database
The database is set up using **SQLite**. If the database file `db.sqlite` is not already available, you can download it from the following link:

[Download DB SQLite File from Google Drive](https://drive.google.com/file/d/1brRgonjCAvefni4TKmv-FD9wzYKqQMmD/view)

Once downloaded, place the `db.sqlite` file inside the `backend` folder.

The sample datasets (`name.basics.tsv.gz` and `title.basics.tsv.gz`) are also available in the `backend` folder. Make sure these files are in place before starting the backend server.

### 4. Run the FastAPI Backend
In the backend directory, run the FastAPI server:

```bash
uvicorn fastapi.main:app --reload
```

This will start the backend server, and it will be available at `http://localhost:8000`.

### 5. Running the Frontend
For the frontend, open the HTML file (or follow specific framework instructions if using a framework like React or Angular) to access the UI. The frontend allows users to search movies and people by applying various filters.

You can directly open the frontend files by navigating to the `frontend` folder and opening the HTML file in your browser.

### 6. Accessing the APIs
The APIs are secured with **JWT Authentication**. To authenticate, use a hardcoded user and generate a JWT token:

```bash
# Sample command to obtain JWT token
curl -X 'POST' 'http://localhost:8000/token' -d 'username=your-username&password=your-password'
```

Once authenticated, you can use the token to access the search endpoints.

### 7. Use the Search Functionality
- **Search Movies**: Apply filters like Year, Genre, Type, and Person Name to find movies.
- **Search People**: Apply filters like Movie Title, Name, and Profession to find people associated with movies.

---

## Notes
- All code, datasets, and the database are included in the project.
- The database schema is created using SQLAlchemy.
- JWT authentication is used to secure the API endpoints.
- The project is fully functional, with both backend and frontend components working together.

---

Feel free to explore the repository and let me know if you have any questions!

Best regards,  
Manikandan

--- 

```