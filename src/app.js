const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const path = require('path'); // Importa path al inicio

// Importar rutas
const petsRoutes = require('./routes/pets');
const itemsRoutes = require('./routes/items');
const shopRoutes = require('./routes/shop');
const activitiesRoutes = require('./routes/activities');

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../pou-frontend/dist')));

// Cualquier ruta que no coincida con la API, sirve el index.html del front
app.get('/:path*', (req, res) => {
  res.sendFile(path.join(__dirname, '../pou-frontend/dist', 'index.html'));
});

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/pets', petsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/activities', activitiesRoutes);

// 1. Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../pou-frontend/dist')));

// 2. Ruta comodín para soportar el enrutamiento de React (SPA)
app.get('/:path*', (req, res) => {
  res.sendFile(path.join(__dirname, '../pou-frontend/dist', 'index.html'));
});