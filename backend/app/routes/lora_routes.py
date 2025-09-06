from flask import Blueprint, request, jsonify
from ..models import Device, Location
from ..extensions import db

lora_bp = Blueprint("lora", __name__)

@lora_bp.route("/data", methods=["POST"])
def receive_data():
    payload = request.get_json()
    dev_eui = payload.get("end_device_ids", {}).get("dev_eui")
    uplink = payload.get("uplink_message", {})
    decoded = uplink.get("decoded_payload", {})
    lat, lng = decoded.get("lat"), decoded.get("lng")

    if not dev_eui or lat is None or lng is None:
        return jsonify({"error": "Invalid payload"}), 400

    device = Device.query.filter_by(dev_eui=dev_eui).first()
    if not device:
        device = Device(dev_eui=dev_eui, name=f"Device {dev_eui}")
        db.session.add(device)
        db.session.commit()

    location = Location(device_id=device.id, lat=lat, lng=lng)
    db.session.add(location)
    db.session.commit()

    return jsonify({"status": "ok"}), 200