const router = require('express').Router();
const businessIdeaController = require('../controller/businessIdeaController');
const { middleware } = require('../middleware/jwtmiddleware');

// Create a new business idea (with file upload handling)
router.post('/business-idea', middleware, businessIdeaController.createBusinessIdea);

// Other routes remain the same
router.get('/business-idea', middleware, businessIdeaController.getBusinessIdeas);
router.get('/business-idea/:id', middleware, businessIdeaController.getBusinessIdeaById);
router.put('/business-idea/:id', middleware, businessIdeaController.updateBusinessIdea);
router.delete('/business-idea/:id', middleware, businessIdeaController.deleteBusinessIdea);

module.exports = router;
