from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime, timedelta
from ..models import User
from ..extensions import db

# Authentication Blueprint
auth_bp = Blueprint("auth", __name__)

SECRET_KEY = "supersecret-lol-will-change-this"

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = jwt.encode({"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm="HS256")
        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401

@auth_bp.route("/register", methods=["POST"])
def register():
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