import sqlite3
import json
from flask import jsonify
from flask import render_template
from flask import request
from flask import Flask
from flask import g
from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from flask.ext.restless import APIManager

app = Flask(__name__, template_folder='frontend', static_folder='frontend', static_url_path="")
app.config['DEBUG'] = True
engine = create_engine('sqlite:///data/specs.db', convert_unicode=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)
metadata = MetaData(bind=engine)

Base = declarative_base()
Base.metadata.bind = engine


class Products(Base):
    __table__ = Table('specs', metadata, autoload=True)
    __tablename__ = __table__.name

manager = APIManager(app, session=mysession)
manager.create_api(Products)




def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_database()
    return db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/results", methods=['POST'])
def results():
    print json.dumps(request.form.to_dict())
    return render_template('results.html', form=json.dumps(request.form.to_dict()))



if __name__ == "__main__":
    app.run()

