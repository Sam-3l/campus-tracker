# Campus-Wide Human and Asset Tracker

This project is a real-time location tracking system for people and assets across a campus. It uses LoRaWAN (via **The Things Network**), GPS, and BLE to send tracking data from IoT devices to the cloud. A Flask-based backend collects and processes the data, while a frontend or mobile app visualizes it.

## How It Works

1. **Tracking Devices** (ESP32 + LoRa + GPS + BLE) send location data.
2. **LoRa Gateway** forwards data to **TTN** (The Things Network).
3. **TTN Integration** sends the data to our Flask backend via HTTP/MQTT.
4. **Flask Backend** processes and stores the data in a database.
5. **Frontend** displays real-time positions on a map.

## Tech Stack

* **Backend**: Flask (Python)
* **Database**: PostgreSQL
* **IoT Network**: The Things Network (LoRaWAN)
* **Frontend**: To be decided (React/Flutter/etc.)

## Getting Started

1. Clone the repo:

   ```bash
   git clone <repo-url>
   cd campus-tracker
   ```
2. Create and activate a virtual environment:

   ```bash
   python -m venv venv  
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Run the app:

   ```bash
   flask run
   ```

## Contributing

* Create a new branch for your feature:

  ```bash
  git checkout -b feature/your-feature
  ```
* Make changes, test them, and submit a pull request.
* Keep commits clear and descriptive.
