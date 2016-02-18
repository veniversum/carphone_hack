import os
import sqlite3
from data import integrateBenchmarks


# Now, generate the sql from the dictionaries
connection = sqlite3.connect('specs.db')  # connects to the db in the current directory
cursor = connection.cursor()  # create the cursor
cursor.execute("DROP TABLE IF EXISTS specs")
cursor.execute('''CREATE TABLE specs ( Unique_id text PRIMARY KEY,  SKU int, Product text, Brand text,  Name text, Storage text, Screen_size text, Dimensions text, Touchscreen text, Memory text, GPU text, gpubenchmark text, Wireless text, Battery_life text,  Operating_system text, Resolution text, Processor text, cpubenchmark text, Colour text, Weight text, Bluetooth text, Website text )''')

# print "table created"

curryProd = integrateBenchmarks.getProducts()

for details in curryProd:
    col = tuple(details.keys())
    values = tuple(details.values())
    placeholder = ', '.join('?'*len(details.keys()))

    query = 'INSERT INTO specs {} VALUES ({})'.format(tuple(details.keys()), placeholder)
    cursor.execute(query, values)
    connection.commit()

connection.close()

# print "done"
