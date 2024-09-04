const express = require('express');
const router = express.Router();
const ideaController = require('../controller/ideaController');
const { middleware } = require('../middleware/jwtmiddleware');
const multer = require('multer');
const upload = multer();

// Use multer middleware to handle file uploads
router.post('/idea', middleware, upload.single('attachment'), ideaController.createIdeas);
router.get('/ideas', middleware, ideaController.getIdeas);
router.get('/idea/:id', middleware, ideaController.getIdeaById);
router.put('/idea/:id', middleware, ideaController.updateIdea);
router.delete('/idea/:id', middleware, ideaController.deleteIdea);

module.exports = router;
