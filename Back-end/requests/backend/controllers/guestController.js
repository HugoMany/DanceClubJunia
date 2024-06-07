const jwt = require('jsonwebtoken');
const config = require('../config/config');
const guestService = require('../services/guestService');

exports.getAllCourses = async (req, res) => {
    try {
        console.log(`getAllCourses`);
        const courses = await guestService.getAllCourses();
        res.json({ success: true, courses: courses });
    } catch (error) {
        console.error('getAllCourses | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(`login | email, password: ${email}, XXXXXXX`);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email invalide.' });
    }

    try {
        const user = await guestService.login(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.userID, userType: user[0].userType }, config.jwtSecret, {
            expiresIn: '1h' // Expire in 1 hour
        });

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' }); //  secure: true  si https
        res.json({ success: true, userID: user[0].userID, userType : user[0].userType, token : token });
    } catch (error) {
        console.error('login | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.registerStudent = async (req, res) => {
    const { firstname, surname, email, password, connectionMethod, photo } = req.body;

    console.log(`registerStudent | firstname, surname, email: ${firstname}, ${surname}, ${email}`);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email invalide.' });
    }

    try {
        const studentID = await guestService.registerStudent(firstname, surname, email, password, connectionMethod, photo);
        res.json({ success: true, studentID });
    } catch (error) {
        console.error('registerStudent | error:', error);
        if (error.message === 'Email already in use') {
            res.status(400).json({ success: false, message: 'Email already in use' });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

exports.getCoursesByPeriod = async (req, res) => {
    const { startDate, endDate } = req.query;

    // Vérifier si les dates sont fournies et valides
    if (!startDate || !endDate || isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        return res.status(400).json({ error: 'Les dates fournies sont invalides.' });
    }

    try {
        const courses = await guestService.getCoursesByPeriod(startDate, endDate);
        
        res.json({ success: true, courses });
    } catch (error) {
        console.error('getCoursesByPeriod | error:', error);
        res.status(500).json({ error: 'Erreur du serveur lors de la récupération des cours.' });
    }
};

exports.getTicketPrice = async (req, res) => {
    try {
        const ticketPrice = await guestService.getTicketPrice();
        res.json({ success: true, ticketPrice });
    } catch (error) {
        console.error('getTicketPrice | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSubscriptionPrice = async (req, res) => {
    try {
        const subscriptionPrice = await guestService.getSubscriptionPrice();
        res.json({ success: true, subscriptionPrice });
    } catch (error) {
        console.error('getSubscriptionPrice | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCardPrices = async (req, res) => {
    try {
        const cardPrices = await guestService.getCardPrices();
        res.json({ success: true, cardPrices });
    } catch (error) {
        console.error('getCardPrices | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await guestService.getContacts();
        res.json({ success: true, contacts: contacts });
    } catch (error) {
        console.error('getContacts | error:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des contacts.' });
    }
};