from datetime import datetime

class StockService:
    def __init__(self):
        self.stock = {
            "last_updated": datetime.utcnow().isoformat(),
            "beers": [
                {"name": "Corona", "price": 115, "quantity": 2},
                {"name": "Quilmes", "price": 120, "quantity": 0},
                {"name": "Club Colombia", "price": 110, "quantity": 3},
            ],
        }

    def list_stock(self):
        return self.stock

    def update_stock(self, beer_name: str, quantity: int):
        for beer in self.stock["beers"]:
            if beer["name"].lower() == beer_name.lower():
                if beer["quantity"] >= quantity:
                    beer["quantity"] -= quantity
                    self.stock["last_updated"] = datetime.utcnow().isoformat()
                    return True
                return False
        return False

    def get_beer(self, beer_name: str):
        for beer in self.stock["beers"]:
            if beer["name"].lower() == beer_name.lower():
                return beer
        return None

    def check_total_stock(self):
        return any(beer["quantity"] > 0 for beer in self.stock["beers"])

stock_service = StockService()