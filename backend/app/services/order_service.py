from datetime import datetime
from app.models.order import Order, Round, Item
from app.services.stock_service import stock_service

class OrderService:
    def __init__(self):
        self.orders = {}
        self.next_id = 0

    def create_order(self):
        if self.next_id in self.orders:
            return {"error": f"Order with ID {self.next_id} already exists."}
        new_order = Order(
            created=datetime.utcnow().isoformat(),
            paid=False,
            subtotal=0,
            taxes=0,
            discounts=0,
            items=[],
            rounds=[]
        )
        self.orders[self.next_id] = new_order.model_dump()
        created_id = self.next_id
        self.next_id += 1
        return {"id": created_id, **new_order.model_dump()}

    def get_order(self, order_id: int):
        order = self.orders.get(order_id)
        if order:
            return {"id": order_id, **order}
        return None

    def list_orders(self):
        return [{"id": oid, **data} for oid, data in self.orders.items()]

    def add_round(self, order_id: int, round_data: Round):
        order = self.orders.get(order_id)
        if not order:
            return None
        for item in round_data.items:
            beer = stock_service.get_beer(item.name)
            if not beer:
                return {"error": f"{item.name} no encontrado en catálogo."}
            if beer["quantity"] < item.quantity:
                return {"error": f"No hay suficiente stock de {item.name}."}
            stock_service.update_stock(item.name, item.quantity)

        order['rounds'].append(round_data.model_dump())
        self.orders[order_id] = order  # Aseguramos que se guarde
        return {"id": order_id, **order}

    def pay_order(self, order_id: int):
        order = self.orders.get(order_id)
        if not order:
            return None

        subtotal = 0
        for round_entry in order['rounds']:
            for item in round_entry['items']:
                beer = stock_service.get_beer(item['name'])
                if beer:
                    subtotal += beer["price"] * item["quantity"]

        taxes = subtotal * 0.12
        discounts = 0

        order['subtotal'] = subtotal
        order['taxes'] = taxes
        order['discounts'] = discounts
        order['paid'] = True
        self.orders[order_id] = order
        return {"id": order_id, **order}

    def seed_data(self):
        self.create_order()
        self.create_order()
        self.create_order()

order_service = OrderService()