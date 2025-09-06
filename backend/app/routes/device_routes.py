from flask import Blueprint, jsonify
from ..models import Device, Location

device_bp = Blueprint("device", __name__)

@device_bp.route("/", methods=["GET"])
def list_devices():
    devices = Device.query.all()
    return jsonify([{"id": d.id, "name": d.name, "dev_eui": d.dev_eui} for d in devices])

@device_bp.route("/<int:device_id>/locations", methods=["GET"])
def get_device_locations(device_id):
    locations = Location.query.filter_by(device_id=device_id).all()
    return jsonify([{"lat": l.lat, "lng": l.lng, "timestamp": l.timestamp.isoformat()} for l in locations])