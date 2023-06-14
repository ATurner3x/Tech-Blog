const { user, post, comment } = require('../../models');

// Define controller actions
const homeController = {
    // Home page action
    homePage: async (req, res) => {
      try {
        // Retrieve data from the database
        const posts = await Post.findAll({
          include: [
            { model: User, attributes: ['username'] },
            { model: Comment, include: { model: User, attributes: ['username'] } }
          ],
          order: [['createdAt', 'DESC']]
        });
  
    
  