const jwt = require('jsonwebtoken');
const config = require('../config/config');
const guestService = require('../services/guestService');
const { sendMail } = require('../utility/mailer');

exports.getAllCourses = async (req, res) => {
    try {
        console.log(`getAllCourses`);
        const courses = await guestService.getAllCourses();
        res.status(200).json({ success: true, courses: courses });
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
    const { email, password, captcha } = req.body;

    console.log(`login | email, password: ${email}, XXXXXXX`);

    if (!email) {
        return res.status(400).json({ error: 'Email manquant.' });
    }
    if (!password) {
        return res.status(401).json({ error: 'Mot de passe manquant.' });
    }
    if (!captcha) {
        return res.status(404).json({ error: 'Captcha manquant.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(402).json({ error: 'Email invalide.' });
    }
    if (password.length < 8) {
        return res.status(403).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }

    try {
        const user = await guestService.login(email, password, captcha);

        // Génération du jeton d'accès
        const accessToken = jwt.sign({ id: user.userID, userType: user.userType }, config.jwtSecret, {
            expiresIn: config.accessTokenLife // Durée de vie du jeton d'accès
        });

        // Génération du jeton de rafraîchissement
        const refreshToken = jwt.sign({ id: user.userID, userType: user.userType }, config.jwtRefreshSecret, {
            expiresIn: config.refreshTokenLife // Durée de vie du jeton de rafraîchissement
        });

        // Stocker le jeton de rafraîchissement en base de données ou en cache
        await guestService.saveOrUpdateRefreshToken(user.userID, refreshToken);

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.status(200).json({ success: true, userID: user.userID, userType: user.userType, token: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.error('login | error:', error);

        switch (error.message) {
            case "Identifiants invalides.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Échec de la vérification reCAPTCHA.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la vérification reCAPTCHA.":
                res.status(503).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};


exports.registerStudent = async (req, res) => {
    const { firstname, surname, email, password, connectionMethod, photo, captcha } = req.body;

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

    if (!captcha) {
        return res.status(403).json({ error: 'Captcha manquant.' });
    }

    try {
        const studentID = await guestService.registerStudent(firstname, surname, email, password, connectionMethod, photo, captcha);
        res.status(200).json({ success: true, studentID });
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
            case "Échec de la vérification reCAPTCHA.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la vérification reCAPTCHA.":
                res.status(505).json({ success: false, message: error.message });
                break;
            case "Erreur lors du hachage du mot de passe.":
                res.status(506).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getCoursesByPeriod = async (req, res) => {
    const { startDate, endDate } = req.query;

    if ((startDate &&!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) || (endDate && !/^\d{4}-\d{2}-\d{2}$/.test(endDate))) {
        return res.status(401).json({ error: 'Les dates de début et de fin doident être au format YYYY-MM-DD.' });
    }

    try {
        const courses = await guestService.getCoursesByPeriod(startDate, endDate);

        res.status(200).json({ success: true, courses });
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
        res.status(200).json({ success: true, ticketPrice });
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

exports.getCardPrices = async (req, res) => {
    try {
        const cardPrices = await guestService.getCardPrices();
        res.status(200).json({ success: true, cardPrices });
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

        const { userIDs } = req.body;
        console.log("getContactsTeachers | userIDs : ", userIDs);
        const contacts = await guestService.getContactsTeachers(userIDs || []);
        res.status(200).json({ success: true, contacts: contacts });
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

exports.generateResetToken = async (req, res) => {
    const { email } = req.body;

    console.log(`generateResetToken | email: ${email}`);

    if (!email) {
        return res.status(400).json({ success: false, message: "Email manquant." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(401).json({ error: 'Email invalide.' });
    }

    try {
        const token = await guestService.generateResetToken(email);

        const resetUrl = `http://localhost:3001/reset-password/token/${token}`;
        const message = `
              <h1>Vous avez demandé une réinitialisation de mot de passe</h1>
              <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
              <a href="${resetUrl}">Réinitialiser le mot de passe</a>
          `;

        
        await sendMail(email, 'Réinitialisation de mot de passe', '', message);
        
        res.status(200).json({ success: true, message: "Token généré et stocké." });
    } catch (error) {
        console.error('generateResetToken | error:', error);

        switch (error.message) {
            case "Erreur lors de la vérification de l'existence du token.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'insertion du token dans la base de données.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la vérification de l'existence de l'utilisateur.":
                res.status(503).json({ success: false, message: error.message });
                break;
            case "L'utilisateur n'existe pas.":
                res.status(504).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    console.log(`resetPassword | token: ${token}, newPassword: ${newPassword}`);

    if (!token || !newPassword) {
        return res.status(400).json({ success: false, message: 'Token et newPassword sont requis.' });
    }
    if (newPassword.lengh < 8) {
        return res.status(401).json({ success: false, message: 'Le mot de passe est trop court.' });
    }

    try {
        

        await guestService.resetPassword(token, newPassword);
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('resetPassword | error:', error);

        switch (error.message) {
            case "Token expiré.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Token introuvable.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la modification du mot de passe.":
                res.status(503).json({ success: false, message: error.message });
                break;
            case "Le token n'existe pas.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Token invalide.":
                res.status(505).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};