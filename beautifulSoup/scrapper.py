from bs4 import BeautifulSoup
import urllib2
import re
import os

# get all the links for PC LAPTOP CATEGORY
linkLaptop = []
f = open('pclinks.txt','r')
for line in f:
    line = line[:-1] #does it really matters?
    linkLaptop.append(line)

listOfdetails = []
# scrab each  links
for link in linkLaptop:
    content = urllib2.urlopen(link).read()
    soup = BeautifulSoup(content,"lxml")
    simpleTable = soup.select(".simpleTable > tbody > tr")

    details = {}
    for tr in simpleTable:
        key = tr.th.text
        cups = tr.td.text
        details[key] = cups

    listOfdetails.append(details)
#
# print "hello"
# for i in listOfdetails:
#     print i
