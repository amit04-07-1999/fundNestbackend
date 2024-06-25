const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "header is missing" });
        }

        const splittoken = token.split(' ')[1];
        if (!splittoken) {
            return res.status(401).json({ message: "unable to split token" });
        }

        const decoded = jwt.verify(splittoken, 'aaaaaaaaaaaaabbbbbbbbbbbbbbbbbcccccccccccccccccccc');
        
        const email = decoded.email;
        const role = decoded.role;
        if (!email) {
            return res.status(400).json({ message: "email not found in token" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // setting email and role in req object
        req.email = email;
        req.role = role;
        req.user = user;
        next();

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token is invalid' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
