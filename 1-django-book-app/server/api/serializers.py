from rest_framework import serializers
from .models import Book, Genre, Review, Author
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class GenreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('type',)


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Review
        fields = ('user', 'title', 'rating', 'description')


class BookSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.name')
    author_id = serializers.ReadOnlyField(source='author.id')
    genres = serializers.StringRelatedField(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Book
        fields = '__all__'
        extra_fields = ('reviews', 'author_id')


class AuthorSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Author
        fields = '__all__'
        extra_fields = ('books', )
