const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resaltado = sequelize.define('Nota', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_archivo: { type: DataTypes.INTEGER, allowNull: false},
    color: { type: DataTypes.STRING, allowNull: false },
    pagina: { type: DataTypes.INTEGER, allowNull: false },
    texto_resaltado: { type: DataTypes.TEXT, allowNull: false },
    fecha_creacion: { type: DataTypes.DATE },
    fecha_modificacion: { type: DataTypes.DATE },
    coordenadas: { type: DataTypes.TEXT }
});

module.exports = Resaltado;