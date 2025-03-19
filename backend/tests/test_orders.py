import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_get_order():
    response = client.post("/orders")
    assert response.status_code == 200
    order_id = response.json()["id"]

    get_response = client.get(f"/orders/{order_id}")
    assert get_response.status_code == 200

def test_list_orders():
    response = client.get("/orders")
    assert response.status_code == 200

def test_pay_order():
    create_response = client.post("/orders")
    order_id = create_response.json()["id"]

    pay_response = client.patch(f"/orders/{order_id}/pay")
    assert pay_response.status_code == 200
    assert "marked as paid" in pay_response.json()["message"]
