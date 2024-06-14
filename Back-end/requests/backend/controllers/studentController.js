const studentService = require('../services/studentService');

exports.addCredit = async (req, res) => {
    try {
        let { studentID, credit } = req.body;
        credit = parseInt(credit);

        console.log("addCredit | studentID, credit : " + studentID + ", " + credit);

        if (!studentID) {
            return res.status(400).json({ success: false, message: 'Champ studentID manquant.' });
        }
        if (!credit) {
            return res.status(401).json({ success: false, message: 'Champ credit manquant.' });
        }
        if (isNaN(credit) || credit <= 0) {
            return res.status(402).json({ success: false, message: 'Le champ credit doit être un entier positif.' });
        }
        if (isNaN(studentID) || studentID <= 0) {
            return res.status(403).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
        }

        await studentService.addCredit(studentID, credit);

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('addCredit | error:', error);

        switch (error.message) {
            case "Erreur lors de l'ajout du credit.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'enregistrement du paiement.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getSubscriptionEndDate = async (req, res) => {
    try {
        const { studentID } = req.query;

        console.log("getSubscriptionEndDate | studentID : " + studentID);

        if (!studentID) {
            return res.status(400).json({ success: false, message: 'Champ studentID manquant.' });
        }
        if (isNaN(studentID) || studentID <= 0) {
            return res.status(401).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
        }

        const subscriptionEndDate = await studentService.getSubscriptionEndDate(studentID);

        res.status(200).json({ success: true, subscriptionEndDate: subscriptionEndDate });
    } catch (error) {
        console.log('getSubscriptionEndDate | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération de la date de fin de l'abonnement.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Pas de date de fin d'abonnement.":
                res.status(502).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getCourses = async (req, res) => {
    try {
        const { studentID } = req.query;

        console.log("getCourses | studentID : " + studentID);

        if (!studentID) {
            return res.status(400).json({ success: false, message: 'Champ studentID manquant.' });
        }
        if (isNaN(studentID) || studentID <= 0) {
            console.log("getCourses :",typeof(studentID), Number.isInteger(studentID));
            return res.status(401).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
        }

        const courses = await studentService.getCourses(studentID);

        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log('getSubscriptionEndDate | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération des cours.":
                res.status(501).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
}

exports.buyPlace = async (req, res) => {
    const { studentID, type, number } = req.body;

    console.log(`buyPlace | studentID, type, number: ${studentID}, ${type}, ${number}`);

    if (!studentID || !type || !number) {
        return res.status(400).json({ success: false, message: 'Tous les champs doivent être remplis.' });
    }

    if (isNaN(studentID) || studentID <= 0) {
        return res.status(401).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
    }
    if (type !== 'ticket' && type !== 'subscription' && type !== 'card') {
        return res.status(402).json({ error: 'Type de place non valide. Utilisez "ticket", "subscription" ou "card".' });
    }

    if (isNaN(number) || number <= 0) {
        return res.status(403).json({ success: false, message: 'number n\'est pas un entier postif.' });
    }

    try {
        await studentService.buyPlace(studentID, type, number);
        res.status(200).json({ success: true, message: 'Place purchased successfully' });
    } catch (error) {
        console.error('buyPlace | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération du prix.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la vérification des crédits.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case 'Pas d\'utilisateur avec cet ID':
                res.status(503).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la mise à jour du crédit de l\'utilisateur.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'enregistrement du paiement.":
                res.status(505).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'ajout du ticket à l'élève.":
                res.status(506).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'ajout de la carte à l'élève.":
                res.status(507).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'ajout de temps d'abonnement.":
                res.status(508).json({ success: false, message: error.message });
                break;
            case "Crédit insuffisant.":
                res.status(509).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.getPaymentHistory = async (req, res) => {
    const { studentID } = req.query;

    console.log(`getPaymentHistory | studentID: ${studentID}`);

    if (!studentID) {
        return res.status(400).json({ success: false, message: 'Champ studentID manquant.' });
    }

    if (isNaN(studentID) || studentID <= 0) {
        return res.status(401).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
    }

    try {
        const payments = await studentService.getPaymentHistory(studentID);
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('getPaymentHistory | error:', error);

        switch (error.message) {
            case "Erreur lors de la récupération des paiements.":
                res.status(501).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};

exports.reserveCourse = async (req, res) => {
    const { studentID, courseID } = req.body;

    console.log(`reserveCourse | studentID : ${studentID}, courseID : ${courseID}`);

    if (!studentID || !courseID) {
        return res.status(400).json({ error: "ID de l'étudiant ou ID du cours manquant." });
    }

    if (isNaN(studentID) || studentID <= 0) {
        return res.status(401).json({ success: false, message: 'Le champ studentID doit être un entier positif.' });
    }

    if (isNaN(courseID) || courseID <= 0) {
        return res.status(402).json({ success: false, message: 'Le champ courseID doit être un entier positif.' });
    }

    try {
        const result = await studentService.reserveCourse(studentID, courseID);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('reserveCourse | error:', error);

        switch (error.message) {
            case "L'élève est déjà inscrit à ce cours.":
                res.status(501).json({ success: false, message: error.message });
                break;
            case "Aucun mode de paiement valide trouvé ou fonds insuffisants.":
                res.status(502).json({ success: false, message: error.message });
                break;
            case "Le cours n'existe pas.":
                res.status(503).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération du cours.":
                res.status(504).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération de l'élève.":
                res.status(505).json({ success: false, message: error.message });
                break;
            case "L'élève n'existe pas.":
                res.status(506).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération des élèves du cours.":
                res.status(507).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la modification du cours.":
                res.status(508).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la récupération d'une carte valide.":
                res.status(509).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la suppression de la carte utilisée.":
                res.status(510).json({ success: false, message: error.message });
                break;
            case "Erreur lors de l'utilisation de la carte.":
                res.status(511).json({ success: false, message: error.message });
                break;
            case "Erreur lors de la décrémentation des tickets.":
                res.status(512).json({ success: false, message: error.message });
                break;
            case "L'utilisateur n'est pas un élève.":
                res.status(513).json({ success: false, message: error.message });
                break;
            default:
                res.status(500).json({ success: false, message: 'Erreur SQL' });
        }
    }
};
  
