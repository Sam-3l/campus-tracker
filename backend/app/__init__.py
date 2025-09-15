from flask import Flask
from .config import Config
from .extensions import db, socketio
from flask_migrate import Migrate
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    socketio.init_app(app)

    swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": "apispec",
                "route": "/apispec.json",
                "rule_filter": lambda rule: True,  # Include all endpoints
                "model_filter": lambda tag: True,  # Include all models
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/",
    }

    swagger_template = {
        "swagger": "2.0",
        "info": {
            "title": "Campus Tracker API",
            "description": "API documentation for the Campus Tracker project.",
            "version": "1.0.0",
            "contact": {
                "name": "Samuel",
                "email": "samuelonyeibor21@gmail.com",
            },
        },
        "host": "localhost:5000",
        "basePath": "/",
    }

    Swagger(app, config=swagger_config, template=swagger_template)

    # Register blueprints
    from .routes.lora_routes import lora_bp
    from .routes.device_routes import device_bp
    from .routes import auth_bp
    app.register_blueprint(lora_bp, url_prefix="/api/lora")
    app.register_blueprint(device_bp, url_prefix="/api/devices")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app