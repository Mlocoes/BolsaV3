import requests
from app.core.config import settings

def get_price(symbol: str) -> float:
    if not settings.ALPHA_VANTAGE_API_KEY:
        print("Alpha Vantage API Key not set")
        return None
        
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={settings.ALPHA_VANTAGE_API_KEY}"
    try:
        response = requests.get(url)
        data = response.json()
        # Alpha Vantage API limit check
        if "Note" in data:
            print(f"Alpha Vantage API limit reached: {data['Note']}")
            return None
            
        price = float(data["Global Quote"]["05. price"])
        return price
    except (KeyError, ValueError, Exception) as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None
