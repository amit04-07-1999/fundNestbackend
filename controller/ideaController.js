const multer = require('multer');
const path = require('path');
const Ideas = require('../model/ideas');
const Razorpay = require('razorpay');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_n5oTuMseyDclhS',
    key_secret: 'eR0Agm0HEGChnUp5Oi1mqUWc'
});

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Create a new idea
const createIdeas = async (req, res) => {
    try {
        const { name, email, company, phone, goal, domain, qualification, content } = req.body;
        const attachments = req.files ? req.files.map(file => file.path) : []; // Handle multiple files

        if (!name || !email || !phone || !qualification || !goal || !domain || !content) {
            throw new Error('All required fields must be provided.');
        }

        // Define payment amount
        const paymentAmount = 1500;

        // Create the idea in the database
        const newIdea = new Ideas({
            name,
            email,
            company,
            phone,
            goal,
            domain,
            qualification,
            content, // Added field
            attachments,
            paymentAmount
        });
        await newIdea.save();

        // Create Razorpay order
        const options = {
            amount: paymentAmount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_order_${newIdea._id}`,
            payment_capture: 1 // auto capture
        };

        const order = await razorpay.orders.create(options);

        // Send the Razorpay order details to the client
        res.status(201).json({
            idea: newIdea,
            razorpayOrder: order
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all ideas
const getIdeas = async (req, res) => {
    try {
        const ideas = await Ideas.find();
        res.status(200).json(ideas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single idea by ID
const getIdeaById = async (req, res) => {
    try {
        const idea = await Ideas.findById(req.params.id);
        if (!idea) {
            return res.status(404).json({ message: 'Idea not found' });
        }
        res.status(200).json(idea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an idea
const updateIdea = async (req, res) => {
    try {
        const updates = { ...req.body };
        const attachments = req.files ? req.files.map(file => file.path) : [];

        if (attachments.length > 0) {
            updates.attachments = attachments;
        }

        const updatedIdea = await Ideas.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }
        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an idea
const deleteIdea = async (req, res) => {
    try {
        const deletedIdea = await Ideas.findByIdAndDelete(req.params.id);
        if (!deletedIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }
        res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createIdeas,
    getIdeas,
    getIdeaById,
    updateIdea,
    deleteIdea
};