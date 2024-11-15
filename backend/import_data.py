import os
import django
import pandas as pd
import logging

# Set up logging
logging.basicConfig(
    filename='import_log.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Set the correct Django settings module path
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Initialize Django
django.setup()

# Import your models
from movies.models import Person, Movie


def import_person_data():
    # Load the 'name.basics.tsv' dataset
    file_path = os.path.join(os.getcwd(), 'data', 'name.basics.tsv')
    person_data = pd.read_csv(file_path, sep='\t', dtype=str).fillna('')

    # Counter for successfully added records
    added_count = 0

    # Iterate over each row and create Person objects
    for _, row in person_data.iterrows():
        try:
            # Check if Person already exists in the database (based on nconst)
            if not Person.objects.filter(nconst=row['nconst']).exists():
                if added_count < 100:  # Add up to 100 records only
                    Person.objects.create(
                        nconst=row['nconst'],
                        primaryName=row['primaryName'],
                        birthYear=row['birthYear'],
                        deathYear=row['deathYear'],
                        primaryProfession=row['primaryProfession'],
                        knownForTitles=row['knownForTitles']
                    )
                    added_count += 1
                    logging.info(f"Added: {row['primaryName']} (nconst: {row['nconst']})")  # Log added record
                else:
                    break  # Stop after adding 100 records
            else:
                logging.info(f"Skipped (already exists): {row['primaryName']} (nconst: {row['nconst']})")
        except Exception as e:
            logging.error(f"Error adding Person {row['primaryName']} (nconst: {row['nconst']}): {str(e)}")

    logging.info(f"Person data import completed. {added_count} records added.")


def import_movie_data():
    # Load the 'title.basics.tsv' dataset
    file_path = os.path.join(os.getcwd(), 'data', 'title.basics.tsv')
    movie_data = pd.read_csv(file_path, sep='\t', dtype=str).fillna('')

    # Counter for successfully added records
    added_count = 0

    # Iterate over each row and create Movie objects
    for _, row in movie_data.iterrows():
        try:
            # Check if Movie already exists in the database (based on tconst)
            if not Movie.objects.filter(tconst=row['tconst']).exists():
                if added_count < 100:  # Add up to 100 records only
                    Movie.objects.create(
                        tconst=row['tconst'],
                        titleType=row['titleType'],
                        primaryTitle=row['primaryTitle'],
                        originalTitle=row['originalTitle'],
                        isAdult=bool(int(row['isAdult'])),
                        startYear=row['startYear'],
                        endYear=row['endYear'],
                        runtimeMinutes=row['runtimeMinutes'],
                        genres=row['genres']
                    )
                    added_count += 1
                    logging.info(f"Added: {row['primaryTitle']} (tconst: {row['tconst']})")  # Log added record
                else:
                    break  # Stop after adding 100 records
            else:
                logging.info(f"Skipped (already exists): {row['primaryTitle']} (tconst: {row['tconst']})")
        except Exception as e:
            logging.error(f"Error adding Movie {row['primaryTitle']} (tconst: {row['tconst']}): {str(e)}")

    logging.info(f"Movie data import completed. {added_count} records added.")


if __name__ == "__main__":
    # Run the import functions
    import_person_data()
    import_movie_data()
    logging.info("Data import completed.")
