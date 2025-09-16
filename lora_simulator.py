import requests
import random
import time

URL = "http://localhost:5000/api/lora/data"

# Campus center: WHITEHouse, OAU
CAMPUS_CENTER_LAT, CAMPUS_CENTER_LNG = 7.519467, 4.520684
# Approximate offset to stay within campus (~0.003 degrees ~ 300m)
OFFSET = 0.003

def generate_random_location():
    """Generate random coordinates near the OAU campus center."""
    lat = CAMPUS_CENTER_LAT + random.uniform(-OFFSET, OFFSET)
    lng = CAMPUS_CENTER_LNG + random.uniform(-OFFSET, OFFSET)
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

        time.sleep(5)  # 5 seconds between updates

if __name__ == "__main__":
    print("📡 Starting LoRa device simulation for OAU campus...")
    simulate_device()