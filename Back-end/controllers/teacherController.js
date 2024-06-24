const teacherService = require('../services/teacherService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getStudent = async (req, res) => {
  try {
    const { studentID } = req.query;

    console.log("getStudent | studentID : " + studentID);

    if (!studentID) {
      return res.status(400).json({ error: 'ID du cours manquante' });
    }
    if (!Number.isInteger(parseInt(studentID)) || studentID <= 0) {
      return res.status(401).json({ error: 'Le champ studentID doit être un entier positif.' });
    }

    const result = await teacherService.getStudent(studentID);

    return res.status(200).json({ success: true, student: result[0] });

  } catch (error) {
    console.error('getStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération de l'élève.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Aucun élève trouvé avec cet ID.":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.newStudent = async (req, res) => {
  try {
    const { firstname, surname, email, password, connectionMethod, photo } = req.body;

    console.log("newStudent | firstname, surname, email, password, connectionMethod, photo : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + photo);

    if (!firstname || !surname || !email || !password || !connectionMethod) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
    }
    if (password.length <= 8) {
      return res.status(401).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }

    // Vérification de la validité de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(402).json({ error: 'Email invalide.' });
    }

    const result = await teacherService.newStudent(firstname, surname, email, password, connectionMethod, photo);

    return res.status(200).json({ success: true, student: result[0] });

  } catch (error) {
    console.error('newStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la vérification de l'email.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'email est déjà utilisé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la création de l'élève.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'élève.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas":
        res.status(505).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.modifyStudent = async (req, res) => {
  try {
    const { studentID, firstname, surname, email, password, connectionMethod, photo } = req.body;

    console.log("modifyStudent | studentID, firstname, surname, email, password, connectionMethod : " + studentID + ", " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + photo);

    if (!studentID) {
      return res.status(400).json({ error: 'studentID manquant' });
    }
    if (!Number.isInteger(parseInt(studentID)) || studentID <= 0) {
      return res.status(401).json({ error: 'Le champ studentID doit être un entier positif.' });
    }

    const fieldsToUpdate = [];
    const values = [];

    if (firstname) {
      fieldsToUpdate.push('firstname = ?');
      values.push(firstname);
    }

    if (surname) {
      fieldsToUpdate.push('surname = ?');
      values.push(surname);
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(402).json({ error: 'Email invalide.' });
      }
      fieldsToUpdate.push('email = ?');
      values.push(email);
    }

    if (password) {
      if (password.length <= 8) {
        return res.status(403).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      fieldsToUpdate.push('password = ?');
      values.push(hashedPassword);
    }

    if (connectionMethod) {
      fieldsToUpdate.push('connectionMethod = ?');
      values.push(connectionMethod);
    }

    if (photo) {
      fieldsToUpdate.push('photo = ?');
      values.push(photo);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(404).json({ error: 'Aucun champ à mettre à jour.' });
    }

    values.push(studentID);

    const result = await teacherService.modifyStudent(studentID, values, fieldsToUpdate);

    res.status(200).json({ success: true, student: result[0] });

  } catch (error) {
    console.error('modifyStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la modification de l'élève.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Il n'existe pas d'élève avec cet ID.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'élève.":
        res.status(503).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { courseID, studentID } = req.body;
    const userIDFromToken = req.userID;
    const userTypeFromToken = req.userType;
    console.log("removeStudent | courseID, studentID : " + courseID + ", " + studentID);

    // Vérifier si les champs sont remplis
    if (!courseID || !studentID) {
      return res.status(400).json({ error: 'Les champs courseID et studentID doivent être fournis.' });
    }

    if (!Number.isInteger(parseInt(studentID)) || studentID <= 0) {
      return res.status(401).json({ error: 'L\'ID de l\'étudiant n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(402).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }

    await teacherService.removeStudent(userIDFromToken, userTypeFromToken, courseID, studentID);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('removeStudent | error:', error);

    switch (error.message) {
      case "L'élève ne fait pas parti de ce cours.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification du cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des élèves du cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Le professeur ne fais pas parti du cours (token)":
        res.status(505).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};


exports.affectStudent = async (req, res) => {
  try {
    const { studentID, courseID } = req.body;

    const userIDFromToken = req.userID;
    const userTypeFromToken = req.userType;

    console.log("affectStudent | studentID, courseID : " + studentID + ", " + courseID);

    // Vérifier si les champs sont remplis
    if (!studentID || !courseID) {
      return res.status(400).json({ error: 'affectStudent | Les champs teacherID, studentID et courseID doivent être fournis.' });
    }

    if (!Number.isInteger(parseInt(studentID)) || studentID <= 0) {
      return res.status(401).json({ error: 'L\'ID de l\'étudiant n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(402).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }

    await teacherService.affectStudent(userIDFromToken, userTypeFromToken, studentID, courseID);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('affectStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération des élèves et des professeurs.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Le professeur n\'est pas autorisé à modifier ce cours. (token)":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "L'élève est déjà dans le cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification du cours.":
        res.status(505).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.searchStudent = async (req, res) => {
  try {
    const { firstname, surname, email } = req.query;

    console.log("searchStudent | firstname, surname, email : " + firstname + ", " + surname + ", " + email);

    if (!firstname && !surname && !email) {
      return res.status(400).json({ error: 'Au moins un critère de recherche doit être fourni.' });
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(401).json({ error: 'Email invalide.' });
      }
    }

    const result = await teacherService.searchStudent(firstname, surname, email);

    if (result) {
      res.status(200).json({ success: true, students: result });
    }

  } catch (error) {
    console.error('searchStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération des élèves.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Aucun élève trouvé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.cancelCourse = async (req, res) => {
  try {
    const { courseID } = req.body;

    const userIDFromToken = req.userID;
    const userTypeFromToken = req.userType;

    console.log("cancelCourse | courseID : " + courseID);

    if (!courseID) {
      return res.status(400).json({ error: 'courseID manquant.' });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(401).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }

    await teacherService.cancelCourse(courseID, userIDFromToken, userTypeFromToken);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('cancelCourse | error:', error);

    switch (error.message) {
      case "Erreur lors de la suppression.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas ou le professeur n'est pas dans le cours ou le cours est déjà passé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.getTeacherPlaces = async (req, res) => {
  try {
    const { teacherID, startDate, endDate } = req.query;


    const userIDFromToken = req.userID;
    const userTypeFromToken = req.userType;

    console.log("getTeacherPlaces | teacherID, startDate, endDate : " + teacherID + ", " + startDate + ", " + endDate);

    if (userTypeFromToken == "teacher") {
      if (userIDFromToken != teacherID) {
        return res.status(404).json({ success: false, message: 'Le teacherID et le token ne correspondent pas' });
      }
    }

    if (!teacherID) {
      return res.status(400).json({ error: 'Le champ teacherID doit être fourni.' });
    }
    if (!Number.isInteger(parseInt(teacherID)) || teacherID <= 0) {
      return res.status(401).json({ error: 'L\'ID du professeur n\'est pas un entier positif.' });
    }
    if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      return res.status(402).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
    }
    if (endDate && !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return res.status(403).json({ error: 'La date de fin du cours doit être au format YYYY-MM-DD.' });
    }

    const teacherPlaces = await teacherService.getTeacherPlaces(teacherID, startDate, endDate);

    res.status(200).json({ teacherPlaces });

  } catch (error) {
    console.error('getTeacherPlaces | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération du nombre d'élèves.":
        res.status(501).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.modifyCourse = async (req, res) => {
  try {
    const { courseID, image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags, roomPrice } = req.body;

    const userIDFromToken = req.userID;
    const userTypeFromToken = req.userType;

    console.log("modifyCourse | courseID, image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags : " + courseID + ", " + image + ", " + title + ", " + type + ", " + duration + ", " + startDate + ", " + startTime + ", " + location + ", " + maxParticipants + ", " + paymentType + ", " + isEvening + ", " + recurrence + ", " + teachers + ", " + links + ", " + students + ", " + tags);

    // Vérifier si les champs obligatoires sont remplis
    if (!courseID) {
      return res.status(400).json({ error: 'Le champ courseID est obligatoire.' });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(401).json({ error: "L'ID du cours n'est pas un entier positif." });
    }

    const fieldsToUpdate = [];
    const values = [];

    // Ajouter les champs à mettre à jour et leurs valeurs correspondantes
    if (image) {
      fieldsToUpdate.push('image = ?');
      values.push(image);
    }

    if (title) {
      fieldsToUpdate.push('title = ?');
      values.push(title);
    }

    if (type) {
      fieldsToUpdate.push('type = ?');
      values.push(type);
    }

    if (duration) {
      if (duration < 0) {
        return res.status(402).json({ error: "La durée doit être positive." });
      }
      fieldsToUpdate.push('duration = ?');
      values.push(duration);
    }

    if (startDate && startTime) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(startTime)) {
        return res.status(403).json({ error: 'Les dates de début et de fin doident être au format YYYY-MM-DD.' });
      }
      fieldsToUpdate.push('startDate = ?');
      const startDateTime = new Date(`${startDate} ${startTime}`);
      values.push(startDateTime);
    }

    if (location) {
      fieldsToUpdate.push('location = ?');
      values.push(location);
    }

    if (maxParticipants) {
      if (maxParticipants <= 0) {
        return res.status(404).json({ error: "Le nombre maximal d'apprenants doit être positif." });
      }
      fieldsToUpdate.push('maxParticipants = ?');
      values.push(maxParticipants);
    }

    if (paymentType) {
      fieldsToUpdate.push('paymentType = ?');
      values.push(paymentType);
    }

    if (isEvening) {
      if (teachers) {
        return res.status(405).json({ error: "Une soirée ne peut pas avoir de professeur." });
      }
      fieldsToUpdate.push('isEvening = ?');
      values.push(isEvening);
    }

    if (recurrence) {
      if (recurrence < 0) {
        return res.status(406).json({ error: "La récurrence doit être positive ou nulle." });
      }
      fieldsToUpdate.push('recurrence = ?');
      values.push(recurrence);
    }

    if (roomPrice) {
      if (roomPrice < 0) {
        return res.status(408).json({ error: "Le prix de la salle doit être positif ou nul." });
      }
      fieldsToUpdate.push('roomPrice = ?');
      values.push(roomPrice);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(407).json({ error: 'Aucun champ à mettre à jour.' });
    }

    const result = await teacherService.modifyCourse(userIDFromToken, userTypeFromToken, courseID, values, fieldsToUpdate, teachers, students, links, tags, roomPrice);

    res.status(200).json({ success: true, course: result });

  } catch (error) {
    console.error('modifyCourse | error:', error);

    switch (error.message) {
      case "La récupération du nombre de cours du professeur a échoué.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas autorisé à modifier ce cours ou le cours n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des ID avec les emails fournis.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "La modification du cours a échoué.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "La récupération du cours a échoué.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de l'existence de l'étudiant.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "L'étudiant n'existe pas.":
        res.status(508).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};


exports.getStudentsInCourse = async (req, res) => {
  try {
    const { courseID } = req.query;

    const userID = req.userID;

    console.log("getStudentsInCourse |  courseID, userID : " + courseID, userID);

    if (!courseID || !userID) {
      return res.status(400).json({ error: 'Le champs courseID et userID doivent être fournis.' });
    }
    if (!Number.isInteger(parseInt(userID)) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
    }

    const students = await teacherService.getStudentsInCourse(userID, courseID);

    res.status(200).json({ success: true, students: students });

  } catch (error) {
    console.error('getStudentsInCourse | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération des types d'utilisateurs.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Aucun utilisateur trouvé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de la présence du professeur dans le cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas dans le cours ou le cours n'existe pas.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération du cours.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "Cours non trouvé.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'utilisateur.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'a pas été trouvé.":
        res.status(508).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'est pas un professeur ou un administrateur.":
        res.status(509).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.addPlaceStudent = async (req, res) => {
  const { studentID, type, number } = req.body;

  const userID = req.userID;

  console.log(`addPlaceStudent | UserID, studentID, type, number:${userID}, ${studentID}, ${type}, ${number}`);

  if (!userID || !studentID || !type || !number) {
    return res.status(400).json({ error: 'Le champs courseID et userID doivent être fournis.' });
  }
  if (!Number.isInteger(parseInt(userID)) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (!Number.isInteger(parseInt(studentID)) || studentID <= 0) {
    return res.status(402).json({ error: "L'ID de l'élève n'est pas un entier positif." });
  }
  if (!Number.isInteger(parseInt(number)) || number <= 0) {
    return res.status(403).json({ success: false, message: 'number n\'est pas un entier positif.' });
  }

  try {
    await teacherService.addPlaceStudent(userID, studentID, type, number);
    res.status(200).json({ success: true, message: 'Place added successfully' });
  } catch (error) {
    console.error('addPlaceStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération des prix.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le prix n'a pas été trouvé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de l'ajout de ticket(s) à l'utilisateur.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de l'ajout de la carte à l'utilisateur.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification de la date de fin de l'abonnement de l'utilisateur.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de l'enregistrement du paiement.":
        res.status(507).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};


exports.removeLink = async (req, res) => {
  try {
    const { courseID, link } = req.body;

    const userID = req.userID;

    console.log("removeLink | courseID, userID : " + courseID + ", " + userID);

    if (!courseID || !userID || !link) {
      return res.status(400).json({ success: false, error: 'Les champs courseID, userID et link doivent être fournis.' });
    }
    if (!Number.isInteger(parseInt(userID)) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
    }

    await teacherService.removeLink(courseID, userID, link);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('removelink | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération de l'utilisateur.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "L'utilisateur est un élève.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de la présence du professeur dans le cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Le professeur ou le cours n'existe pas.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "userID ou userType invalide.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des liens du cours.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification du cours.":
        res.status(508).json({ success: false, message: error.message });
        break;
      case "Ce cours n'existe pas.":
        res.status(509).json({ success: false, message: error.message });
        break;
      case "Le lien n'est pas contenu dans le cours.":
        res.status(510).json({ success: false, message: error.message });
        break;
      case "Ce cours n'existe pas ou ce lien n'est pas dans le cours":
        res.status(511).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.addTag = async (req, res) => {
  const { courseID, tag } = req.body;

  const userID = req.userID;

  console.log(`addTag | userID, courseID, tag: ${userID}, ${courseID}, ${tag}`);

  if (!courseID || !userID || !tag) {
    return res.status(400).json({ success: false, error: 'Les champs courseID, userID et tag doivent être fournis.' });
  }
  if (!Number.isInteger(parseInt(userID)) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
    return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
  }
  if (tag.includes(',')) {
    return res.status(403).json({ error: "Le tag ne doit pas contenir de virgule." });
  }

  try {
    await teacherService.addTag(userID, courseID, tag);

    res.status(200).json({ success: true, message: 'Tag added successfully' });
  } catch (error) {
    console.error('addTag | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération du type de l'utilisateur.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Les élèves ne peuvent pas ajouter de tags aux cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de la présence du professeur dans le cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas dans le cours.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des tags du cours.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "Le cours a déjà ce tag.":
        res.status(508).json({ success: false, message: error.message });
        break;
      case "Erreur lors de l'ajout du tag.":
        res.status(509).json({ success: false, message: error.message });
        break;
      case "L'utilisateur est invalide.":
        res.status(510).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.removeTag = async (req, res) => {
  try {
    const { courseID, tag } = req.body;

    const userID = req.userID;

    console.log("removeTag | courseID, userID : " + courseID + ", " + userID);

    if (!courseID || !userID || !tag) {
      return res.status(400).json({ success: false, error: 'Les champs courseID, userID et tag doivent être fournis.' });
    }
    if (!Number.isInteger(parseInt(userID)) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(parseInt(courseID)) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
    }
    if (tag.includes(',')) {
      return res.status(403).json({ error: "Le tag ne doit pas contenir de virgule." });
    }

    await teacherService.removeTag(courseID, userID, tag);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('removeTag | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération du type de l'utilisateur.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Les élèves ne peuvent pas ajouter de tags aux cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de la présence du professeur dans le cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas dans le cours.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "userType invalide.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des tags du cours.":
        res.status(508).json({ success: false, message: error.message });
        break;
      case "Le cours n'a pas ce tag.":
        res.status(509).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la suppression du tag.":
        res.status(510).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }



};

exports.markAttendance = async (req, res) => {
  const { studentID, courseID } = req.body;
  const user = {
    userID: req.userID,
    userType: req.userType
  };

  try {
    await teacherService.markAttendance(user, studentID, courseID);

    res.status(200).json({ success: true, message: "Présence marquée avec succès." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};