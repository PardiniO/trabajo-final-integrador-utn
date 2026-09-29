const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Archivo = sequelize.define('Archivo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_carpeta: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    tipo_archivo: { type: DataTypes.STRING, defaultValue: 'pdf', allowNull: false },
    size: { type: DataTypes.BIGINT, allowNull: true },
    cantidad_paginas: { type: DataTypes.INTEGER },
    ruta_archivo: { type: DataTypes.STRING, allowNull: false },
    portada: { type: DataTypes.STRING, allowNull: true },
    fecha_agregado: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Archivo;