from rest_framework.permissions import BasePermission   #base permission is DRF's base class for custom permissions

class IsVeterinarianOrAdmin(BasePermission):
    message = "Only veterinarians and administrators may access this resource"

    def has_permission(self,request,view):
        user = request.user     #request.user is the authenticated django user

        if not user or not user.is_authenticated:
            return False
        is_admin = user.is_superuser
        is_veterinarian = user.groups.filter(
            name = "Veterinarian"
        ).exists()  #check whether the user belongs to a group named veterinarian

        return is_admin or is_veterinarian  #allows the request if either condition is true