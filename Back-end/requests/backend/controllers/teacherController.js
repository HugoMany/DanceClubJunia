const teacherService = require('../services/teacherService');

exports.getStudent = async (req, res) => {
  try {
    const { studentID } = req.query;

    console.log("getStudent | studentID : " + studentID);

    if (!courseID) {
      return res.status(400).json({ error: 'ID du cours manquante' });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(401).json({ error: 'Le champ courseID doit être un entier positif.' });
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
    const { firstname, surname, email, password, connectionMethod, credit, photo } = req.body;

    console.log("newStudent | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit + ", " + photo);

    if (!firstname || !surname || !email || !password || !connectionMethod || !credit || !photo === undefined) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
    }
    if (password.length <= 8) {
      return res.status(401).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }
    if (!Number.isInteger(credit) || credit <= 0) {
      return res.status(402).json({ error: 'Le champ credit doit être un entier positif.' });
    }

    // Vérification de la validité de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide.' });
    }

    const result = await teacherService.newStudent(firstname, surname, email, password, connectionMethod, credit, photo);

    return res.status(200).json({ success: true, student: result[0] });

  } catch (error) {
    console.error('newStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la création de l'élève.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'élève.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas":
        res.status(503).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.modifyStudent = async (req, res) => {
  try {
    const { studentID, firstname, surname, email, password, connectionMethod, credit, photo } = req.body;

    console.log("modifyStudent | studentID, firstname, surname, email, password, connectionMethod, credit : " + studentID + ", " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit + ", " + photo);

    if (!studentID) {
      return res.status(400).json({ error: 'studentID manquant' });
    }
    if (!Number.isInteger(studentID) || studentID <= 0) {
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
        return res.status(400).json({ error: 'Email invalide.' });
      }
      fieldsToUpdate.push('email = ?');
      values.push(email);
    }

    if (password) {
      if (password.length <= 8) {
        return res.status(401).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
      }
      fieldsToUpdate.push('password = ?');
      values.push(password);
    }

    if (connectionMethod) {
      fieldsToUpdate.push('connectionMethod = ?');
      values.push(connectionMethod);
    }

    if (credit) {
      if (credit < 0) {
        return res.status(402).json({ error: 'Credit invalide.' });
      }
      fieldsToUpdate.push('credit = ?');
      values.push(credit);
    }

    if (photo) {
      fieldsToUpdate.push('photo = ?');
      values.push(photo);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(403).json({ error: 'Aucun champ à mettre à jour.' });
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
    const { userID, courseID, studentID } = req.body;

    console.log("removeStudent | userID, courseID, studentID : " + userID + ", " + courseID + ", " + studentID);

    // Vérifier si les champs sont remplis
    if (!userID || !courseID || !studentID) {
      return res.status(400).json({ error: 'Les champs userID, courseID et studentID doivent être fournis.' });
    }

    if (!Number.isInteger(studentID) || studentID <= 0) {
      return res.status(401).json({ error: 'L\'ID de l\'étudiant n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(402).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(userID) || userID <= 0) {
      return res.status(403).json({ error: 'L\'ID de l\'utilisateur n\'est pas un entier positif.' });
    }

    await teacherService.removeStudent(userID, courseID, studentID);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('removeStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération de l'élève.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'élève n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'élève.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification du cours.":
        res.status(504).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};


exports.affectStudent = async (req, res) => {
  try {
    const { teacherID, studentID, courseID } = req.body;

    console.log("affectStudent reqbody : ", req.body);
    console.log("affectStudent | teacherID, studentID, courseID : " + teacherID + ", " + studentID + ", " + courseID);

    // Vérifier si les champs sont remplis
    if (!teacherID || !studentID || !courseID) {
      return res.status(400).json({ error: 'affectStudent | Les champs teacherID, studentID et courseID doivent être fournis.' });
    }

    if (!Number.isInteger(studentID) || studentID <= 0) {
      return res.status(401).json({ error: 'L\'ID de l\'étudiant n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(402).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(teacherID) || userID <= 0) {
      return res.status(403).json({ error: 'L\'ID du professeur n\'est pas un entier positif.' });
    }

    await teacherService.affectStudent(teacherID, studentID, courseID);

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
      case "Le professeur n\'est pas autorisé à modifier ce cours.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "L'élève est déjà dans le cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification du cours.":
        res.status(504).json({ success: false, message: error.message });
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ error: 'Email invalide.' });
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
    const { courseID, teacherID } = req.body;

    console.log("cancelCourse | courseID, teacherID : " + courseID, teacherID);

    if (!courseID) {
      return res.status(400).json({ error: 'courseID manquant.' });
    }
    if (!teacherID) {
      return res.status(401).json({ error: 'teacherID manquant.' });
    }
    if (!Number.isInteger(teacherID) || teacherID <= 0) {
      return res.status(402).json({ error: 'L\'ID du professeur n\'est pas un entier positif.' });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(403).json({ error: 'L\'ID du cours n\'est pas un entier positif.' });
    }

    await teacherService.cancelCourse(courseID, teacherID);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('cancelCourse | error:', error);

    switch (error.message) {
      case "Erreur lors de la suppression.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
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

    console.log("getTeacherPlaces | teacherID, startDate, endDate : " + teacherID + ", " + startDate + ", " + endDate);

    if (!teacherID || !startDate || !endDate) {
      return res.status(400).json({ error: 'getTeacherPlaces | Les champs teacherID, startDate et endDate doivent être fournis.' });
    }
    if (!Number.isInteger(teacherID) || teacherID <= 0) {
      return res.status(401).json({ error: 'L\'ID du professeur n\'est pas un entier positif.' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      return res.status(402).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
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
    const { teacherID, courseID, image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags } = req.body;

    console.log("modifyCourse | teacherID, courseID, image, title, type, duration, startDate, startTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags : " + teacherID + ", " + courseID + ", " + image + ", " + title + ", " + type + ", " + duration + ", " + startDate + ", " + startTime + ", " + location + ", " + maxParticipants + ", " + paymentType + ", " + isEvening + ", " + recurrence + ", " + teachers + ", " + links + ", " + students + ", " + tags);

    // Vérifier si les champs obligatoires sont remplis
    if (!teacherID || !courseID) {
      return res.status(400).json({ error: 'Les champs teacherID et courseID sont obligatoires.' });
    }

    if (!Number.isInteger(teacherID) || teacherID <= 0) {
      return res.status(401).json({ error: "L'ID du professeur n'est pas un entier positif." });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
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
        return res.status(403).json({ error: "La durée doit être positive." });
      }
      fieldsToUpdate.push('duration = ?');
      values.push(duration);
    }

    if (startDate && startTime) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(startTime)) {
        return res.status(401).json({ error: 'Les dates de début et de fin doident être au format YYYY-MM-DD.' });
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
        return res.status(403).json({ error: "Le nombre maximal d'apprenants doit être positif." });
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
        return res.status(403).json({ error: "Une soirée ne peut pas avoir de professeur." });
      }
      fieldsToUpdate.push('isEvening = ?');
      values.push(isEvening);
    }

    if (recurrence) {
      if (recurrence < 0) {
        return res.status(403).json({ error: "La récurrence doit être positive ou nulle." });
      }
      fieldsToUpdate.push('recurrence = ?');
      values.push(recurrence);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
    }

    const result = await teacherService.modifyCourse(teacherID, courseID, values, fieldsToUpdate, teachers, students, links, tags);

    res.status(200).json({ success: true, course: result });

  } catch (error) {
    console.error('modifyCourse | error:', error);

    switch (error.message) {
      case "La récupération du nombre de cours du professeur a échoué.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas autorisé à modifier ce cours.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des ID avec les emails fournis":
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
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};


exports.getStudentsInCourse = async (req, res) => {
  try {
    const { courseID, userID } = req.query;

    console.log("getStudentsInCourse |  courseID, userID : " + courseID, userID);

    if (!courseID || !userID) {
      return res.status(400).json({ error: 'Le champs courseID et userID doivent être fournis.' });
    }
    if (!Number.isInteger(userID) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
    }

    const students = await teacherService.getStudentsInCourse(courseID, userID);

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
      case "Cours non trouvé":
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
  const { userID, studentID, type, number } = req.body;

  console.log(`addPlaceStudent | UserID, studentID, type, number:${userID}, ${studentID}, ${type}, ${number}`);

  if (!courseID || !studentID || !type || !number) {
    return res.status(400).json({ error: 'Le champs courseID et userID doivent être fournis.' });
  }
  if (!Number.isInteger(userID) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (!Number.isInteger(courseID) || courseID <= 0) {
    return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
  }
  if (!Number.isInteger(number) || number <= 0) {
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
    const { courseID, userID, link } = req.body;

    console.log("removeLink | courseID, userID : " + courseID + ", " + userID);

    if (!courseID || !userID || !link) {
      return res.status(400).json({ success: false, error: 'Les champs courseID, userID et link doivent être fournis.' });
    }
    if (!Number.isInteger(userID) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
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
      case "Erreur lors de la récupération des liens du cours..":
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
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.addTag = async (req, res) => {
  const { userID, courseID, tag } = req.body;

  console.log(`addTag | userID, courseID, tag: ${userID}, ${courseID}, ${tag}`);

  if (!courseID || !userID || !tag) {
    return res.status(400).json({ success: false, error: ' Les champs courseID, userID et tag doivent être fournis.' });
  }
  if (!Number.isInteger(userID) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (!Number.isInteger(courseID) || courseID <= 0) {
    return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
  }

  try {
    const result = await teacherService.addTag(userID, courseID, tag);

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
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.removeTag = async (req, res) => {
  try {
    const { courseID, userID, tag } = req.body;

    console.log("removeTag | courseID, userID : " + courseID + ", " + userID);

    if (!courseID || !userID || !tag) {
      return res.status(400).json({ success: false, error: ' Les champs courseID, userID et tag doivent être fournis.' });
    }
    if (!Number.isInteger(userID) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }
    if (!Number.isInteger(courseID) || courseID <= 0) {
      return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
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
      case "UserType invalide.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération des tags du cours.":
        res.status(507).json({ success: false, message: error.message });
        break;
      case "Le cours n'a pas ce tag.":
        res.status(508).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la suppression du tag.":
        res.status(509).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};