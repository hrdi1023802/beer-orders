# Beer Orders Dashboard (Frontend)

Este proyecto es un dashboard construido en Next.js para gestionar y visualizar las órdenes de cerveza, permitiendo:

- Crear órdenes.
- Agregar rondas a una orden.
- Pagar órdenes.
- Consultar stock disponible.

---

## Requisitos

- Node.js 18+
- npm o yarn

---

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
```
2. Entra en el proyecto:
```bash
cd beer-orders-dashboard-structure
```
3. Instala las dependencias:
```bash
npm install
# o
yarn install
```

---

## Uso

Levanta el proyecto en modo desarrollo:
```bash
npm run dev
# o
yarn dev
```

Por defecto se ejecuta en:
```
http://localhost:3000
```

---

## Configuración del backend

Asegúrate de que el backend (API) esté corriendo en:
```
http://localhost:8000
```
> El frontend consulta las APIs expuestas por el backend.

---

## Funcionalidades principales

- Página principal donde se listan las órdenes existentes.
- Botón para crear una nueva orden (sólo si hay stock disponible).
- Página de detalle de la orden, donde puedes:
  - Ver las rondas existentes.
  - Agregar nuevas rondas seleccionando cervezas disponibles desde el catálogo.
  - Pagar la orden, lo cual actualizará el estado y te redirigirá a la página principal.
- Consulta automática del stock disponible en tiempo real.
- Validaciones para evitar crear órdenes sin stock o agregar rondas inválidas.

---

## Tecnologías usadas

- Next.js 14
- React
- SWR para manejo de datos
- TailwindCSS para estilos

---

## Nota importante

El backend mantiene la información en memoria. Al reiniciar el backend, el estado de las órdenes y el stock se reiniciará.

---

## Modo de levantamiento junto al backend

Si quieres levantar el frontend junto con el backend (fastapi_clean_arch), sigue estos pasos:

1. Asegúrate de que el backend (fastapi_clean_arch) esté corriendo:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
2. En el frontend, asegúrate de que las URLs apunten a `http://localhost:8000`.

3. Ambos proyectos funcionan de manera simultánea; el frontend consulta la API expuesta por el backend.
