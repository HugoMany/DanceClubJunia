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

        const result = await adminService.deleteCourse(courseID);

        if (result) {
            res.json({ success: true });
        } else {
            res.status(400).json({ success: false, message: 'La suppression du cours a échoué.' });
        }
    } catch (error) {
        console.error('deleteCourse | error:', error);
        res.status(500).json(false);
    }
};

exports.createCard = async (req, res) => {
    try {
        const { place, price } = req.body;

        console.log(`createCard | place, price : ${place}, ${price}`);

        // Vérifier que les champs place et price sont fournis et sont des entiers positifs
        if (!Number.isInteger(place) || place <= 0) {
            return res.status(400).json({ error: 'Le champ place doit être un entier positif.' });
        }

        if (!Number.isInteger(price) || price <= 0) {
            return res.status(400).json({ error: 'Le champ price doit être un entier positif.' });
        }

        await adminService.createCard(place, price);

        res.json({ success: true });
    } catch (error) {
        console.error('createCard | error:', error);
        res.status(500).json(false);
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const { place } = req.body;

        console.log(`deleteCard | place : ${place}`);

        // Vérifier que le champ place est fourni et est un entier positif
        if (!Number.isInteger(place) || place <= 0) {
            return res.status(400).json({ error: 'Le champ place doit être un entier positif.' });
        }

        await adminService.deleteCard(place);

        res.json({ success: true });
    } catch (error) {
        console.error('deleteCard | error:', error);
        res.status(500).json(false);
    }
};

exports.modifyPlacePrice = async (req, res) => {
    try {
        const { type, price } = req.body;

        console.log(`modifyPlacePrice | type, price : ${type}, ${price}`);

        // Vérification des paramètres d'entrée
        if (!type || !price) {
            return res.status(400).json({ error: 'Les paramètres type et price sont requis.' });
        }

        // Vérification du type de place
        if (type !== 'ticket' && type !== 'subscription' && !type.startsWith('card')) {
            return res.status(400).json({ error: 'Type de place non valide. Utilisez "ticket", "subscription" ou "cardN".' });
        }

        // Vérification de la validité de cardN
        if (type.startsWith('card') && !/card\d+/.test(type)) {
            return res.status(400).json({ error: 'Format de carte invalide. Utilisez "cardN" où N est un entier.' });
        }

        // Vérification du prix
        if (!Number.isInteger(price) || price <= 0) {
            return res.status(400).json({ error: 'Le prix doit être un entier positif.' });
        }

        await adminService.modifyPlacePrice(type, price);

        res.json({ success: true });
    } catch (error) {
        console.error('modifyPlacePrice | error:', error);
        res.status(500).json(false);
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags } = req.body;

        console.log(`createCourse | image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags : ${image}, ${title}, ${type}, ${duration}, ${startDate}, ${startTime}, ${location}, ${maxParticipants}, ${paymentType}, ${isEvening}, ${recurrence}, ${teachers}, ${links}, ${students}, ${tags}`);

        // Vérifier si les champs obligatoires sont présents
        if (!image || !title || !type || !duration || !startDate || !startTime || !location || !maxParticipants || !paymentType || !teachers || !Array.isArray(teachers)) {
            return res.status(400).json({ error: 'Certains champs obligatoires sont manquants ou invalides.' });
        }

        // Vérifier si les champs numériques sont valides
        if (isNaN(duration) || isNaN(maxParticipants) || isNaN(isEvening) || (recurrence && isNaN(recurrence))) {
            return res.status(400).json({ error: 'Certains champs numériques sont invalides.' });
        }

        // Vérifier si la date est au format YYYY-MM-DD
        if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
            return res.status(400).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
        }

        // Vérifier si l'heure est au format HH:mm
        if (!/^\d{2}:\d{2}$/.test(startTime)) {
            return res.status(400).json({ error: "L'heure de début du cours doit être au format HH:mm." });
        }

        // Combiner startDate et startTime
        const startDateTime = new Date(`${startDate} ${startTime}`);

        // Vérifier si la date et l'heure sont valides
        if (isNaN(startDateTime.getTime())) {
            return res.status(400).json({ error: 'La date ou l\'heure de début du cours est invalide.' });
        }

        // Appeler le service pour créer un cours
        const createdCourse = await adminService.createCourse(image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags);

        // Envoyer la réponse avec le cours créé
        res.json({ success: true, course: createdCourse });

    } catch (error) {
        console.error('createCourse | error:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du cours.' });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { firstname, surname, email, password, connectionMethod, photo, description } = req.body;

        // Vérifier si tous les champs requis sont fournis
        if (!firstname || !surname || !email || !password || !connectionMethod) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }

        const result = await adminService.createTeacher(firstname, surname, email, password, connectionMethod, photo, description);

        if (result) {
            // Supprimer le mot de passe de la réponse
            delete result.password;
            res.status(201).json({ success: true, teacher: result });
        } else {
            res.status(500).json({ error: 'Impossible de créer le professeur.' });
        }
    } catch (error) {
        console.error('createTeacher | error:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du professeur.' });
    }
};

exports.getPayments = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const payments = await adminService.getPayments(startDate, endDate);
        res.json({ success: true, payments });
    } catch (error) {
        console.error('getPayments | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};