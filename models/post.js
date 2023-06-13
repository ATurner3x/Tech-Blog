const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class Post extends Model {}


// create fields/columns for Post model
Post.init(
  {

    // ID column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // Title column
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    // User ID column
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {

    //create sequelize connection
    
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
