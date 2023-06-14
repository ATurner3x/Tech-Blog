const { Post, User, Comment } = require('../../models');

// Define controller actions
const postController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.session.user_id;

      // Create the post in the database
      const newPost = await Post.create({
        title,
        content,
        user_id: userId
      });

      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

   // Update a post
   updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const postId = req.params.id;
      const userId = req.session.user_id;

      // Check if the post exists and belongs to the logged-in user
      const existingPost = await Post.findOne({
        where: { id: postId, user_id: userId }
      });

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }

      // Update the post in the database
      await existingPost.update({ title, content });

      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a post
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.session.user_id;

      // Check if the post exists and belongs to the logged-in user
      const existingPost = await Post.findOne({
        where: { id: postId, user_id: userId }
      });

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }

      // Delete the post from the database
      await existingPost.destroy();

      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;