# 🎮 PouApp — Arquitectura Frontend

## Descripción General

Interfaz de usuario interactiva para el videojuego de mascota virtual, construida con **React + Vite** y estilizada con **Tailwind CSS**. Consume la PouAPI en `localhost:3000` y presenta una experiencia de juego tipo móvil: colorida, fluida y expresiva.

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| Framework UI | React 18 (Vite) | Componentes reactivos |
| Estilos | Tailwind CSS v3 | Utilidades CSS |
| HTTP Client | Axios | Consumo de la API |
| Estado Global | React Context + useReducer | Estado de la mascota |
| Animaciones | Tailwind `animate-*` + CSS custom | Micro-interacciones |
| Fuentes | Google Fonts: **Fredoka One** (display) + **Nunito** (body) | Estética lúdica y legible |
| Iconos | Lucide React | Íconos consistentes |

---

## Dirección Estética

**Tono:** Playful-card / Mobile-game — inspirado en la claridad de las cards de la Rick and Morty API pero con energía de juego móvil.

**Paleta de colores:**

```css
:root {
  --color-bg:        #FFF8F0;   /* crema cálido — fondo general */
  --color-surface:   #FFFFFF;   /* blanco puro — cards */
  --color-primary:   #FF6B6B;   /* coral vibrante — acción principal */
  --color-secondary: #4ECDC4;   /* teal fresco — acciones secundarias */
  --color-accent:    #FFE66D;   /* amarillo brillante — highlights */
  --color-purple:    #A78BFA;   /* lavanda — salud/pociones */
  --color-green:     #6BCB77;   /* verde vida — hambre/comida */
  --color-orange:    #FF9F43;   /* naranja — energía */
  --color-text:      #2D3436;   /* gris oscuro — texto principal */
  --color-muted:     #B2BEC3;   /* gris suave — texto secundario */
  --shadow-card:     0 8px 24px rgba(0,0,0,0.08);
  --radius-card:     20px;
}
```

**Tipografía:**
- **Fredoka One** → Títulos, nombre de la mascota, nivel
- **Nunito** → Stats, botones, descripciones (rounded y amigable)

**Diferenciador visual:** La mascota tiene un fondo con gradiente radial animado que cambia de color según su estado emocional (feliz = cálido, triste = frío, crítico = rojo pulsante).

---

## Estructura de Carpetas

```
pou-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Layout raíz + rutas
│   ├── index.css                 # Tailwind directives + custom CSS
│   │
│   ├── api/
│   │   └── pouApi.js             # Axios instance + todos los calls a la API
│   │
│   ├── context/
│   │   └── PetContext.jsx        # Estado global de la mascota (Context + useReducer)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx      # Contenedor principal tipo móvil (max-w-sm centrado)
│   │   │   └── BottomNav.jsx     # Navegación inferior: Inicio | Tienda | Actividades
│   │   │
│   │   ├── pet/
│   │   │   ├── PetDisplay.jsx    # Avatar animado de la mascota + nivel + nombre
│   │   │   ├── PetStats.jsx      # Cuatro progress bars (Hambre, Energía, Felicidad, Salud)
│   │   │   ├── StatBar.jsx       # Componente reutilizable de barra de stat
│   │   │   └── PetStatus.jsx     # Badge de estado (Feliz / Cansado / Hambriento / Crítico)
│   │   │
│   │   ├── actions/
│   │   │   ├── ActionPanel.jsx   # Grid 2x2 de botones de acción
│   │   │   └── ActionButton.jsx  # Botón individual con ícono, label y color
│   │   │
│   │   ├── shop/
│   │   │   ├── ShopModal.jsx     # Modal/drawer de tienda
│   │   │   ├── ItemCard.jsx      # Card de ítem: nombre, categoría, precio, efectos
│   │   │   └── CategoryFilter.jsx # Pills de filtro: Todos | Comida | Poción | Ropa
│   │   │
│   │   └── ui/
│   │       ├── Modal.jsx         # Wrapper genérico de modal
│   │       ├── Toast.jsx         # Notificación flotante de feedback
│   │       └── Loader.jsx        # Spinner animado durante fetch
│   │
│   ├── hooks/
│   │   ├── usePet.js             # Hook: acceder/modificar estado de mascota
│   │   ├── useShop.js            # Hook: cargar ítems de la tienda
│   │   └── useToast.js           # Hook: mostrar notificaciones
│   │
│   ├── pages/
│   │   ├── HomePage.jsx          # Vista principal: PetDisplay + Stats + ActionPanel
│   │   ├── ShopPage.jsx          # Vista de tienda con filtros e items
│   │   └── ActivitiesPage.jsx    # Vista de actividades/minijuegos
│   │
│   └── utils/
│       ├── statHelpers.js        # Helpers: getStatusColor, getLevelProgress, etc.
│       └── constants.js          # URLs, colores por categoría, labels de stats
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Componentes Principales — Detalle

### `PetDisplay.jsx`
- Emoji grande (🐣→🐥→🐔 según nivel) dentro de un círculo animado
- Fondo con gradiente radial que reacciona al estado emocional
- Animación `bounce` suave continua en estado normal
- Animación `pulse` roja en estado crítico
- Badge de nivel en esquina superior derecha

### `StatBar.jsx`
```jsx
// Props: label, value (0-100), color, icon
// Renderiza: ícono + label + barra con fill animado + número
<StatBar label="Hambre" value={pet.hunger} color="green" icon="🍔" />
<StatBar label="Energía" value={pet.energy} color="orange" icon="⚡" />
<StatBar label="Felicidad" value={pet.happiness} color="yellow" icon="😄" />
<StatBar label="Salud" value={pet.health} color="purple" icon="❤️" />
```

### `ActionPanel.jsx`
Grid 2×2 con botones grandes y coloridos:

| Botón | Color | Acción API |
|---|---|---|
| 🍔 Alimentar | Verde | Abre ShopModal filtrado por `comida` |
| 🎮 Jugar | Naranja | `POST /api/activities/:id/play` |
| 😴 Dormir | Azul | `POST /api/activities/act_005/play` (Siesta) |
| 💊 Curar | Morado | Abre ShopModal filtrado por `pocion` |

### `ItemCard.jsx`
Card estilo Rick & Morty API:
- Borde redondeado grueso, sombra suave
- Badge de categoría con color distintivo (🟢 comida / 🟣 poción / 🟡 ropa)
- Sección de efectos con chips de color por stat afectada
- Precio destacado con ícono de moneda 🪙
- Botón "Comprar" que desactiva si no hay monedas suficientes

---

## Flujo de Datos

```
App inicia
  └── PetContext carga mascota desde GET /api/pets/:id
        └── HomePage renderiza PetDisplay + PetStats + ActionPanel
              ├── Usuario pulsa "Alimentar"
              │     └── ShopModal abre → GET /api/shop?category=comida
              │           └── Usuario selecciona ítem → POST /api/shop/buy
              │                 └── PetContext actualiza stats → UI re-renderiza
              │
              ├── Usuario pulsa "Jugar"
              │     └── GET /api/activities → selección → POST /api/activities/:id/play
              │           └── PetContext actualiza stats + coins + exp
              │
              └── Toast aparece con resultado de la acción
```

---

## Integración con la API

Archivo `src/api/pouApi.js`:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
})

// Mascotas
export const getPet = (id) => api.get(`/pets/${id}`)
export const feedPet = (petId, itemId) => api.patch(`/pets/${petId}/feed`, { itemId })

// Tienda
export const getShopItems = (category) =>
  api.get('/shop', { params: category ? { category } : {} })
export const buyItem = (petId, itemId) =>
  api.post('/shop/buy', { petId, itemId })

// Actividades
export const getActivities = () => api.get('/activities')
export const playActivity = (activityId, petId) =>
  api.post(`/activities/${activityId}/play`, { petId })
```

---

## Estados Visuales de la Mascota

| Condición | Estado | Color de fondo | Animación |
|---|---|---|---|
| happiness > 70 | 😄 Feliz | Gradiente cálido (amarillo-coral) | bounce suave |
| energy < 30 | 😴 Cansada | Gradiente azul oscuro | pulse lento |
| hunger < 30 | 🍽️ Hambrienta | Gradiente naranja | wiggle |
| health < 20 | 💔 Crítica | Gradiente rojo | pulse rápido |
| Recién comió | 😋 Satisfecha | Gradiente verde | spin breve |

---

---

# ✅ Tareas a Realizar

### Tarea 1 — Configuración de Vite + Tailwind
- [x] `npm create vite@latest pou-frontend -- --template react`
- [x] Instalar dependencias: `tailwindcss`, `postcss`, `autoprefixer`, `axios`, `lucide-react`
- [x] Configurar `tailwind.config.js` con paleta de colores personalizada y fuentes
- [x] Añadir fuentes de Google Fonts (`Fredoka One`, `Nunito`) en `index.html`
- [x] Configurar variables CSS globales en `index.css`
- [x] Crear estructura de carpetas completa
- [x] Crear `src/utils/constants.js` y `src/api/pouApi.js` con la instancia de Axios

---

### Tarea 2 — Componente de Mascota y Barras de Estado
- [x] Crear `PetContext.jsx` con estado global usando `useReducer`
- [x] Crear `usePet.js` hook
- [x] Crear `PetDisplay.jsx` — avatar animado con reacción según estado emocional
- [x] Crear `StatBar.jsx` — barra de progreso reutilizable con colores por stat
- [x] Crear `PetStats.jsx` — agrupación de las 4 barras
- [x] Crear `PetStatus.jsx` — badge dinámico de estado
- [x] Crear `HomePage.jsx` con layout completo de la pantalla principal

---

### Tarea 3 — Lógica de Consumo de API (fetch con Axios)
- [x] Completar `pouApi.js` con todos los endpoints
- [x] Conectar `PetContext` a `GET /api/pets/:id` al iniciar
- [x] Implementar `ActionPanel.jsx` y `ActionButton.jsx`
- [x] Implementar acción "Jugar" → `POST /api/activities/:id/play`
- [x] Implementar acción "Dormir" → actividad Siesta
- [x] Crear `Toast.jsx` y `useToast.js` para feedback visual de acciones
- [x] Manejar estados de carga (`Loader.jsx`) y errores en los fetches

---

### Tarea 4 — Tienda e Inventario
- [x] Crear `ShopModal.jsx` — modal con lista de ítems de la API
- [x] Crear `ItemCard.jsx` — card estilo Rick & Morty con efectos y precio
- [x] Crear `CategoryFilter.jsx` — filtros por categoría (pills)
- [x] Implementar `useShop.js` hook con `GET /api/shop`
- [x] Lógica de compra: `POST /api/shop/buy`, descontar monedas, actualizar stats
- [x] Crear `BottomNav.jsx` y `ShopPage.jsx`
- [x] Conectar botones "Alimentar" y "Curar" del `ActionPanel` con el modal de tienda

---

# ✔️ Tareas Realizadas

- [x] Tarea 1: Configuración de Vite, Tailwind CSS y estructura base.
- [x] Tarea 2: Implementación de PetContext, componentes visuales de la mascota y stats.
- [x] Tarea 3: Panel de acciones funcional con consumo de API (Jugar, Dormir).
- [x] Tarea 4: Sistema de tienda modal con filtros y compras funcionales.

---

> **Estado actual:** Frontend finalizado. La aplicación permite cuidar de la mascota, comprar ítems y realizar actividades.
> **Próximo paso:** Entrega final al usuario.
