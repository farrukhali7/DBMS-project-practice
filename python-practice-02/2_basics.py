#Tuples:
# is like list that cannot be changed
species = ("dog", "cat","horses")
days = ("Monday" , "Tuesday" , "Wednesday")  

# whereas list :
pets = ["bella" , "max" , "rocky"]

#tuple unpacking
pet = ("max", "dog" , 5)
name , species , age = pet

print(name)
print(species)
print(age)

def get_pet():
    return "Max" , "dog" , 5

name, species , age = get_pet()

#for unique values(not repeated) = use sets
animals = {"dog" , "cat" , "dog" , "horse"}
print(animals)

    #-> another use case of set
morning_species = {"dog" , "rabbit" , "bird"}
evening_species = {"dog" , "cat" , "horse"}

morning_species.intersection(evening_species)
morning_species.union(evening_species)

#To retrieve data from API(from dictionaries)
pet = {
    "name": "Max",
    "species": "Dog",
    "age": 5
}

print(pet.get("owner"))
print(pet.get("owner" , "Unknown"))     #it searches for key owner... if it is not found it will show Unknown

pet.keys()  #to get all keys
pet.values()    #to get all values
pet.items()     #to get both
#example
for values in pet.values():
    print(f"{values}" )

#Nested Dictionaries:
pet = {
    "name" : "Max",
    "species" : "dog",
    "owner":{
        "name" : "Ahmed",
        "number" : "0332313323"
    }
}
print(pet["owner"]["name"])

#List of dictionaries
pets = [
    {
        "name" : "max",
        "species" : "dog"
    },
    {
        "name" : "coco",
        "species" : "cat"
    },
    {
        "name" : "jerry",
        "species" : "horse"
    }
]
for pet in pets:
    print(pet["name"])

list[dict]

#we can also write to be more clear
def calculate_bill(consultation = 1500 , medicine = 800 , laboratory = 1200):
    return consultation + medicine + laboratory


# for multiple arguments:
def calculate_total(*costs):
    total = 0

    for cost in costs:
        total += cost

    print(total)
    return total

calculate_total(500,230,424,4324,313)

#for multiple keyword arguments:    
def display_pet(**details):
    print(details)      #it will create a dictionary

display_pet(
    name = "Max",
    species = "Dog",
    age = 5
)

#if want uppercase names:
pets = ["max" , "Bella" , "Rocky"]
uppercase_pets = [pet.upper() for pet in pets]      #[expression for item in collection]
print(uppercase_pets)


#
ages = [2,3,5,8,2,8,33]
older_pets = [age for age in ages if age>5]
print(older_pets)

#Dictionary comprehension
pet_lengths = {
    pet: len(pet)
    for pet in pets
}
print(pet_lengths)


#error handling
try:
    age = int(input("Enter age: "))
    print(age)
except ValueError:
    print("PLease enter a valid number")

# try:
#     # code that might fail
# except:
#     # what to do if it fails
# else:
#     # runs if no error occurred
# finally:
#     # runs regardless

#raising error
# age = -5
# if age < 0:
#     raise ValueError("Age cannot be negative")


#to read and right in files:
# file = open("animals.txt" , "r")
# content = file.read()
# print(content)
# file.close()

#OR you can use with(in 'with' there's no need to close thje file)
# with open("animals.txt" , "r") as file:
#     content = file.read()

# print(content)

# #To write:
# with open("animals.txt" , "w") as file:
#     file.write("Max\n")
#     file.write("Rocky\n")
#     file.write("Bella\n")

#use classes for reusable structure like
class pet:
    pass    #means do nothing here yet

max = pet()

#constructor:  __init__
# to give class our data
# class Pet:
#     def __init__(self,name,species):
#         self.name = name
#         self.species = species

# max = Pet("Max" , "Dog")
# print(max.name)
# print(max.species)

#Methods: class can contain functions;
class Pet:
    def __init__(self,name,species):
        self.name = name
        self.species = species

    def introduce(self):
        print(f"My name is {self.name} and I am a {self.species}.")

max = Pet("Max" , "Dog")
max.introduce()

#Inehritance:
class Animal:
    def eat(self):
        print("Animal is eating.")

class Dog(Animal):
    def bark(self):
        print("Woof!")

dog = Dog()
dog.eat()
dog.bark()
