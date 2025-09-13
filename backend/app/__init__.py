from flask import Flask
from .config import Config
from .extensions import db
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    from .routes.lora_routes import lora_bp
    from .routes.device_routes import device_bp
    from .routes import auth_bp
    app.register_blueprint(lora_bp, url_prefix="/api/lora")
    app.register_blueprint(device_bp, url_prefix="/api/devices")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app