// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bookRoutes = require('./routes/books');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/books', bookRoutes);

// Conexión a MongoDB
dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));

const axios = require('axios');
const appUrl = 'https://mongodb-pi.onrender.com'; // Reemplaza con tu URL

// Función para hacer ping a la aplicación
function keepAlive() {
  axios.get(appUrl)
    .then(response => {
      console.log('Ping exitoso');
    })
    .catch(error => {
      console.error('Error al hacer ping:', error);
    });
}

// Realiza un ping cada 10 minutos (600,000 ms)
// Esto es justo antes del límite de 15 minutos de Render
setInterval(keepAlive, 600000);
