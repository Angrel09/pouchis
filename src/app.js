const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Importar rutas
const petsRoutes = require('./routes/pets');
const itemsRoutes = require('./routes/items');
const shopRoutes = require('./routes/shop');
const activitiesRoutes = require('./routes/activities');

// 1. Middlewares globales (SIEMPRE VAN PRIMERO)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Permite leer el body en formato JSON

// 2. Rutas de tu API (DEBEN IR ANTES DEL FRONTEND)
app.use('/api/pets', petsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/activities', activitiesRoutes);

// 3. Servir los archivos físicos del frontend (js, css, imágenes)
app.use(express.static(path.join(__dirname, '../pou-frontend/dist')));

// 4. Middleware para manejar el History Mode de React (SPA)
// Cualquier ruta que no haya sido atrapada por la API o los archivos estáticos, devuelve el index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../pou-frontend/dist', 'index.html'));
});

// 5. EXPORTAR LA APP (Crucial para que server.js no lance error de "app.listen is not a function")
module.exports = app;