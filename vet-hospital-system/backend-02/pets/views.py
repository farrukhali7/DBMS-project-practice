# # from django.http import JsonResponse

# # def pet_list(request):
# #     pets = [
# #         {
# #             "id" : 1,
# #             "name" : "Max",
# #             "species" : "Dog",
# #         },
# #         {
# #             "id" : 2,
# #             "name" : "Bella",
# #             "species" : "Cat",
# #         }, 
# #         {
# #             "id" : 3,
# #             "name" : "coco",
# #             "species" : "Cat",
# #         },
# #     ]

# #     return JsonResponse({"pets": pets})



# ## Build an endpoint to list and create pets

# # class PetListCreateView(generics.ListCreateAPIView):    #listcreateAPIView provides two operations: GET , POST
# #     queryset = Pet.objects.all()
# #     serializer_class = PetSerializers

# #Django provides select_related() to fetch foreign key related objects together using a SQL join
from rest_framework import generics
from .models import Pet, Owner
from .serializers import PetSerializer,OwnerSerializer

class PetListCreateView(generics.ListCreateAPIView):
    queryset = Pet.objects.select_related("owner").all()
    serializer_class = PetSerializer

class PetDetailView(generics.RetrieveUpdateDestroyAPIView):     #RetrieveUpdateDestroyAPIView supports = GET,PUT,PATCH,DELETE........ it is used to implement CRUD functionality
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from .permissions import IsVeterinarianOrAdmin


class ClinicalAccessTestView(APIView):
    permission_classes = [IsVeterinarianOrAdmin]    #it only establishes that the user is authenticated. It does not establish that the user owns a particular pet

    def get(self, request):
        return Response({
            "message": "Clinical endpoint access granted."
        })

#generic views save you from writing separate functions for every HTTP method

class OwnerListCreateView(generics.ListCreateAPIView):  #listcreateAPIview gets both listing(GET request) and creating(POST request) capabilities
    queryset = Owner.objects.all().order_by("id")   #query set: what data you want to work with example owner.objects.all()
    serializer_class = OwnerSerializer  #serializer_class: how to translate that data

class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer