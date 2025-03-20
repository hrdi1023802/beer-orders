from fastapi import APIRouter, HTTPException, Body
from app.services.stock_service import stock_service
from app.services.order_service import order_service
from app.models.order import Round

router = APIRouter()

@router.get("/orders")
def get_orders():
    return order_service.list_orders()

@router.post("/orders")
def create_order():
    if not stock_service.check_total_stock():
        raise HTTPException(status_code=400, detail="No hay stock disponible para crear una orden.")
    
    created_order = order_service.create_order()
    
    if not created_order:
        raise HTTPException(status_code=500, detail="No se pudo crear la orden por un error interno.")
    
    return created_order

@router.get("/orders/{order_id}")
def get_order(order_id: int):
    order = order_service.get_order(order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.patch("/orders/{order_id}")
def add_round(order_id: int, round: Round = Body(...)):
    result = order_service.add_round(order_id, round)
    if result is None:
        raise HTTPException(status_code=404, detail="Order not found")
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    # Devuelve la orden actualizada directamente
    updated_order = order_service.get_order(order_id)
    if updated_order is None:
        raise HTTPException(status_code=404, detail="Order not found after adding round")
    return updated_order

@router.patch("/orders/{order_id}/pay")
def pay_order(order_id: int):
    result = order_service.pay_order(order_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Order not found")
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return {"message": "marked as paid", "order": order_service.get_order(order_id)}