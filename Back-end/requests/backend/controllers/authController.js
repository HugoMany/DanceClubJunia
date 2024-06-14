const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verifyToken = (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(402).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        res.status(200).json({
            userId: decoded.id,
            userType: decoded.userType,
            message: 'Token is valid'
        });
    });
};
