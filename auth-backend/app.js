require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // Solo permitir este origen
  credentials: true, // Permitir cookies/autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registro de rutas
require('./routes/login.routes')(app);
require('./routes/users.routes')(app);

// Manejador de errores global
const errorHandler = require('./middlewares/errorHandler.middleware');
app.use(errorHandler);

// Puerto de escucha
app.set('port', process.env.PORT || 3000);

// Iniciar el servidor
app.listen(app.get('port'), 'localhost',() => {
  console.log(`Servidor activo en el puerto ${app.get('port')}`);
});