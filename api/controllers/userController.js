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

  // Action to update a user
  updateUser: async (req, res) => {
    try {
      // Handle user update logic here
      // Retrieve user data from the request body
      const { username, email } = req.body;

      // Update the user in the database
      const updatedUser = await User.update(
        { username, email },
        { where: { id: req.params.id } }
      );

      // Check if the user was found and updated
      if (updatedUser[0] === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send a response indicating successful user update
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during user update
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Action to delete a user
  deleteUser: async (req, res) => {
    try {
      // Handle user deletion logic here
      // Delete the user from the database
      const deletedUser = await User.destroy({
        where: { id: req.params.id }
      });

      // Check if the user was found and deleted
      if (deletedUser === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send a response indicating successful user deletion
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during user deletion
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = userController;