from flask import Flask
from flask_cors import CORS
from config import Config
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

mysql = MySQL(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
