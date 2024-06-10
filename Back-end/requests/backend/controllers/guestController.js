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

        switch (error.message) {
            case "Il n\'y a pas de cours.":
                res.status(501).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(`login | email, password: ${email}, XXXXXXX`);

    if (!email) {
        return res.status(400).json({ error: 'Email manquant.' });
    }
    if (!password) {
        return res.status(401).json({ error: 'Mot de passe manquant.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(402).json({ error: 'Email invalide.' });
    }
    if (password.length <= 8) {
        return res.status(403).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }

    try {
        const user = await guestService.login(email, password);

        // Génération du token jwt pour garantir l'identité de l'utilisateur pour les prochaines requêtes
        const token = jwt.sign({ id: user.userID, userType: user[0].userType }, config.jwtSecret, {
            expiresIn: '1h' // Expire in 1 hour
        });

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' }); //  secure: true  si https
        res.json({ success: true, userID: user[0].userID, userType: user[0].userType, token: token });
    } catch (error) {
        console.error('login | error:', error);

        switch (error.message) {
            case "Identifiants invalides.":
                res.status(501).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.registerStudent = async (req, res) => {
    const { firstname, surname, email, password, connectionMethod, photo } = req.body;

    console.log(`registerStudent | firstname, surname, email, connectionMethod, photo: ${firstname}, ${surname}, ${email}, ${connectionMethod}, ${photo}`);

    if (!firstname || !surname || !email || !password || !connectionMethod) {
        return res.status(400).json({ error: "Au moins un des champs suivants n'est pas rempli: firstname, surname, email, password, connectionMethod" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(401).json({ error: 'Email invalide.' });
    }

    if (password.length < 8) {
        return res.status(402).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }

    try {
        const studentID = await guestService.registerStudent(firstname, surname, email, password, connectionMethod, photo);
        res.json({ success: true, studentID });
    } catch (error) {
        console.error('registerStudent | error:', error);

        switch (error.message) {
            case "Erreur lors de la vérification de l'existence de l'email.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Email déjà utilisé.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la création du compte.":
                res.status(503).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getCoursesByPeriod = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Les paramètres startDate et endDate sont requis.' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        return res.status(401).json({ error: 'Les dates de début et de fin doident être au format YYYY-MM-DD.' });
    }

    try {
        const courses = await guestService.getCoursesByPeriod(startDate, endDate);

        res.json({ success: true, courses });
    } catch (error) {
        console.error('getCoursesByPeriod | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération des cours.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Il n'y a pas de cours pour cette période.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getTicketPrice = async (req, res) => {
    try {
        const ticketPrice = await guestService.getTicketPrice();
        res.json({ success: true, ticketPrice });
    } catch (error) {
        console.error('getTicketPrice | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération du prix du ticket.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Le prix du ticket n'a pas été trouvé.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getSubscriptionPrice = async (req, res) => {
    try {
        const subscriptionPrice = await guestService.getSubscriptionPrice();
        res.json({ success: true, subscriptionPrice });
    } catch (error) {
        console.error('getSubscriptionPrice | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération du prix de l'abonnement.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Le prix de l'abonnement n'a pas été trouvé.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getCardPrices = async (req, res) => {
    try {
        const cardPrices = await guestService.getCardPrices();
        res.json({ success: true, cardPrices });
    } catch (error) {
        console.error('getCardPrices | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération du prix des cartes.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Le prix des cartes n'a pas été trouvé":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getContactsTeachers = async (req, res) => {
    try {
        const contacts = await guestService.getContactsTeachers();
        res.json({ success: true, contacts: contacts });
    } catch (error) {
        console.error('getContacts | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération des contacts.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Il n'y a pas de professeur.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};