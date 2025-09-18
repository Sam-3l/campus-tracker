from flask import Blueprint, request, jsonify
from ..models import Location
from ..extensions import db, socketio

lora_bp = Blueprint("lora", __name__)

@lora_bp.route("/data", methods=["POST"])
def receive_data():
    """
    Receive LoRa data
    ---
    post:
      summary: Receive LoRa GPS data
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                Lat:
                  type: number
                  example: 12.3456
                Lng:
                  type: number
                  example: 78.9012
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: ok
        400:
          description: Invalid payload
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Invalid payload
    """
    payload = request.get_json()
    lat, lng, timestamp = payload.get("Lat"), payload.get("Lng"), payload.get("Time")

    if lat is None or lng is None:
        return jsonify({"error": "Invalid payload"}), 400

    # Save to database
    location = Location(lat=lat, lng=lng, timestamp=timestamp)
    db.session.add(location)
    db.session.commit()

    # Emit real-time location update to all connected clients
    socketio.emit(
        "location_update",
        {
            "lat": lat,
            "lng": lng,
            "timestamp": timestamp
        },
        to=None
    )

    return jsonify({"status": "ok"}), 200
