const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Adjust the path based on your project structure
const ChatMessage = require('../model/ChatMessage');


//Edit Profile
exports.editProfile = async (req, res) => {
    const { name, newemail, companyname, designation, experience, educationdetails, description } = req.body;
    const email = req.email;
    const role = req.role;

    try {
        // Find the current user based on email and role
        const currentUser = await User.findOne({ email, role });

        // Check if user exists and has the correct role
        if (!currentUser || currentUser.role !== 'investor') {
            return res.status(400).send({ message: 'Investor not found, or you are not an investor', status: 400 });
        };

        // Update user fields if provided
        if (name) {
            currentUser.name = name;
        }

        if (newemail && newemail !== currentUser.email) {
            // Check if new email already exists in the database
            const existingUser = await User.findOne({ email: newemail });
            if (existingUser) {
                return res.status(400).send({ message: 'Email already exists', status: 400 });
            }
            currentUser.email = newemail;
        }

        if (companyname) {
            currentUser.companyname = companyname;
        }
        if (designation) {
            currentUser.designation = designation;
        }
        if (experience) {
            currentUser.experience = experience;
        }
        if (educationdetails) {
            currentUser.educationdetails = educationdetails;
        }
        if (description) {
            currentUser.description = description;
        }

        // Save the updated user object
        await currentUser.save();

        // Generate JWT token with user email and role
        const token = jwt.sign({ email: currentUser.email, role: currentUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return success response with updated user and token
        return res.status(200).send({ currentUser, token, status: 200 });
    } catch (error) {
        // Handle errors and log them
        console.error('Error in editProfile:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


//Get curent Investor
exports.getCurrentUser = async (req, res) => {
    const email = req.email;
    const role = req.role;
    try {
        const currentUser = await User.findOne({ email: email, role: role });
        if (!currentUser || currentUser.role !== 'investor') {
            return res.status(400).send({ message: 'Investor not found,  or you are not an Investor', status: 400 });
        };
        return res.status(200).send({ currentUser, status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

//Delete Investor
exports.deleteUser = async (req, res) => {
    const email = req.email;
    const role = req.role;
    try {
        const currentUser = await User.findOne({ email: email, role: role });
        if (!currentUser || currentUser.role !== 'investor') {
            return res.status(400).send({ message: 'User not found , or your are not an investor', status: 400 });
        };
        await currentUser.deleteOne({ email: email });
        return res.status(200).send({ message: 'Investor deleted successfully', status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

//Get all list of entrepreneurs
exports.getAllentrepreneurs = async (req, res) => {
    try {
        const investorsList = await User.find({ role: 'entrepreneur' });
        if (!investorsList) {
            return res.status(400).send({ message: 'No entrepreneur found', status: 400 });
        };
        return res.status(200).send({ investorsList, status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

// Get entrepreneur by ID
exports.getEntrepreneurById = async (req, res) => {
    const { id } = req.params;

    try {
        const entrepreneur = await User.findOne({ _id: id, role: 'entrepreneur' });

        if (!entrepreneur) {
            return res.status(404).json({ message: 'Entrepreneur not found', status: 400 });
        }

        return res.status(200).json({ entrepreneur, status: 200 });
    } catch (error) {
        console.error('Error in getEntrepreneurById:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Send message to an entrepreneur
exports.sendMessageToEntrepreneur = async (req, res) => {
    const { receiverId, message, roomId } = req.body;
    const senderId = req.user._id;

    try {
        const newMessage = new ChatMessage({
            senderId,
            receiverId,
            message,
            roomId
        });

        await newMessage.save();
        return res.status(200).send({ message: 'Message sent successfully', status: 200 });
    } catch (error) {
        console.error('Error in sendMessageToEntrepreneur:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get messages with a specific entrepreneur
exports.getMessagesWithEntrepreneur = async (req, res) => {
    const { entrepreneurId } = req.params;
    const investorId = req.user._id;

    try {
        const messages = await ChatMessage.find({
            $or: [
                { senderId: investorId, receiverId: entrepreneurId },
                { senderId: entrepreneurId, receiverId: investorId }
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).send({ messages, status: 200 });
    } catch (error) {
        console.error('Error in getMessagesWithEntrepreneur:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// exports.getMessagesWithEntrepreneur = async (req, res) => {
//     const { entrepreneurId } = req.params;
//     const investorId = req.user._id;

//     try {
//         const messages = await ChatMessage.find({
//             $or: [
//                 { senderId: investorId, receiverId: entrepreneurId },
//                 { senderId: entrepreneurId, receiverId: investorId }
//             ]
//         }).sort({ timestamp: 1 });

//         return res.status(200).send({ messages, status: 200 });
//     } catch (error) {
//         console.error('Error in getMessagesWithEntrepreneur:', error);
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
