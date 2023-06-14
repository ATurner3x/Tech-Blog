const { User } = require('../../models');

const userController = {
  // Action to create a new user
  createUser: async (req, res) => {
    try {
      // Handle user creation logic here
      // Retrieve user data from the request body
      const { username, email, password } = req.body;

      // Create a new user in the database
      const newUser = await User.create({ username, email, password });

      // Send a response indicating successful user creation
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during user creation
      res.status(500).json({ error: 'Internal server error' });
    }
  },