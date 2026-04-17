# 🎮 PouApp v2.0 — Arquitectura Frontend Expandida

## Descripción General

Interfaz de usuario interactiva y altamente dinámica para el videojuego de mascota virtual, construida con **React + Vite**. Consume la PouAPI y presenta una experiencia rica en animaciones, minijuegos interactivos, personalización profunda y características sociales en tiempo real, manteniendo una estética de juego móvil colorida y fluida.

---

## Stack Tecnológico Actualizado

| Capa | Tecnología | Propósito |
|---|---|---|
| Framework UI | React 18 (Vite) | Componentes reactivos |
| Estilos | Tailwind CSS v3 | Utilidades CSS rápidas |
| Animaciones Avanzadas | **Framer Motion** | Transiciones fluidas, drag & drop, físicas UI |
| Minijuegos | **HTML5 Canvas API** | Renderizado de juegos de alto rendimiento (ej. Flappy Pou) |
| Tiempo Real | **Socket.io-client** | Notificaciones en vivo, multijugador y visitas a amigos |
| HTTP Client | Axios | Consumo de la API REST |
| Estado Global | React Context + useReducer | Estado de la mascota y usuario |
| Fuentes | Google Fonts: **Fredoka One** (display) + **Nunito** (body) | Estética lúdica |
| Iconos | Lucide React | Íconos consistentes |

---

## Dirección Estética

**Tono:** Playful-card / Mobile-game interactivo.

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
  --color-gold:      #FFD700;   /* misiones completadas / logros */
  --color-online:    #2ED573;   /* estado de amigos online */
  --color-epic:      #9B59B6;   /* ítems de personalización épicos */
  --shadow-card:     0 8px 24px rgba(0,0,0,0.08);
  --radius-card:     20px;
}
Tipografía:

Fredoka One → Títulos, nombre de la mascota, nivel, puntuaciones.

Nunito → Stats, botones, descripciones, chat social.

Diferenciador visual interactivo: - Fondos de habitación dinámicos (día/noche según la hora real del usuario).

Físicas táctiles: Al arrastrar comida hacia la mascota, esta sigue el ítem con los ojos; al soltarla, se la come con una animación.

Partículas emergentes al ganar experiencia, monedas o completar logros.

Estructura de Carpetas Expandida
Plaintext
pou-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Layout raíz + rutas
│   ├── index.css                 # Tailwind directives + variables globales
│   │
│   ├── api/
│   │   ├── pouApi.js             # Axios instance + endpoints REST
│   │   └── socket.js             # Configuración y eventos de Socket.io
│   │
│   ├── context/
│   │   ├── PetContext.jsx        # Estado global de la mascota
│   │   └── SocketContext.jsx     # Estado de la conexión en tiempo real
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx      # Contenedor móvil (max-w-sm)
│   │   │   ├── BottomNav.jsx     # Navegación: Inicio | Tienda | Juegos | Social
│   │   │   └── TopBar.jsx        # Nivel, progreso de EXP y Monedas
│   │   │
│   │   ├── pet/
│   │   │   ├── PetDisplay.jsx    # Avatar interactivo (DragTarget + Framer Motion)
│   │   │   ├── PetStats.jsx      # Progress bars
│   │   │   ├── StatBar.jsx       
│   │   │   └── PetStatus.jsx     
│   │   │
│   │   ├── actions/
│   │   │   ├── ActionPanel.jsx   # Grid de acciones rápidas
│   │   │   └── ActionButton.jsx  
│   │   │
│   │   ├── shop/
│   │   │   ├── ShopModal.jsx     
│   │   │   ├── ItemCard.jsx      
│   │   │   └── CategoryFilter.jsx 
│   │   │
│   │   ├── minigames/            # 🚀 NUEVO: Sistema de juegos
│   │   │   ├── MinigameSelector.jsx # Carrusel de juegos disponibles
│   │   │   ├── FlappyPou.jsx     # Juego Canvas: Salto de obstáculos
│   │   │   └── MemoryPou.jsx     # Juego React: Cartas de memoria
│   │   │
│   │   ├── customization/        # 🚀 NUEVO: Armario y Decoración
│   │   │   ├── Wardrobe.jsx      # Vestir a la mascota (Drag & Drop)
│   │   │   └── RoomDecor.jsx     # Cambiar fondos y muebles
│   │   │
│   │   └── social/               # 🚀 NUEVO: Interacción con otros
│   │       ├── FriendsList.jsx   # Lista de amigos (Online/Offline)
│   │       ├── Leaderboard.jsx   # Ranking global de minijuegos
│   │       └── VisitRoom.jsx     # Ver la mascota y cuarto de un amigo
│   │
│   ├── hooks/
│   │   ├── usePet.js             
│   │   ├── useShop.js            
│   │   ├── useToast.js           
│   │   ├── useSocket.js          # Escuchar y emitir eventos en tiempo real
│   │   └── useDragAndDrop.js     # Lógica para arrastrar comida/ropa
│   │
│   ├── pages/
│   │   ├── HomePage.jsx          # Vista principal (Habitación)
│   │   ├── ShopPage.jsx          
│   │   ├── MinigamesPage.jsx     # Hub de juegos
│   │   ├── SocialPage.jsx        # Hub de amigos y ranking
│   │   └── QuestsPage.jsx        # 🚀 NUEVO: Misiones diarias y logros
│   │
│   └── utils/
│       ├── statHelpers.js        
│       ├── constants.js          
│       └── canvasHelpers.js      # Lógica de colisiones y renderizado para juegos
│
├── package.json
└── tailwind.config.js
Componentes Principales — Nuevas Funcionalidades
PetDisplay.jsx (Ahora interactivo)
Se integra con Framer Motion para permitir interacciones táctiles: acariciar a la mascota (swipe repetido o tap rápido) aumenta ligeramente la felicidad.

Funciona como un DropZone. La comida desde el inventario se arrastra hacia la mascota para alimentarla dinámicamente, ejecutando una animación de masticar y emitiendo el evento de consumo.

MinigameSelector.jsx & Juegos
Reemplaza la antigua llamada a la API por una experiencia jugable real.

FlappyPou: Componente que monta un <canvas> utilizando requestAnimationFrame. Recompensa monedas según la puntuación obtenida al perder, haciendo un POST /api/activities/flappy/submit-score.

MemoryPou: Componente basado en grid de React. Evalúa el tiempo y los intentos para otorgar recompensas.

QuestsPage.jsx (Misiones Diarias)
Panel con tareas generadas diariamente (ej. "Alimenta a Pou 3 veces", "Juega 2 partidas de memoria").

Barra de progreso general y botón para reclamar recompensas (cofres con monedas o ítems exclusivos) al completar tareas.

Wardrobe.jsx (Personalización)
La ropa comprada en la tienda se equipa aquí. La mascota se re-renderiza con capas superpuestas (Sombrero, Gafas, Traje) guardadas en el perfil del usuario. Los z-indexes están calculados para que la ropa fluya con las animaciones base del avatar.

SocialPage.jsx & Tiempo Real
Conectado vía WebSockets. Muestra notificaciones push in-app si un amigo visita a tu mascota.

Ranking Global: Tabla de líderes de los minijuegos actualizada en tiempo real.

Visitar: Modo de solo lectura donde cargas el estado público de la mascota de otro usuario.

Flujo de Datos Actualizado
1. Interacción Básica (Drag & Drop)
Plaintext
Usuario arrastra "Hamburguesa" sobre PetDisplay
  └── useDragAndDrop detecta intersección y suelta (Drop)
        └── POST /api/pets/:id/feed { itemId: 'burger' }
              ├── Framer Motion ejecuta animación "Comiendo"
              └── PetContext actualiza stats (Hambre baja, Felicidad sube)
2. Minijuego y Tiempo Real
Plaintext
App inicia
  ├── Conexión Socket.io establecida -> Emite 'user_online'
  └── Usuario navega a MinigamesPage -> Juega "MemoryPou"
        ├── Al terminar, el componente calcula Score
        ├── POST /api/activities/memory/score -> Actualiza DB (Monedas + EXP)
        └── Socket emite 'score_update' -> Notifica al servidor para rankings en vivo
✅ Tareas a Realizar
Fase 1: Base de la Aplicación (Completada)
[x] Configuración de Vite, Tailwind CSS y estructura base.

[x] Implementación de PetContext, componentes visuales de la mascota y stats.

[x] Panel de acciones básico y consumo de API.

[x] Sistema de tienda modal con filtros y compras funcionales.

Fase 2: Interactividad Avanzada (NUEVO)
[x] Instalar framer-motion y react-dnd (o configurar Drag events nativos).
[x] Refactorizar PetDisplay para soportar animaciones por eventos (acariciar, rebotar al tocar).

[x] Implementar Drag & Drop funcional: Arrastrar ítems del inventario a la mascota para consumirlos.

[x] Crear el sistema de Wardrobe (Armario) superponiendo imágenes/componentes sobre la mascota base.

[x] Lógica de cambio dinámico de fondos (Día/Noche).

Fase 3: Ecosistema de Miniguegos (NUEVO)
[x] Crear la página MinigamesPage con un carrusel de selección visual.
[x] Desarrollar MemoryPou usando estado de React (grids, cartas volteadas, timers de bloqueo).
[x] Desarrollar FlappyPou implementando un loop de juego básico en un <canvas>.
[x] Conectar los resultados de los juegos con la API para otorgar recompensas reales y actualizar el contexto.

Fase 4: Retención y Social (NUEVO)
[x] Diseñar el componente de DailyQuests (Misiones Diarias) con barras de progreso individuales y globales.
[x] Instalar socket.io-client y configurar SocketContext para manejar conexiones globales.
[x] Crear la página SocialPage con lista de amigos, búsqueda de usuarios y ranking (Leaderboard).
[ ] Implementar la funcionalidad VisitRoom.jsx para cargar la vista de la mascota de otros usuarios.