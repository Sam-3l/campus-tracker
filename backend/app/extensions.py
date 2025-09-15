from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

db = SQLAlchemy()

# Initialize Flask-SocketIO
socketio = SocketIO(cors_allowed_origins="*")