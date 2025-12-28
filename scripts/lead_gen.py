import requests
import csv

# CONFIGURATION
API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'
TARGET_INDUSTRY = 'Dental Clinic'
TARGET_CITY = 'Houston, TX'
MIN_RATING = 4.0 # We target successful businesses who are too busy to answer the phone

def scrape_leads():
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={TARGET_INDUSTRY}+in+{TARGET_CITY}&key={API_KEY}"
    
    response = requests.get(url).json()
    leads = []

    for place in response.get('results', []):
        if place.get('rating', 0) >= MIN_RATING:
            lead = {
                'name': place['name'],
                'address': place.get('formatted_address'),
                'rating': place.get('rating'),
                'place_id': place['place_id']
            }
            
            # Fetch deeper details (Phone & Website)
            details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={lead['place_id']}&fields=formatted_phone_number,website&key={API_KEY}"
            details = requests.get(details_url).json().get('result', {})
            
            lead['phone'] = details.get('formatted_phone_number', 'N/A')
            lead['website'] = details.get('website', 'N/A')
            leads.append(lead)

    return leads

def save_to_csv(leads):
    keys = leads[0].keys()
    with open('sovereign_leads.csv', 'w', newline='') as f:
        dict_writer = csv.DictWriter(f, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(leads)

if __name__ == "__main__":
    print(f"--- INITIALIZING LEAD INGESTION FOR {TARGET_CITY} ---")
    data = scrape_leads()
    save_to_csv(data)
    print(f"SUCCESS: {len(data)} High-Value Nodes Identified.")
  
