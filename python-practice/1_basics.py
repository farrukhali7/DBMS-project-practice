# print("Hello World!")

# # variable declarations:   
# pet_name = "coco"
# age = 10        # no need to declare type like let,const etc .....python determines on its own
# weight = 55.2
# is_admitted = False
# medical_record = None       #None = null in javascript
# print("Pet name is:" , pet_name)
# print(f"{pet_name} is {age} years old, having a weight of {weight}")

# print(type(age)) #to check the type

# #To perform calculations in python:
# price = 500
# quantity = 2
# total = price * quantity
# print(total)

# # built in functionsin python
# print(pet_name.capitalize())
# print(pet_name.upper())
# print(len(pet_name))

# #lists:
# pets = ["max" , "jerry" , "coco"]
# print(pets[1])
# pets.append("Rocky")
# print(pets[3])
# pets.remove("coco")
# print(len(pets))


# #Dictionaries == objects in js
# pet = {
#     "name" : "max",
#     "age": 5
# }

# print(pet["age"])

# # to modify the dictionary:
# pet["age"] = 7
# print(pet["age"])

# age = 5
# if age>= 10:
#     print("Adult")
# elif age >= 5:
#     print("young adult")
# else:
#     print("Minor")


# #Logical operators:
# # && == and
# # || == or
# #! == not

# #loops:
# pets = ["coco" , "jerry" , "max"]
# for pet in pets:
#     print(pet)


# #looping in dictionaries:
# pet = {
#     "name": "max",
#     "age" : 7,
#     "species":"Dog"
# }

# for key , values in pet.items():    
#     print(key , values)


# #Fucntions:
# def calculate_total(price, quantity):
#     return price * quantity

# total = calculate_total(200 , 5)
# print(total)

# def greet(name = "Owner"):
#     print(f"hello, {name}")

# greet()
# greet("Ahmed")

# #User Input:
# name = input("Enter your name: ")
# print(f"Pet name: {name}")  #as input takes by default string

# age = int(input("Enter your age: "))
# print(f"Pet Age: {age}")

# #Type conversion:
# age = 5
# age = str(age)
# print(type(age))


            #FIRST MINI PROGRAM =

owner_name = input("Enter Owner's name: ")
pet_name = input("Enter Pet's name: ")
species = input("Enter Species: ")
Breed = input("Enter Breed: ")
Age = int(input("Enter Age: "))
Weight = int(input("Enter Weight of pet: "))
vaccination_status = bool(input("is Vaccinated? : "))

print(f"Owner: {owner_name}")
print(f"Pet: {pet_name}")
print(f"Species: {species}")
print(f"Breed: {Breed}")
print(f"Age: {Age}")
print(f"Weight: {Weight}")
print(f"Vaccinated: {vaccination_status}")


                # SECOND MINI PROGRAM; Pet checkup:
temperature = int(input("Enter pet's temperature: "))
if temperature >= 40:
    print("Temperature is elevated")
else:
    print("Temperature is within the normal range")

                # THIRD MINI PROGRAM; calculation
def calculate_bill(consulatation_fees , medicine_cost , laboratory_cost):
    total_bill = consulatation_fees + medicine_cost + laboratory_cost
    return total_bill

print(calculate_bill(1500 , 800 ,  1200))


                