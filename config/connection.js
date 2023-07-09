require('dotenv').config();

const Sequelize = require('sequelize');
const mysql = require('mysql2'); // Import the mysql2 package

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectModule: mysql, // Specify the mysql2 package as the dialect module
      dialectOptions: {
        decimalNumbers: true,
        flags: {
          no_default_for_field: true,
        },
      },
    });

module.exports = sequelize;
