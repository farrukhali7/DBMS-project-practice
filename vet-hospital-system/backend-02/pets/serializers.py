# # # from rest_framework import serializers 
# # # from .models import Pet

# # # class PetSerializers(serializers.ModelSerializer):
# # #     class Meta:
# # #         model = Pet
# # #         FileNotFoundError = ["id", "name","species","age","owner"]
# # #         fields =  "__all__"

# # from rest_framework import serializers
# # from .models import Pet

# # class PetSerializer(serializers.ModelSerializer):
# #     class Meta: #defines configuration for the serializer
# #         model = Pet
# #         fields = ["id", "name","species","age","owner"]

# #     #Custom validation: 
# #     #basic validation like submitting form with empty name field,or negative age can be handled by DRM(Django rest framework)
# #     def validate_name(self,value):
# #         if not value.strip():   #strip removes the spaces from beginning and end of a string and title converts first letter of each word to uppercase and rest of the letters to lowercase
# #             raise serializers.ValidationError(
# #                 "Pet name cannot be empty."
# #             )

# #         return value.strip()

# #     def validate_age(self,value):
# #         if value > 50:
# #             raise serializers.ValidationError(
# #                 "Please verify the pet's age"
# #             )

# #         return value

# #     def validate_species(self,value):
# #         allowed_species = ["Dog" , "Cat" ,"bird", "Rabbit"]
# #         if value.strip().title() not in allowed_species:
# #             raise serializers.ValidationError(
# #                 "Species must be dog,cat,bird or rabbit"
# #             )
# #         return value.strip().title()

# #when checking multiple fields:
# from rest_framework import serializers
# class AppointmentTimeSerializer(serializers.Serializer):    #serializer.Serializer os used because validation of two fields without requiring an appointment model
#     #Model serializer is the automatic one. it builds automaticaslly all the fields for you based on your database columns whereas;
#     #serializers.Serializer is the manual one, you have to write out every single field mannually
#     start_time = serializers.DateTimeField()
#     end_time = serializers.DateTimeField()

#     def validate(self, data):
#         if data["end_time"] <= data["start_time"]:
#             raise serializers.ValidationError(
#                 "End time must be later than start time."
#             )
#         return data

#How should API return an owner:
from rest_framework import serializers
from .models import Owner, Pet

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ["id" , "full_name" , "phone","email"]

    def validate_full_name(self,value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Owner name cannot be empty"
            )
        return value

    def validate_phone(self,value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number cannot be empty"
            )
        return value

class PetSerializer(serializers.ModelSerializer):
    owner_details = OwnerSerializer(    #nested owner serializer
        source = "owner",
        read_only = True,
    )
    class Meta:
        model = Pet
        fields = [
            "id",
            "name",
            "species",
            "age",
            "owner",
            "owner_details",
        ]
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Pet name cannot be empty"
            )
        return value.strip()

    def validate_age(self,value):
        if value > 50:
            raise serializers.ValidationError(
            "please verify the pet's age"
            )
        return value

    def validate_species(self,value):
        allowed_species = ["Dog" , "Cat","Bird","rabbit"]
        cleaned_value = value.strip().title()

        if cleaned_value not in allowed_species:
            raise serializers.ValidationError(
                "species must be dog,cat,bird,or rabbit"
            )
        return cleaned_value

    