const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

// Import model files
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Initialize and associate models
User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Export the initialized models
module.exports = {
  User,
  Post,
  Comment
};
