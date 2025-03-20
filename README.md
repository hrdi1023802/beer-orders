# Beer Orders Dashboard 🛠🍺

Este proyecto unifica un frontend en Next.js con TypeScript y TailwindCSS y un backend en FastAPI.  
Ambos proyectos están dockerizados y pueden ejecutarse en conjunto mediante `docker-compose`.

## Requisitos
- Docker
- Docker Compose
- Node.js (solo para desarrollo local del frontend)
- Python 3.9+ (solo para desarrollo local del backend)

## Levantar los proyectos con Docker

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Ejecuta desde la raíz del proyecto:
```bash
docker-compose up -d
```
3. Esto levantará:
   - Frontend en `http://localhost:3000`
   - Backend en `http://localhost:8000`
   - Puedes verificar el backend accediendo a `http://localhost:8000/docs` (Swagger)

## Reiniciar contenedores
```bash
docker-compose down
docker-compose up -d
```

## Estructura del repositorio

```
/beer-orders
│
├── backend
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── app/
│   ├── components/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── docker-compose.yml
└── README.md
```

## Notas importantes
- La información de órdenes y stock se mantiene en memoria.
- Al reiniciar el backend se perderán las órdenes y stock.
- La creación de órdenes solo es posible si hay stock disponible.
- El frontend se comunica con el backend mediante `/api/orders`.
