require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
require('./models/Usuario');

const app = express();

sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        console.console.log('Conexión a la base de datos OK');
        app.listen(process.env.PORT, () => {
            console.log('Servidor escuchando en el puerto ' + process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base:', error.message);
    })