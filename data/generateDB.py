import sqlite3
import integrateBenchmarks


# Now, generate the sql from the dictionaries
# connects to the db in the current directory
connection = sqlite3.connect('specs.db')
cursor = connection.cursor()  # create the cursor
cursor.execute("DROP TABLE IF EXISTS specs")
cursor.execute('''CREATE TABLE specs ( Unique_id text PRIMARY KEY,  SKU int, Product text, Brand text,  Name text, Storage text, Screen_size text, Dimensions text, Touchscreen text, Memory text, GPU text, gpubenchmark text, Wireless text, Battery_life text,  Operating_system text, Resolution text, Processor text, cpubenchmark text, Colour text, Weight text, Bluetooth text, Website text, Price float )''')

curryProd = integrateBenchmarks.getProducts()

for details in curryProd:
    col = tuple(details.keys())
    values = tuple(details.values())
    placeholder = ', '.join('?' * len(details.keys()))

    query = 'INSERT INTO specs {} VALUES ({})'.format(
        tuple(details.keys()), placeholder)
    cursor.execute(query, values)
    connection.commit()

# # adding prices into the db:
# connectProd = sqlite3.connect('products.db')
# cursorProd = connectProd.cursor()
#
# # for details in curryProd:
# #     productID = str(details['Unique_id'])
# #     query = 'SELECT "Price (inc VAT)" FROM products WHERE "Unique Id" = ' + productID
# #     price = cursorProd.execute(query)
# #     print price
# #     # query = 'INSERT INTO specs (Price) VALUES ({})'.format(str(price))
# #     # print query
# #     cursor.execute(query)
# #     connection.commit()
# # # print 'added all prices!'
# # connection.commit()

connection.close()
# connectProd.close()
