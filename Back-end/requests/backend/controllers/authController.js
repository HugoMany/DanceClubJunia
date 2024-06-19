const jwt = require('jsonwebtoken');
const config = require('../config/config');
const guestService = require('../services/guestService');



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

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
        const userId = decoded.id;

        // Vérifiez si le jeton de rafraîchissement est valide et existe en base de données
        const tokenExists = await guestService.verifyRefreshToken(userId, refreshToken);
        if (!tokenExists) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Génération d'un nouveau jeton d'accès
        const newAccessToken = jwt.sign({ id: userId, userType: decoded.userType }, config.jwtSecret, {
            expiresIn: config.accessTokenLife
        });

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.status(200).json({ success: true, accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};