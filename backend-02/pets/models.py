from django.db import models
# class Owner(models.Model):
#     full_name = models.CharField(max_length=150)
#     phone = models.CharField(max_length=20)
#     email = models.EmailField(blank=True)

#     def __str__(self):
#         return self.full_name


#if non-empty owner email must be unqiue:
class Owner(models.Model):
        full_name = models.CharField(max_length=150)
        phone = models.CharField(max_length=20)
        email = models.EmailField(blank=True)

        class Meta:
            constraints = [
                models.UniqueConstraint(
                    fields = ["email"],
                    name = "unique_owner_email",
                )
            ]
        def __str__(self):
            return self.full_name
            
#Built in validation in django
class Pet(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    owner = models.ForeignKey(  #foreign key connects a record in one table to a record in another table
        Owner,
        on_delete=models.PROTECT,       #prevents deleting an owner while pets still reference that owner
        related_name="pets",    #lets you access an owner's pets through owner.pets
    )

    def __str__(self):      #__str__ is human readable representation of a model instance
        return self.name