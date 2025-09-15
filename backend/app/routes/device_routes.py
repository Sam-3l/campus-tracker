from flask import Blueprint, jsonify
from ..models import Location

device_bp = Blueprint("device", __name__)

@device_bp.route("/locations", methods=["GET"])
def get_all_locations():
    locations = Location.query.order_by(Location.timestamp.desc()).all()
    return jsonify([{"lat": l.lat, "lng": l.lng, "timestamp": l.timestamp.isoformat()} for l in locations])

@device_bp.route("/latest_location", methods=["GET"])
def get_latest_location():
    location = Location.query.order_by(Location.timestamp.desc()).first()
    if not location:
        return jsonify({"error": "No location data found"}), 404

    return jsonify({"lat": location.lat, "lng": location.lng, "timestamp": location.timestamp.isoformat()})