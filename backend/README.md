# 🍻 Beer Orders API (FastAPI)

Este proyecto es una API desarrollada con **FastAPI** para gestionar órdenes de cerveza, stock, y pagos, manteniendo toda la información en memoria.

---

## ✅ Requisitos

- Python 3.9 o superior
- Virtualenv (recomendado)

---

## ✅ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
```
2. Crea un entorno virtual:
```bash
python3 -m venv venv
source venv/bin/activate
```
3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

---

## ✅ Uso

Levanta el servidor con el siguiente comando:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## ✅ Endpoints disponibles

| Método | Endpoint                     | Descripción                                         |
|--------|------------------------------|-----------------------------------------------------|
| GET    | `/orders`                    | Lista todas las órdenes en memoria                  |
| POST   | `/orders`                    | Crea una nueva orden (solo si hay stock disponible) |
| GET    | `/orders/{order_id}`         | Obtiene detalles de una orden                       |
| PATCH  | `/orders/{order_id}`         | Agrega una ronda a una orden                        |
| PATCH  | `/orders/{order_id}/pay`     | Paga la orden y actualiza su estado                 |
| GET    | `/stock`                     | Muestra el stock actual                             |

---

## ✅ Documentación interactiva (Swagger)
Disponible en:  
[http://localhost:8000/docs](http://localhost:8000/docs)

---

## ✅ Arquitectura
- `app/models` — Modelos de datos (Order, Round, Item).
- `app/services` — Lógica de stock y órdenes (stock_service y order_service).
- `app/routes` — Definición de rutas agrupadas.
- `app/main.py` — Punto de entrada, donde se cargan middlewares y rutas.

---

## ✅ Validaciones importantes:
- No se pueden crear órdenes si no hay stock disponible.
- El stock se desincrementa al agregar rondas.
- No se permite pagar una orden vacía o ya pagada.
- Toda la información se reinicia al reiniciar el servidor (memoria).

---

## ✅ Ejecución conjunta con el Frontend
Puedes levantar este backend junto con el frontend (beer-orders-dashboard-structure) siguiendo estos pasos:
1. Levanta el backend:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
2. En el frontend, asegúrate de que las peticiones vayan a `http://localhost:8000`.

---

## ✅ Mejoras sugeridas (para más puntos):
- Agregar tests automáticos con Pytest para servicios y endpoints.
- Agregar manejo de logs.
- Documentar ejemplos de respuesta en Swagger.

---


