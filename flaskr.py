import sqlite3
from data import *
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from contextlib import closing

DATABASE = './data/specs.db/'
DEBUG = True
SECRET_KEY = 'buttercup'  # keep client side sessions secure
USERNAME = 'CURRYCHICKEN'
PASSWORD = 'MOSQUEKITCHEN'

app = Flask(__name__)
app.config.from_object(__name__)


# connect to a DB
def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

# # to initialise db
# def init_db():
#     with closing(connect_db()) as db:
#
#     generateDB.generateDB() # initialise DB with scrapping and etc


@app.before_request
def before_request():
    g.db = connect_db()


@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()


@app.route('/')
def show_entries():
    cur = g.db.execute('select title, text from entries order by id desc')
    entries = [dict(title=row[0], text=row[1]) for row in cur.fetchall()]
    return render_template('show_entries.html', entries=entries)



# fire up the server
if __name__ == '__main__':
    app.run()
