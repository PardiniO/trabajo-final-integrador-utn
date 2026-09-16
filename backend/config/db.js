const { sequelize, Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME);

module.exports = sequelize;