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
  
         // Render the home page view with the retrieved data
      res.render('home', { posts });
    } catch (err) {
      console.error(err);
      // Handle any errors that occur during the process
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Single post page action
  postPage: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: { model: User, attributes: ['username'] } }
        ]
      });

      if (!post) {
        return res.render('error', { message: 'Post not found' });
      }

      res.render('post', { post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },












    module.exports = homeController;