# 🐾 PouAPI Documentation

Bienvenido a la **PouAPI**, una interfaz RESTful para gestionar tu mascota virtual al estilo Pou. Aquí encontrarás todo lo que necesitas para cuidar de tu mascota, comprarle comida, ropa y ponerla a realizar divertidas actividades.

## 🚀 Base URL

```bash
http://localhost:3000/api
```

---

## 🐣 Mascotas (`/pets`)

### Obtener todas las mascotas
`GET /api/pets`

**Respuesta:**
```json
[
  {
    "id": "pet_001",
    "name": "Pochi",
    "level": 1,
    "health": 100,
    "hunger": 80,
    "energy": 90,
    "happiness": 75,
    "coins": 150,
    "status": "healthy"
  }
]
```

### Crear una mascota
`POST /api/pets`

**Body:**
```json
{
  "name": "MiniPochi"
}
```

---

## 🎒 Ítems (`/items`)

### Listar ítems por categoría
`GET /api/items?category=comida`

**Respuesta:**
```json
[
  {
    "id": "item_001",
    "name": "Hamburguesa",
    "category": "comida",
    "price": 20,
    "effects": { "hunger": 35, "happiness": 10 }
  }
]
```

---

## 🏪 Tienda (`/shop`)

### Comprar un ítem
`POST /api/shop/buy`

**Body:**
```json
{
  "petId": "pet_001",
  "itemId": "item_001"
}
```

---

## 🎮 Actividades (`/activities`)

### Realizar una actividad
`POST /api/activities/:id/play`

**Body:**
```json
{
  "petId": "pet_001"
}
```

**Respuesta:**
```json
{
  "message": "Pochi ha completado: Carrera de Obstáculos",
  "rewards": { "coins": 30, "happiness": 15, "experience": 10 },
  "pet": { ... }
}
```

---

## 🛠️ Reglas de Negocio
- **Stats:** Las estadísticas siempre se mantienen entre 0 y 100.
- **Nivel:** Cada 100 puntos de experiencia la mascota sube de nivel automáticamente.
- **Economía:** No se pueden comprar ítems si no se tienen suficientes monedas.
- **Energía:** Las actividades consumen energía; si es insuficiente, la acción será rechazada.

---

Disfruta cuidando de tu mascota con **PouAPI**! 🐾✨
