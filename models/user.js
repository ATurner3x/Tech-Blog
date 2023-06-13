const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    // ID column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Password column
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    //create sequelize connection
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
