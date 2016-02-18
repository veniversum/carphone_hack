import os
import json

with open('./benchmarkScraper/CPUs.json','r') as file:
    cpu_data = json.load(file,encoding = 'utf-8')
    listOfData = cpu_data.values()[0]
    # listOfData[0] # first cpu_data!!!


def getCPU():
    return listOfData
