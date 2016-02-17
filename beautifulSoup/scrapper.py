from bs4 import BeautifulSoup
import urllib2
import re
import csv  # for convering dictionary into csv
import os
import sqlite3

# get all the links for PC LAPTOP CATEGORY
linkLaptop = []
f = open('./pclinks.txt', 'r')
for line in f:
    line = line[:-1]  # does it really matters?
    linkLaptop.append(line)
    # parameters for metric

param = ['Storage', 'Screen_size', 'Dimensions', 'Touchscreen', 'Memory',
        'Graphics_card', 'Wireless', 'Battery_life', 'Operating_system', 'Colour',
        'Resolution', 'Processor', 'Weight', 'Bluetooth']
listOfdetails = []
# scrab each  links
for link in linkLaptop:
    content = urllib2.urlopen(link).read()
    soup = BeautifulSoup(content, "lxml")
    details = {}

    # adding link of the product:
    details['Website'] = link

    # adding the SKU to the producvt
    productCode = soup.p.text # the SKU
    details['SKU'] = productCode.split(': ')[1]

    # adding the unique id:
    uniqueID = link.split('-')[-2]
    details['Unique_id'] = uniqueID

    # adding the product brand and name and product name
    brand = soup.find(itemprop='brand').text
    details['Brand'] = brand
    name = soup.find(itemprop='name').text
    details['Name'] = name
    details['Product'] = brand + " " + name

    # adding the details from specification table into the details dictionary
    simpleTable = soup.select(".simpleTable > tbody > tr")
    for tr in simpleTable:
        tableHeader = tr.th.text.encode('utf-8') #use as keys in sql

        # only getting the information we require
        if tableHeader in param:
            tableDetails = tr.td.text
            # add to the list of details for this product
            details[tableHeader] = tableDetails
        elif tableHeader == 'Memory (RAM)':
            details['Memory'] = tr.td.text
        elif tableHeader == 'Battery life':
            details['Battery_life'] = tr.td.text
        elif tableHeader == 'Screen size':
            details['Screen_size'] = tr.td.text
        elif tableHeader == 'Operating System':
            details['Operating_system'] = tr.td.text
        elif tableHeader == 'Graphics Card':
            details['Graphics_card'] = tr.td.text


    # add details for this product to the master list
    listOfdetails.append(details)
    # print details
    # print len(details)sq

# Now, generate the sql from the dictionaries
connection = sqlite3.connect('specs.db') #connects to the db in the current directory
cursor = connection.cursor() # create the cursor
cursor.execute("DROP TABLE IF EXISTS specs")
cursor.execute('''CREATE TABLE specs ( Unique_id text PRIMARY KEY,  SKU text, Product text, Brand text,  Name text, Storage text, Screen_size text, Dimensions text, Touchscreen text, Memory text, Graphics_ca rd text, Wireless text, Battery_life text,  Operating_system text, Resolution text, Processor text,  Colour text, Weight text, Bluetooth text, Website text )''')

print "table created"


for details in listOfdetails:
    col = tuple(details.keys())
    values = tuple(details.values())
    placeholder = ', '.join('?'*len(details.keys()))
    # print col
    # print values
    # print placeholder

    query = 'INSERT INTO specs {} VALUES ({})'.format(tuple(details.keys()), placeholder)
    # print query
    cursor.execute(query,values)
    connection.commit()

connection.close()

print "done"
