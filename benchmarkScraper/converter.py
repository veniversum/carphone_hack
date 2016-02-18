import os
import json
import csv

with open('./benchmarkScraper/CPUs.json', 'r') as file:
    cpu_data = json.load(file, encoding='utf-8')
    listOfCPU = cpu_data.values()[0]
    # listOfData[0] # first cpu_data!!!

with open('./data/gpu_scores.csv', 'r') as file:
    listOfGPU = list(csv.DictReader(file, delimiter='|'))  # coerce into a list


def getCPU():
    return listOfCPU


def getGPU():
    return listOfGPU
