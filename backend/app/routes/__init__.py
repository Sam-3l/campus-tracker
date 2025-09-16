from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime, timedelta
from ..models import User
from ..extensions import db
from config import Config

# Authentication Blueprint
auth_bp = Blueprint("auth", __name__)

SECRET_KEY = Config.SECRET_KEY

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
        401:
          description: Invalid credentials
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Invalid credentials
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = jwt.encode(
            {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401


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
          description: User already exists
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
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201