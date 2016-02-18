import benchmarkScraper.converter as cpu
import beautifulSoup.scrapper as curry
import os
from bs4 import BeautifulSoup
import urllib2
import re

# global variables
cpus =  cpu.getCPU() # list of dictionary
curryProd = curry.getListOfProducts() # list of dictionary
gpulink = 'http://www.videocardbenchmark.net/gpu_list.php'
cpulink = 'https://www.cpubenchmark.net/cpu_list.php'

# print curryProd
# print cpus

matching = {}
for prod in curryProd:
    # gpu
    try:
        prod['GPU']
    except StandardError:
        gpu = 0
    else:
        gpu = prod['GPU']
    # Processor
    try:
        prod['Processor']
    except StandardError:
        processor = 0
    else:
        processor = prod['Processor'].encode('utf-8','replace').split('\n')[0][2:]

    # iterating through the cpus to find the benchmark for the cpu in query
    # then add benchmark into prod
    match = False
    while not match:
        for cpu in cpus:

            if re.match(processor, cpu['model']):
                print 'YES!'
    # print gpu
    # print processor
