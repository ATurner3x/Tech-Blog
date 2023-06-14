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