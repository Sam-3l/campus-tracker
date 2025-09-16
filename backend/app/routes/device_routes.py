from flask import Blueprint, jsonify
from ..models import Location

device_bp = Blueprint("device", __name__)

@device_bp.route("/locations", methods=["GET"])
def get_all_locations():
    """
    Get all stored locations
    ---
    get:
      summary: Retrieve all locations
      description: Returns a list of all location records stored in the database.
      responses:
        200:
          description: A list of locations
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    lat:
                      type: number
                      example: 12.3456
                    lng:
                      type: number
                      example: 78.9012
                    timestamp:
                      type: string
                      format: date-time
                      example: "2025-09-16T18:30:00Z"
    """
    locations = Location.query.order_by(Location.timestamp.desc()).all()
    return jsonify([
        {"lat": l.lat, "lng": l.lng, "timestamp": l.timestamp.isoformat()}
        for l in locations
    ])

@device_bp.route("/latest_location", methods=["GET"])
def get_latest_location():
    """
    Get the latest location
    ---
    get:
      summary: Retrieve the most recent location
      description: Returns the latest location record based on timestamp.
      responses:
        200:
          description: Latest location
          content:
            application/json:
              schema:
                type: object
                properties:
                  lat:
                    type: number
                    example: 12.3456
                  lng:
                    type: number
                    example: 78.9012
                  timestamp:
                    type: string
                    format: date-time
                    example: "2025-09-16T18:30:00Z"
        404:
          description: No location data found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: No location data found
    """
    location = Location.query.order_by(Location.timestamp.desc()).first()
    if not location:
        return jsonify({"error": "No location data found"}), 404

    return jsonify({
        "lat": location.lat,
        "lng": location.lng,
        "timestamp": location.timestamp.isoformat()
    })