from flask import Blueprint, request, jsonify
from ..models import Device, Location
from ..extensions import db

lora_bp = Blueprint("lora", __name__)

# soon..