const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 3306,
	dialect: 'mysql'
});

module.exports = sequelize;