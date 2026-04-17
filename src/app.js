const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Importar rutas
const petsRoutes = require('./routes/pets');
const itemsRoutes = require('./routes/items');
const shopRoutes = require('./routes/shop');
const activitiesRoutes = require('./routes/activities');

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/pets', petsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/activities', activitiesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la PouAPI' });
});

// Manejo de errores
app.use(require('./middleware/errorHandler'));

module.exports = app;
