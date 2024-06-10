const adminService = require('../services/adminService');

exports.getAllStudents = async (req, res) => {
    try {
        console.log("getAllStudents");

        const students = await adminService.getAllStudents();
        res.json({ success: true, students: students });
    } catch (error) {
        console.error('getAllStudents | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        console.log(`getAllTeachers`);

        console.log("getAllTeachers");
        const teachers = await adminService.getAllTeachers();
        res.json({ success: true, teachers: teachers });
    } catch (error) {
        console.error('getAllTeachers | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        console.log(`getAllAdmins`);

        console.log("getAllAdmins");
        const admins = await adminService.getAllAdmins();
        res.json({ success: true, admins: admins });
    } catch (error) {
        console.error('getAllAdmins | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        console.log(`getAllUsers`);

        console.log("getAllUsers");
        const users = await adminService.getAllUsers();
        res.json({ success: true, users: users });
    } catch (error) {
        console.error('getAllUsers | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseID } = req.body;

        console.log(`deleteCourse | courseID : ${courseID}`);

        if (!courseID) {
            return res.status(400).json({ error: 'ID du cours manquant.' });
        }
        if (!Number.isInteger(courseID)) {
            return res.status(401).json({ error: 'L\'ID du cours n\'est pas un entier.' });
        }

        const result = await adminService.deleteCourse(courseID);

        if (result) {
            res.json({ success: true });
        }
    } catch (error) {
        console.error('deleteCourse | error:', error);

        switch (error.message) {
            case "Erreur lors de la vérification de l'existence du cours.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Le cours spécifié n'existe pas.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la suppression du cours.":
                res.status(503).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        };

        res.status(500).json(false);
    }
};

exports.createCard = async (req, res) => {
    try {
        const { place, price } = req.body;

        console.log(`createCard | place, price : ${place}, ${price}`);


        if (!place) {
            return res.status(400).json({ error: 'Nombre de places manquant.' });
        }
        if (!price) {
            return res.status(401).json({ error: 'Prix manquant.' });
        }
        if (!Number.isInteger(place) || place <= 0) {
            return res.status(402).json({ error: 'Le champ place doit être un entier positif.' });
        }

        if (!Number.isInteger(price) || price <= 0) {
            return res.status(403).json({ error: 'Le champ price doit être un entier positif.' });
        }

        await adminService.createCard(place, price);

        res.json({ success: true });
    } catch (error) {
        console.error('createCard | error:', error);

        switch (error.message) {
            case "Erreur lors de la vérification de l'existence de la carte.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "La carte existe déjà.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'insertion de la carte dans la base de données.":
                res.status(503).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const { place } = req.body;

        console.log(`deleteCard | place : ${place}`);

        if (!place) {
            return res.status(400).json({ error: 'Nombre de places manquant.' });
        }
        if (!Number.isInteger(place) || place <= 0) {
            return res.status(401).json({ error: 'Le champ place doit être un entier positif.' });
        }

        await adminService.deleteCard(place);

        res.json({ success: true });
    } catch (error) {
        console.error('deleteCard | error:', error);

        switch (error.message) {
            case "Erreur lors de la vérification de l'existence de la carte.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case 'La carte spécifiée n\'existe pas.':
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la suppression de la carte.":
                res.status(503).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.modifyPlacePrice = async (req, res) => {
    try {
        const { type, price } = req.body;

        console.log(`modifyPlacePrice | type, price : ${type}, ${price}`);

        if (!type || !price) {
            return res.status(400).json({ error: 'Les paramètres type et price sont requis.' });
        }
        if (type !== 'ticket' && type !== 'subscription' && !type.startsWith('card')) {
            return res.status(401).json({ error: 'Type de place non valide. Utilisez "ticket", "subscription" ou "cardN".' });
        }
        if (type.startsWith('card') && !/card\d+/.test(type)) {
            return res.status(402).json({ error: 'Format de carte invalide. Utilisez "cardN" où N est un entier.' });
        }
        if (!Number.isInteger(price) || price <= 0) {
            return res.status(403).json({ error: 'Le prix doit être un entier positif.' });
        }

        await adminService.modifyPlacePrice(type, price);

        res.json({ success: true });
    } catch (error) {
        console.error('modifyPlacePrice | error:', error);

        switch (error.message) {
            case "Nombre d'utilisations de la carte non valide.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la vérification de l'existence da la carte.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "La carte avec le nombre d'utilisations spécifié n'existe pas.":
                res.status(503).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la modification de la carte.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la modification du prix.":
                res.status(505).json({ success: false, message: error.message });
                break;
            case "Le type de place n'est pas valide.":
                res.status(506).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags } = req.body;

        console.log(`createCourse | image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags : ${image}, ${title}, ${type}, ${duration}, ${startDate}, ${startTime}, ${location}, ${maxParticipants}, ${paymentType}, ${isEvening}, ${recurrence}, ${teachers}, ${links}, ${students}, ${tags}`);

        if (!image || !title || !type || !duration || !startDate || !startTime || !location || !maxParticipants || !paymentType || !teachers || !Array.isArray(teachers)) {
            return res.status(400).json({ error: 'Certains champs obligatoires sont manquants ou invalides.' });
        }
        if (isNaN(duration) || isNaN(maxParticipants) || isNaN(isEvening) || (recurrence && isNaN(recurrence))) {
            return res.status(401).json({ error: 'Certains champs numériques sont invalides.' });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
            return res.status(402).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
        }
        if (!/^\d{2}:\d{2}$/.test(startTime)) {
            return res.status(403).json({ error: "L'heure de début du cours doit être au format HH:mm." });
        }
        const startDateTime = new Date(`${startDate} ${startTime}`);
        if (isNaN(startDateTime.getTime())) {
            return res.status(404).json({ error: 'La date ou l\'heure de début du cours est invalide.' });
        }

        const createdCourse = await adminService.createCourse(image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags);

        res.json({ success: true, course: createdCourse });

    } catch (error) {
        console.error('createCourse | error:', error);

        switch (error.message) {
            case "Impossible de spécifier des enseignants pour un cours en soirée.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la création du cours.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération du cours.":
                res.status(503).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération des ID.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Les emails n'appartiennent à aucun utilisateur.":
                res.status(505).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { firstname, surname, email, password, connectionMethod, photo, description } = req.body;

        console.log(`createTeacher | firstname, surname, email, connectionMethod, photo, description : ${firstname}, ${surname}, ${email}, ${connectionMethod}, ${photo}, ${description}`);
        
        if (!firstname || !surname || !email || !password || !connectionMethod) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(401).json({ error: 'Email invalide.' });
        }
        if (password.length <= 8) {
            return res.status(402).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
        }

        const result = await adminService.createTeacher(firstname, surname, email, password, connectionMethod, photo, description);

        if (result) {
            // Supprimer le mot de passe de la réponse
            delete result.password;
            res.status(200).json({ success: true, teacher: result });
        } else {
            res.status(500).json({ error: 'Impossible de créer le professeur.' });
        }
    } catch (error) {
        console.error('createTeacher | error:', error);
        
        switch (error.message) {
            case "Erreur lors de la création du professeur.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération du professeur.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }

    }
};

exports.getPayments = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        console.log(`getPayments | startDate, endDate : ${startDate}, ${endDate}`);

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Les paramètres startDate et endDate sont requis.' });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
            return res.status(401).json({ error: 'Les dates de début et de fin doident être au format YYYY-MM-DD.' });
        }
        const payments = await adminService.getPayments(startDate, endDate);
        res.json({ success: true, payments });
    } catch (error) {
        console.error('getPayments | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération des paiements.":
                res.status(501).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};