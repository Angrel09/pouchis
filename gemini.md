# 🐾 PouAPI — Arquitectura y Plan de Desarrollo

## Descripción General

API REST pública construida con **Node.js + Express** para gestionar el backend de un videojuego de mascota virtual al estilo Pou. Permite controlar el estado de la mascota, gestionar ítems, una tienda y actividades/minijuegos.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js (v20+) |
| Framework | Express.js (v4) |
| Base de Datos | JSON en memoria (sin DB externa, datos precargados) |
| Formato | REST / JSON |
| Autenticación | ❌ Ninguna (API pública) |
| Puerto | `3000` |

---

## Modelos de Datos

### 🐣 Mascota (`Pet`)

Representa el estado actual de la mascota virtual del jugador.

```json
{
  "id": "pet_001",
  "name": "Pochi",
  "level": 1,
  "health": 100,
  "hunger": 80,
  "energy": 90,
  "happiness": 75,
  "coins": 150,
  "createdAt": "2025-01-01T00:00:00Z"
}
```

| Campo | Tipo | Rango | Descripción |
|---|---|---|---|
| `id` | string | — | Identificador único |
| `name` | string | — | Nombre de la mascota |
| `level` | number | 1–99 | Nivel actual |
| `health` | number | 0–100 | Puntos de vida |
| `hunger` | number | 0–100 | Nivel de saciedad (0 = hambrienta) |
| `energy` | number | 0–100 | Nivel de energía |
| `happiness` | number | 0–100 | Nivel de felicidad |
| `coins` | number | 0+ | Monedas disponibles |

---

### 🎒 Ítems (`Item`)

Objetos que el jugador puede comprar y usar sobre su mascota.

```json
{
  "id": "item_001",
  "name": "Hamburguesa",
  "category": "comida",
  "description": "Una jugosa hamburguesa que llena bastante.",
  "effects": {
    "hunger": +35,
    "health": +5,
    "happiness": +10
  },
  "price": 20
}
```

**Categorías disponibles:** `comida` | `pocion` | `ropa`

#### Ítems precargados

| ID | Nombre | Categoría | Precio | Efectos principales |
|---|---|---|---|---|
| item_001 | Hamburguesa | comida | 20 | hunger +35, happiness +10 |
| item_002 | Pizza | comida | 30 | hunger +50, happiness +15 |
| item_003 | Manzana | comida | 5 | hunger +15, health +10 |
| item_004 | Sushi | comida | 45 | hunger +40, happiness +20 |
| item_005 | Helado | comida | 15 | hunger +10, happiness +30 |
| item_006 | Poción de Vida | pocion | 50 | health +50 |
| item_007 | Poción de Energía | pocion | 40 | energy +60 |
| item_008 | Elixir Supremo | pocion | 90 | health +30, energy +30, happiness +30 |
| item_009 | Gorra Azul | ropa | 60 | happiness +5 |
| item_010 | Sudadera Roja | ropa | 80 | happiness +10 |
| item_011 | Anteojos de Sol | ropa | 55 | happiness +8 |

---

### 🏪 Tienda (`Shop`)

Lista filtrable de ítems disponibles para compra.

```json
{
  "shopId": "main_shop",
  "name": "Tienda de Pochi",
  "availableItems": [ ...items ],
  "lastUpdated": "2025-01-01T00:00:00Z"
}
```

---

### 🎮 Actividades (`Activity`)

Minijuegos y acciones que la mascota puede realizar para ganar recompensas.

```json
{
  "id": "act_001",
  "name": "Carrera de Obstáculos",
  "description": "Pon a tu mascota a correr por un circuito lleno de obstáculos.",
  "energyCost": 20,
  "rewards": {
    "coins": 30,
    "happiness": 15,
    "experience": 10
  },
  "duration": 60
}
```

#### Actividades precargadas

| ID | Nombre | Costo Energía | Recompensa Monedas | Recompensa Felicidad |
|---|---|---|---|---|
| act_001 | Carrera de Obstáculos | 20 | 30 | +15 |
| act_002 | Baile Loco | 15 | 20 | +25 |
| act_003 | Pesca | 10 | 50 | +10 |
| act_004 | Puzzle Mental | 5 | 40 | +5 |
| act_005 | Siesta Reparadora | 0 | 0 | +20 (+ energy +40) |
| act_006 | Exploración del Bosque | 30 | 60 | +20 |

---

## Estructura del Proyecto

```
pouapi/
├── src/
│   ├── app.js              # Configuración de Express
│   ├── server.js           # Entry point
│   ├── data/
│   │   ├── pets.js         # Datos de mascotas
│   │   ├── items.js        # Catálogo de ítems
│   │   └── activities.js   # Lista de actividades
│   ├── routes/
│   │   ├── pets.js         # Rutas: /api/pets
│   │   ├── items.js        # Rutas: /api/items
│   │   ├── shop.js         # Rutas: /api/shop
│   │   └── activities.js   # Rutas: /api/activities
│   ├── controllers/
│   │   ├── petsController.js
│   │   ├── itemsController.js
│   │   ├── shopController.js
│   │   └── activitiesController.js
│   └── middleware/
│       ├── errorHandler.js
│       └── validator.js
├── package.json
├── .env.example
└── README.md
```

---

## Endpoints Planificados

### Mascotas `/api/pets`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/pets` | Listar todas las mascotas |
| POST | `/api/pets` | Crear nueva mascota |
| GET | `/api/pets/:id` | Obtener mascota por ID |
| PUT | `/api/pets/:id` | Actualizar mascota |
| DELETE | `/api/pets/:id` | Eliminar mascota |
| PATCH | `/api/pets/:id/feed` | Alimentar mascota con un ítem |
| PATCH | `/api/pets/:id/play` | Hacer jugar a la mascota |

### Ítems `/api/items`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/items` | Listar todos los ítems |
| GET | `/api/items/:id` | Obtener ítem por ID |
| GET | `/api/items?category=comida` | Filtrar por categoría |

### Tienda `/api/shop`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/shop` | Ver todos los ítems disponibles |
| POST | `/api/shop/buy` | Comprar un ítem para una mascota |

### Actividades `/api/activities`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/activities` | Listar actividades disponibles |
| GET | `/api/activities/:id` | Obtener actividad por ID |
| POST | `/api/activities/:id/play` | Realizar una actividad con una mascota |

---

## Reglas de Negocio

- Las stats de la mascota (health, hunger, energy, happiness) siempre estarán entre **0 y 100**.
- Si `health` llega a **0**, la mascota entra en estado crítico (`status: "critical"`).
- Cada actividad consume `energyCost` de energía. Si la mascota no tiene suficiente, la acción es rechazada.
- Al comprar un ítem, se descuentan las `coins` de la mascota. Si no tiene suficiente, la compra es rechazada.
- Los ítems de categoría `ropa` no afectan stats de supervivencia, solo `happiness`.
- La mascota sube de nivel cada vez que acumula **100 puntos de experiencia**.

---

---

# ✅ Tareas a Realizar

### Tarea 1 — Configuración Inicial del Proyecto
- [x] Inicializar proyecto con `npm init`
- [x] Instalar dependencias: `express`, `cors`, `morgan`, `dotenv`
- [x] Crear estructura de carpetas (`src/`, `routes/`, `controllers/`, `data/`, `middleware/`)
- [x] Configurar `app.js` con middlewares globales (cors, json, morgan)
- [x] Crear `server.js` como entry point
- [x] Crear `.env.example` con variables de entorno básicas

---

### Tarea 2 — Datos Iniciales (Seed Data)
- [x] Crear `src/data/items.js` con los 11 ítems precargados
- [x] Crear `src/data/activities.js` con las 6 actividades precargadas
- [x] Crear `src/data/pets.js` con 2–3 mascotas de ejemplo

---

### Tarea 3 — Rutas y Controladores de Mascotas (`/api/pets`)
- [x] Crear `routes/pets.js` con todos los endpoints de mascotas
- [x] Implementar `controllers/petsController.js` con lógica CRUD
- [x] Implementar lógica de stats (clamp 0–100, level up)
- [x] Implementar endpoint `PATCH /api/pets/:id/feed` (usar ítem sobre mascota)
- [x] Implementar endpoint `PATCH /api/pets/:id/play` (activar estado de juego)

---

### Tarea 4 — Rutas y Controladores de Ítems (`/api/items`)
- [x] Crear `routes/items.js`
- [x] Implementar `controllers/itemsController.js`
- [x] Soporte para filtro por categoría con query param `?category=`

---

### Tarea 5 — Rutas y Controladores de Tienda (`/api/shop`)
- [x] Crear `routes/shop.js`
- [x] Implementar `controllers/shopController.js`
- [x] Lógica de compra: validar coins, descontar y aplicar ítem al instante o al inventario

---

### Tarea 6 — Rutas y Controladores de Actividades (`/api/activities`)
- [x] Crear `routes/activities.js`
- [x] Implementar `controllers/activitiesController.js`
- [x] Lógica de `POST /api/activities/:id/play`: validar energía, aplicar recompensas, sumar experiencia

---

### Tarea 7 — Middleware de Errores y Validaciones
- [x] Crear `middleware/errorHandler.js` (manejo centralizado de errores)
- [x] Crear `middleware/validator.js` (validar body en POST/PATCH)
- [x] Respuestas de error estandarizadas con `status`, `error`, `message`

---

### Tarea 8 — Pruebas Manuales con colección de peticiones
- [x] Probar todos los endpoints con ejemplos reales
- [x] Verificar reglas de negocio (stats clamping, coins insuficientes, energía insuficiente)
- [x] Documentar respuestas de error

---

### Tarea 9 — Generar `README.md` con documentación estilo Rick and Morty API
- [x] Secciones: Introducción, Base URL, Mascotas, Ítems, Tienda, Actividades
- [x] Incluir ejemplos de request y response para cada endpoint
- [x] Diseño visual con emojis, tablas y estructura similar a https://rickandmortyapi.com/documentation

---

# ✔️ Tareas Realizadas

- [x] Tarea 1: Configuración inicial del servidor y estructura de carpetas.
- [x] Tarea 2: Creación de datos semilla para ítems, actividades y mascotas.
- [x] Tarea 3: Implementación de CRUD y lógica de negocio para mascotas.
- [x] Tarea 4: Rutas y controladores de ítems con filtrado por categoría.
- [x] Tarea 5: Lógica de compra en la tienda.
- [x] Tarea 6: Sistema de actividades con recompensas y experiencia.
- [x] Tarea 7: Middleware de errores y validación de esquemas.
- [x] Tarea 8: Pruebas manuales exitosas de todos los endpoints.
- [x] Tarea 9: Documentación completa en README.md.

---

> **Estado actual:** Proyecto finalizado. Todos los endpoints están operativos y documentados.
> **Próximo paso:** Entrega al usuario.
