from fastapi import APIRouter
from app.services.stock_service import stock_service

router = APIRouter()

@router.get("/stock")
def get_stock():
    return stock_service.list_stock()