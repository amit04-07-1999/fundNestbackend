const Business = require('../model/BusinessIdea');
const Razorpay = require('razorpay');


// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_n5oTuMseyDclhS',
    key_secret: 'eR0Agm0HEGChnUp5Oi1mqUWc'
});

// Create a new webinar booking
const createBusinessIdea = async (req, res) => {
    try {
        const { name, email, purposeOfBooking } = req.body;

        // Create the webinar booking in the database
        const newWebinar = new Business({ name, email, purposeOfBooking });
        await newWebinar.save();

        // Create Razorpay order
        const paymentAmount = 1500; // Amount in the smallest currency unit (e.g., paise for INR)
        const currency = 'INR';
        const options = {
            amount: paymentAmount * 100, // amount in the smallest currency unit
            currency: currency,
            receipt: `receipt_order_${newWebinar._id}`,
            payment_capture: 1 // auto capture
        };

        const order = await razorpay.orders.create(options);

        // Send the Razorpay order details to the client
        res.status(201).json({
            webinar: newWebinar,
            razorpayOrder: order
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
  createBusinessIdea,
};