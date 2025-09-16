import requests
import random
import time
import math

URL = "https://campus-tracker-bakend.onrender.com/api/lora/data"

# Starting point: OAU campus
lat, lng = 7.519467, 4.520684

STEP_MAX = 0.0002  # ~20 meters per update
INTERVAL = 5  # seconds

def simulate_device():
    global lat, lng
    print("📡 Starting realistic LoRa device simulation...")
    while True:
        # Random small movement
        angle = random.uniform(0, 2 * math.pi)
        lat += STEP_MAX * math.sin(angle)
        lng += STEP_MAX * math.cos(angle)

        # Optional: keep inside campus boundary
        lat = max(min(lat, 7.522), 7.517)  # tweak as per campus bounds
        lng = max(min(lng, 4.523), 4.518)

        payload = {"Lat": round(lat, 6), "Lng": round(lng, 6)}
        try:
            r = requests.post(URL, json=payload)
            if r.status_code == 200:
                print(f"✅ Sent: {payload}")
            else:
                print(f"⚠️ Failed ({r.status_code}): {r.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ Error: {e}")

        time.sleep(INTERVAL)

if __name__ == "__main__":
    simulate_device()
