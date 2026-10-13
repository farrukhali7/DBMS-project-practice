"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from pets.views import PetListCreateView, PetDetailView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/pets/", PetListCreateView.as_view(), name="pet-list-create"),     #handles requests to /api/pets
    path("api/pets/<int:pk>/", PetDetailView.as_view(), name="pet-detail"),     #handles requests such as /api/pets/1
]