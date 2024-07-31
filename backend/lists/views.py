from rest_framework import generics
from .models import List
from .serializers import ListSerializer

class ListCreateAPIView(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class ListRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer