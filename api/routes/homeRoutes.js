const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route for the home page
router.get('/', homeController.homePage);

// Route for a single post page
router.get('/post/:id', homeController.postPage);

// Route to add a comment
router.post('/post/:id/comment', homeController.addComment);

// Route for user login
router.post('/login', homeController.login);

// Route for user signup
router.post('/signup', homeController.signup);

// Route for the dashboard
router.get('/dashboard', homeController.dashboard);

module.exports = router;
