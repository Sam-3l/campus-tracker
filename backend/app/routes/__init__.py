from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime, timedelta
from ..models import User
from ..extensions import db
from app.config import Config

# Authentication Blueprint
auth_bp = Blueprint("auth", __name__)

SECRET_KEY = Config.SECRET_KEY
TOKEN_EXPIRY_HOURS = Config.TOKEN_EXPIRY_HOURS

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    User Login
    ---
    post:
      summary: Authenticate user and return JWT token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                  example: johndoe
                password:
                  type: string
                  example: secret123
      responses:
        200:
          description: Successful login
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
                  expires_in_hours:
                    type: integer
                    example: 24
        401:
          description: Invalid credentials
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Incorrect password
        404:
          description: User not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: User not found
        400:
          description: Bad request
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Username and password are required
    """
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"message": "Username and password are required"}), 400

    username = data.get("username", "").strip().lower()
    password = data.get("password", "").strip()

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not user.check_password(password):
        return jsonify({"message": "Incorrect password"}), 401

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRY_HOURS)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"token": token, "expires_in_hours": TOKEN_EXPIRY_HOURS}), 200


@auth_bp.route("/register", methods=["POST"])
def register():
    """
    User Registration
    ---
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                  example: johndoe
                password:
                  type: string
                  example: secret123
      responses:
        201:
          description: User registered successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: User registered successfully
        400:
          description: User already exists or bad request
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: User already exists
    """
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"message": "Username and password are required"}), 400

    username = data.get("username", "").strip().lower()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({"message": "Username and password cannot be empty"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201