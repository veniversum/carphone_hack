import os

listOfLinks = []

f = open('listOfLaptops.txt', 'r')

for line in f:
    line = line[:-1]
    listOfLinks.append(line)

print(listOfLinks)
print(len(listOfLinks))
