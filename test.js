const sequelize = require('./models/index'); // Assuming your Sequelize instance is exported from 'models/index.js'

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL server has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the MySQL server:', error);
  }
}

// Call the testConnection function to check the connection
testConnection();
