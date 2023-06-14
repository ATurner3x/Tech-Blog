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

  // Add comment action
  addComment: async (req, res) => {
    try {
      const { content } = req.body;

      const comment = await Comment.create({
        content,
        user_id: req.session.user_id,
        post_id: req.params.id
      });

      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

   // Login action
   login: async (req, res) => {
    try {
      // Handle login logic here
      // Retrieve user credentials from request body
      const { email, password } = req.body;

      // Query the database to find a matching user
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      // Validate password
      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      // Set the user's ID in the session
      req.session.user_id = user.id;

      // Redirect to the dashboard or any desired page
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Signup action
  signup: async (req, res) => {
    try {
      // Handle signup logic here
      // Retrieve user credentials from request body
      const { username, email, password } = req.body;

      // Create a new user in the database
      const newUser = await User.create({ username, email, password });

      // Set the user's ID in the session
      req.session.user_id = newUser.id;

      // Redirect to the dashboard or any desired page
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Dashboard action
  dashboard: async (req, res) => {
    try {
      // Retrieve the logged-in user's data from the database
      const user = await User.findByPk(req.session.user_id, {
        include: [{ model: Post }]
      });

      res.render('dashboard', { user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = homeController;