const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    domain: {
        type: String, 
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    content: { 
        type: String,
        required: true
    },
    attachments: {
        type: [String],
        required:true
    },
    paymentAmount: {
        type: Number,
        required: true
    }
});

const Ideas = mongoose.model('Ideas', ideaSchema);
module.exports = Ideas;
