from django.db import models


class Person(models.Model):
    nconst = models.CharField(max_length=10, primary_key=True)
    primaryName = models.CharField(max_length=255)
    birthYear = models.CharField(max_length=4, null=True, blank=True)
    deathYear = models.CharField(max_length=4, null=True, blank=True)
    primaryProfession = models.CharField(max_length=255)
    knownForTitles = models.CharField(max_length=255)

    def __str__(self):
        return self.primaryName


class Movie(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    titleType = models.CharField(max_length=50)
    primaryTitle = models.CharField(max_length=255)
    originalTitle = models.CharField(max_length=255)
    isAdult = models.BooleanField()
    startYear = models.CharField(max_length=4)
    endYear = models.CharField(max_length=4, null=True, blank=True)
    runtimeMinutes = models.CharField(max_length=10, null=True, blank=True)
    genres = models.CharField(max_length=255)

    def __str__(self):
        return self.primaryTitle
