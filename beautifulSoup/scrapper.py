from bs4 import BeautifulSoup
import urllib2
import re
import os

# to be included:
linkLaptop = []

for link in linkLaptop:
    content = urllib2.urlopen(link).read()
    soup = BeautifulSoup(content,"lxml")
    simpleTable = soup.select(".simpleTable > tbody > tr")
    # print simpleTable

    details = {}
    for tr in simpleTable:
        key = tr.th.text
        cups = list(tr.td.text)
        details[key] = cups

    
