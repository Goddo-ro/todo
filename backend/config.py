import os

from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)
SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
app.config['SECRET_KEY'] = SECRET_KEY
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'todo'
mysql = MySQL(app)
