from django.contrib import admin
from .models import Book, Genre, Author, Review

# Register your models here.
admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Author)
admin.site.register(Review)