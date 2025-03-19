from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    name: str
    quantity: int
    price_per_unit: float = 0
    total: float = 0

class Round(BaseModel):
    created: str
    items: List[Item]

class Order(BaseModel):
    created: str
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[Item]
    rounds: List[Round]