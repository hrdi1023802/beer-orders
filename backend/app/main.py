from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import order_routes, stock_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(order_routes.router)
app.include_router(stock_routes.router)
