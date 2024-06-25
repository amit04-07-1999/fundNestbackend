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
        if (!currentUser || currentUser.role !== 'enterprenuer') {
            return res.status(400).send({ message: 'Enterprenuer not found or you are not an Enterprenuer', status: 400 });
        }

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



//Get curent Enterprenuer
exports.getCurrentUser = async (req, res) => {
    const email = req.email;
    const role = req.role;
    try {
        const currentUser = await User.findOne({ email: email, role: role });
        if (!currentUser || currentUser.role !== 'enterprenuer') {
            return res.status(400).send({ message: 'User not found,  or you are not an enterprenuer', status: 400 });
        };
        return res.status(200).send({ currentUser, status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

//Delete Current Enterprenuer
exports.deleteEnterprenuer = async (req, res) => {
    const email = req.email;
    const role = req.role;
    try {
        const currentUser = await User.findOne({ email: email, role: role });
        if (!currentUser || currentUser.role !== 'enterprenuer') {
            return res.status(400).send({ message: 'User not found , or your are not an enterprenuer', status: 400 });
        };
        await currentUser.deleteOne({ email: email});
        return res.status(200).send({ message: 'User deleted successfully', status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

//Get all list of Investors
exports.getAllInvestors = async (req, res) => {
    try {
        const investorsList = await User.find({ role: 'investor' });
        if (!investorsList) {
            return res.status(400).send({ message: 'No investors found', status: 400 });
        };
        return res.status(200).send({ investorsList, status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, inside catch block', status: 500 });
    }
};

//Get Investor By ID
exports.getInvestorById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const investor = await User.findOne({ _id: id, role: 'investor' });

        if (!investor) {
            return res.status(400).send({ message: 'Investor not found', status: 400 });
        }

        return res.status(200).send({ investor, status: 200 });
    } catch (error) {
        console.error('Error in getInvestorById:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Send message to an investor
exports.sendMessageToInvestor = async (req, res) => {
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
        console.error('Error in sendMessageToInvestor:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get messages with a specific investor
// exports.getMessagesWithInvestor = async (req, res) => {
//     const { investorId } = req.params;
//     const entrepreneurId = req.user._id; 

//     try {
//         const messages = await ChatMessage.find({
//             $or: [
//                 { senderId: entrepreneurId, receiverId: investorId },
//                 { senderId: investorId, receiverId: entrepreneurId }
//             ]
//         }).sort({ timestamp: 1 });

//         return res.status(200).send({ messages, status: 200 });
//     } catch (error) {
//         console.error('Error in getMessagesWithInvestor:', error);
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
// exports.getMessagesWithInvestor = async (req, res) => {
//     const { investorId } = req.params;
//     const entrepreneurId = req.user._id; 

//     try {
//         const messages = await ChatMessage.find({
//             $or: [
//                 { senderId: entrepreneurId, receiverId: investorId },
//                 { senderId: investorId, receiverId: entrepreneurId }
//             ]
//         }).sort({ timestamp: 1 });

//         return res.status(200).send({ messages, status: 200 });
//     } catch (error) {
//         console.error('Error in getMessagesWithInvestor:', error);
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };



// Get messages by room ID
exports.getMessagesByRoomId = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await ChatMessage.find({ roomId }).sort({ timestamp: 1 });

        return res.status(200).send({ messages, status: 200 });
    } catch (error) {
        console.error('Error in getMessagesByRoomId:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};