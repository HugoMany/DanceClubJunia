const userService = require('../services/userService');

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
    const token = await userService.generateResetToken(email);
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
    await userService.resetPassword(token, newPassword);
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

exports.addLink = async (req, res) => {
  const { userID, courseID, link } = req.body;

  console.log(`addLink | userID, courseID, link: ${userID}, ${courseID}, ${link}`);

  if (!courseID || !userID || !link) {
    return res.status(400).json({ error: 'Le champs courseID, userID et link doivent être fourni.' });
  }
  if (isNaN(userID) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (isNaN(courseID) || courseID <= 0) {
    return res.status(402).json({ error: "L'ID du cours n'est pas un entier positif." });
  }

  try {
    const result = await userService.addLink(userID, courseID, link);
    if (result.success === false) {
      return res.status(400).json(result);
    }
    res.status(200).json({ success: true, message: 'Link added successfully' });
  } catch (error) {
    console.error('addLink | error:', error);

    switch (error.message) {
      case "Erreur lors de la vérification du type de l'utilisateur.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la vérification de la présence de de l'élève dans le cours.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Le cours n'existe pas.":
        res.status(504).json({ success: false, message: error.message });
        break;
      case "Erreur lors de l'ajout du lien.":
        res.status(505).json({ success: false, message: error.message });
        break;
      case "L'élève n'est pas dans le cours.":
        res.status(506).json({ success: false, message: error.message });
        break;
      case "Le professeur n'est pas dans le cours.":
        res.status(507).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.searchCoursesStudent = async (req, res) => {
  const { userID, startDate, tags } = req.query;

  console.log(`searchCoursesStudent | userID: ${userID}, startDate: ${startDate}, tags: ${tags}`);

  if (!userID) {
    return res.status(400).json({ error: 'Le champs tags, userID et startDate doivent être fourni.' });
  }
  if (isNaN(userID) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return res.status(402).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
  }

  try {
    const courses = await userService.searchCoursesStudent(userID, startDate, tags);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('searchCoursesStudent | error:', error);

    switch (error.message) {
      case "Erreur lors de la recherche de cours.":
        res.status(501).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.searchCoursesTeacher = async (req, res) => {
  const { userID, startDate, tags } = req.query;

  console.log(`searchCoursesTeacher | userID: ${userID}, startDate: ${startDate}, tags: ${tags}`);

  if (!userID) {
    return res.status(400).json({ error: 'Le champs tags, userID et startDate doivent être fourni.' });
  }
  if (isNaN(userID) || userID <= 0) {
    return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
  }
  if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return res.status(402).json({ error: 'La date de début du cours doit être au format YYYY-MM-DD.' });
  }
  try {
    const courses = await userService.searchCoursesTeacher(userID, startDate, tags);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('searchCoursesTeacher | error:', error);

    switch (error.message) {
      case "Erreur lors de la recherche de cours.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'a pas été trouvé":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.searchCourse = async (req, res) => {
  const { courseID } = req.query;

  console.log(`searchCourse | courseID: ${courseID}`);

  if (!courseID) {
    return res.status(400).json({ error: 'Le champ courseID doit être fourni.' });
  }
  if (isNaN(courseID) || courseID <= 0) {
    return res.status(401).json({ error: "L'ID du cours n'est pas un entier positif." });
  }

  try {
    const courses = await userService.searchCourse(courseID);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('courseID | error:', error);

    switch (error.message) {
      case "Erreur lors de la recherche de cours.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Le cours n'a pas été trouvé":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.getContactsStudents = async (req, res) => {
  try {
    const contacts = await userService.getContactsStudents();
    res.status(200).json({ success: true, contacts: contacts });
  } catch (error) {
    console.error('getContactsStudents | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération des contacts.":
        res.status(501).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userID } = req.query;

    console.log("getProfile | userID : " + userID);


    if (!userID) {
      return res.status(400).json({ error: "Champ userID manquant." });
    }
    if (isNaN(userID) || userID <= 0) {
      return res.status(401).json({ error: "L'ID de l'utilisateur n'est pas un entier positif." });
    }

    const result = await userService.getProfile(userID);

    return res.status(200).json({ success: true, student: result[0] });

  } catch (error) {
    console.error('getProfile | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération du profil.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "L'utilisateur n'existe pas.":
        res.status(502).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};

exports.modifyProfile = async (req, res) => {
  try {
    const { userID, firstname, surname, email, photo, description } = req.body;

    console.log("modifyProfile | userID, firstname, surname, email, photo, description : " + userID + ", " + firstname + ", " + surname + ", " + email + ", " + photo + ", " + description);

    if (!userID) {
      return res.status(400).json({ error: 'userID manquant' });
    }
    if (isNaN(userID) || userID <= 0) {
      return res.status(401).json({ error: 'Le champ userID doit être un entier positif.' });
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

    if (photo) {
      fieldsToUpdate.push('photo = ?');
      values.push(photo);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(403).json({ error: 'Aucun champ à mettre à jour.' });
    }

    const result = await userService.modifyProfile(userID, values, fieldsToUpdate, description);
    
    res.status(200).json({ success: true, user: result[0] });

  } catch (error) {
    console.error('modifyProfile | error:', error);

    switch (error.message) {
      case "Erreur lors de la récupération du type de l'utilisateur.":
        res.status(501).json({ success: false, message: error.message });
        break;
      case "Aucun utilisateur trouvé.":
        res.status(502).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la modification de l'utilisateur.":
        res.status(503).json({ success: false, message: error.message });
        break;
      case "Erreur lors de la récupération de l'utilisateur.":
        res.status(504).json({ success: false, message: error.message });
        break;
      default:
        res.status(500).json({ success: false, message: 'Erreur SQL' });
    }
  }
};