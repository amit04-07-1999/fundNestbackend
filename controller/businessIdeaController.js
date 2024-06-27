const BusinessIdea = require('../model/BusinessIdea');
// const User = require('../models/User');

// Create a new business idea
exports.createBusinessIdea = async (req, res) => {
  try {
    const { yourName, companyName, goal, domain, content } = req.body;
    const userId = req.user._id;

    const businessIdea = new BusinessIdea({
      user: userId,
      yourName,
      companyName,
      goal,
      domain,
      content
    });

    await businessIdea.save();
    res.status(201).json(businessIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create business idea' });
  }
};

// Get all business ideas
exports.getBusinessIdeas = async (req, res) => {
  try {
    const businessIdeas = await BusinessIdea.find().populate('user', 'name email');
    res.status(200).json(businessIdeas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve business ideas' });
  }
};

// Get a single business idea by ID
exports.getBusinessIdeaById = async (req, res) => {
  try {
    const businessIdea = await BusinessIdea.findById(req.params.id).populate('user', 'name email');
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business idea not found' });
    }
    res.status(200).json(businessIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve business idea' });
  }
};

// Update a business idea by ID
exports.updateBusinessIdea = async (req, res) => {
  try {
    const { companyName, goal, domain, content } = req.body;
    const businessIdea = await BusinessIdea.findByIdAndUpdate(
      req.params.id,
      { companyName, goal, domain, content },
      { new: true, runValidators: true }
    );

    if (!businessIdea) {
      return res.status(404).json({ message: 'Business idea not found' });
    }

    res.status(200).json(businessIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update business idea' });
  }
};

// Delete a business idea by ID
exports.deleteBusinessIdea = async (req, res) => {
  try {
    const businessIdea = await BusinessIdea.findByIdAndDelete(req.params.id);
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business idea not found' });
    }
    res.status(200).json({ message: 'Business idea deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete business idea' });
  }
};
