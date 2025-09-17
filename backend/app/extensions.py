from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

db = SQLAlchemy()

# Initialize Flask-SocketIO
socketio = SocketIO(cors_allowed_origins="*")