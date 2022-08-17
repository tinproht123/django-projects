from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import BookSerializer, MyTokenObtainPairSerializer, AuthorSerializer
from .models import Book, Author, Review
from django.db.models import Q
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_all_books(request):
    q = request.GET.get('q') if request.GET.get('q') is not None else ''
    books = Book.objects.filter(
        Q(title__icontains=q) |
        Q(author__name__icontains=q) |
        Q(genres__type__icontains=q)
    ).distinct()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_book(request, pk):
    book = Book.objects.get(id=pk)
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_authors(request):
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_author(request, pk):
    author = Author.objects.get(id=pk)
    serializer = AuthorSerializer(author, many=False)
    return Response(serializer.data)

