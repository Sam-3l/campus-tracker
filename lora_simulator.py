import requests
import random
import time

URL = "http://localhost:5000/api/lora/data"

def generate_random_location():
    """Generate random GPS-like coordinates near a fixed point (example: Lagos)"""
    base_lat, base_lng = 6.5244, 3.3792  # Lagos, Nigeria
    lat = base_lat + random.uniform(-0.01, 0.01)
    lng = base_lng + random.uniform(-0.01, 0.01)
    return {"Lat": round(lat, 6), "Lng": round(lng, 6)}

def simulate_device():
    while True:
        location = generate_random_location()
        try:
            response = requests.post(URL, json=location)
            if response.status_code == 200:
                print(f"✅ Sent: {location}")
            else:
                print(f"⚠️ Failed ({response.status_code}): {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ Error: {e}")

        time.sleep(5)  # wait 5 seconds before sending next update

if __name__ == "__main__":
    print("📡 Starting LoRa device simulation...")
    simulate_device()
