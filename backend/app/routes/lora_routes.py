from flask import Blueprint, request, jsonify
from flask_socketio import emit
from ..models import Location
from ..extensions import db, socketio

lora_bp = Blueprint("lora", __name__)

@lora_bp.route("/data", methods=["POST"])
def receive_data():
    payload = request.get_json()
    lat, lng = payload.get("Lat"), payload.get("Lng")

    if lat is None or lng is None:
        return jsonify({"error": "Invalid payload"}), 400

    location = Location(lat=lat, lng=lng)
    db.session.add(location)
    db.session.commit()

    # Emit real-time location update
    socketio.emit("location_update", {"lat": lat, "lng": lng, "timestamp": location.timestamp.isoformat()}, broadcast=True)

    return jsonify({"status": "ok"}), 200