const router = require('express').Router();
const businessIdeaController = require('../controller/businessIdeaController');
const { middleware } = require('../middleware/jwtmiddleware');

// Create a new business idea
router.post('/business-idea', middleware, businessIdeaController.createBusinessIdea);

// Get all business ideas
router.get('/business-idea', middleware, businessIdeaController.getBusinessIdeas);

// Get a single business idea by ID
router.get('/business-idea/:id', middleware, businessIdeaController.getBusinessIdeaById);

// Update a business idea by ID
router.put('/business-idea/:id', middleware, businessIdeaController.updateBusinessIdea);

// Delete a business idea by ID
router.delete('/business-idea/:id', middleware, businessIdeaController.deleteBusinessIdea);

module.exports = router;
