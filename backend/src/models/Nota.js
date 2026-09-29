const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Nota = sequelize.define('Nota', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_archivo: { type: DataTypes.INTEGER, allowNull: false},
    contenido: { type: DataTypes.TEXT, allowNull: false },
    pagina: { type: DataTypes.INTEGER, allowNull: false },
    fecha_creacion: { type: DataTypes.DATE },
    fecha_modificacion: { type: DataTypes.DATE },
    coordenadas: { type: DataTypes.TEXT }
});

module.exports = Nota;