from bs4 import BeautifulSoup
import urllib2
import re
import csv  # for convering dictionary into csv
import os

# get all the links for PC LAPTOP CATEGORY
linkLaptop = []
f = open('pclinks.txt', 'r')
for line in f:
    line = line[:-1]  # does it really matters?
    linkLaptop.append(line)

listOfdetails = []
# scrab each  links
for link in linkLaptop:
    content = urllib2.urlopen(link).read()
    soup = BeautifulSoup(content, "lxml")
    simpleTable = soup.select(".simpleTable > tbody > tr")

    details = {}
    for tr in simpleTable:
        key = tr.th.text.encode('utf8', 'ignore')
        cups = tr.td.text

        # translating into list
        points = cups.split('\n')

        values = []
        for p in points:
            p = p.encode('utf8', 'ignore')
            if p[0] == '-':  # list of pointers
                values.append(p[2:])
            else:
                values.append(p)

        details[key] = values

    listOfdetails.append(details)

# printing to check:
for details in listOfdetails:
    # each detail:
    for k in details.keys():
        print k, details[k]
