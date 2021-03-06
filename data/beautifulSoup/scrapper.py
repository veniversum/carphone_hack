from bs4 import BeautifulSoup
import urllib2
# import sqlite3

# global variables:
linkLaptop = []
listOfProducts = []
param = ['Storage', 'Screen_size', 'Dimensions', 'Touchscreen', 'Memory',
         'Graphics_card', 'Wireless', 'Battery_life', 'Operating_system', 'Colour',
         'Resolution', 'Processor', 'Weight', 'Bluetooth']


def getListOfProducts():
    with open('./beautifulSoup/listOfLaptops.txt', 'r') as f:
        for line in f:
            line = line[:-1]  # does it really matters?
            linkLaptop.append(line)
            # parameters for metric
    return getProducts(linkLaptop)


def getProducts(linkLaptop):
    # retrun list of of products
    print "scrapping websites"
    # scrab each  links
    for link in linkLaptop:
        content = urllib2.urlopen(link).read()
        soup = BeautifulSoup(content, "lxml")
        details = {}

        # adding link of the product:
        details['Website'] = link

        # adding the SKU to the producvt
        productCode = soup.p.text   # the SKU
        try:
            sku = productCode.split(': ')[1]
        except IndexError:
            details['SKU'] = 'NULL'
        else:
            details['SKU'] = sku

        # adding the unique id:
        try:
            uniqueID = link.split('-')[-2]
        except StandardError:
            details['Unique_id'] = 'NULL'
        else:
            details['Unique_id'] = uniqueID

        # adding the product brand and name and product name
        try:
            brand = soup.find(itemprop='brand').text
            name = soup.find(itemprop='name').text
        except StandardError:
            details['Brand'] = 'NULL'
            details['Name'] = 'NULL'
            details['Product'] = 'NULL'
        else:
            details['Brand'] = brand
            details['Name'] = name
            details['Product'] = brand + " " + name

        try:
            price = soup.find(itemprop='price').text[1:]
        except StandardError:
            details['Price'] = 'NULL'
        else:
            details['Price'] = price
        # print str(price)

        # adding the details from specification table into the details
        # dictionary
        simpleTable = soup.select(".simpleTable > tbody > tr")
        for tr in simpleTable:
            tableHeader = tr.th.text.encode('utf-8')    # use as keys in sql

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
            elif tableHeader == 'Graphics card':
                details['GPU'] = tr.td.text

        # add details for this product to the master list
        listOfProducts.append(details)

    print 'done'
    return listOfProducts
