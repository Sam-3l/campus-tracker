from flask import Blueprint, jsonify, request
from functools import wraps
import jwt
from ..config import Config
from ..models import Location

device_bp = Blueprint("device", __name__)

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing!"}), 403

        try:
            token = token.split(" ")[1]  # Remove 'Bearer' prefix
            jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"message": "Token is invalid!"}), 403

        return f(*args, **kwargs)

    return decorated

@device_bp.route("/locations", methods=["GET"])
@token_required
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
@token_required
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