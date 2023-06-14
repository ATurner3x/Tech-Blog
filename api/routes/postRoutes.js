const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to create a new post
router.post('/post', postController.createPost);

// Route to update a post
router.put('/post/:id', postController.updatePost);

// Route to delete a post
router.delete('/post/:id', postController.deletePost);

module.exports = router;
