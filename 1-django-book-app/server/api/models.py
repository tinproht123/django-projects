from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User


class Genre(models.Model):
    type = models.CharField(max_length=50, blank=False, null=False, unique=True)

    class Meta:
        ordering = ['type']

    def __str__(self):
        return self.type


class Author(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    dob = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=3000, blank=False, default="This author doesn't have any description yet!")
    image = models.ImageField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False)
    genres = models.ManyToManyField(Genre, related_name='genre', blank=True)
    author = models.ForeignKey(Author, related_name='books', blank=True, on_delete=models.CASCADE)
    description = models.TextField(max_length=1500, blank=False, default="This book doesn't have description yet!")
    image = models.ImageField(default="")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=100, null=False, blank=False, help_text="Title overall of your review")
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], help_text='Rating in range 0-5')
    description = models.TextField(max_length=1000, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.title
