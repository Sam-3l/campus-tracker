from flask import Blueprint, jsonify
from ..models import Device, Location

device_bp = Blueprint("device", __name__)
