from .extensions import db
from datetime import datetime

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dev_eui = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)