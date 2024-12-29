const { Sequelize } = require('sequelize');
const config = require('./config');

// Set the environment to 'local' or the value in config
const env = config.serverConfig.nodeEnv || 'local';
const dbConfig = require('./dbConfig')[env];

// Destructure the necessary values from dbConfig
const { database, username, password, host, dialect } = dbConfig;

// Initialize Sequelize with the correct values
const sequelizeInstance = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    logging: console.log, // Enable query logging for debugging
});

module.exports = sequelizeInstance;
