const teacherService = require('../services/teacherService');

exports.getStudent = async (req, res) => {
    try {
        const { studentID } = req.body;
  
        // V�rifier si studentID est n�gatif ou nul
        if (!studentID) {
          res.json(false);
          return console.error('getStudent | error: empty field');
        }    

        const result = await teacherService.getStudent(studentID);

        res.json(result[0]);

    } catch (error) {
        console.error('getStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.newStudent = async (req, res) => {
    try {
        const { firstname, surname, email, password, connectionMethod, credit } = req.body;
      
        // Vérification que tous les champs sont remplis
        if (!firstname || !surname || !email || !password || !connectionMethod || credit === undefined) {
          return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
        }
      
        // Vérification de la validité du nombre de crédits
        if(credit < 0){
          return res.status(400).json({ error: 'Credit invalide.' });
        }
      
        // Vérification de la validité de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Email invalide.' });
        }
        
        console.log("newStudent | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit); 

        const result = await teacherService.newStudent(firstname, surname, email, password, connectionMethod, credit);

        res.json(result[0]);

    } catch (error) {
        console.error('newStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.modifyStudent = async (req, res) => {
    try {
        const { studentID, firstname, surname, email, password, connectionMethod, credit } = req.body;
      
        if (!studentID) {
          return res.status(400).json({ error: 'ID de l\'étudiant manquant.' });
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
          fieldsToUpdate.push('password = ?');
          values.push(password);
        }
      
        if (connectionMethod) {
          fieldsToUpdate.push('connectionMethod = ?');
          values.push(connectionMethod);
        }
      
        if (credit !== undefined) {
          if (credit < 0) {
            return res.status(400).json({ error: 'Credit invalide.' });
          }
          fieldsToUpdate.push('credit = ?');
          values.push(credit);
        }
      
        if (fieldsToUpdate.length === 0) {
          return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
        }
      
        values.push(studentID);

        const result = await teacherService.modifyStudent(studentID, values, fieldsToUpdate);

        res.json(result[0]);

    } catch (error) {
        console.error('modifyStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.removeStudent = async (req, res) => {
    try {
        const { courseID, studentID } = req.body;
      
        // Vérifier si les champs sont remplis
        if (!courseID || !studentID) {
          return res.status(400).json({ error: 'removeStudent | Les champs courseID et studentID doivent être fournis.' });
        }
      
        console.log("removeStudent | courseID, studentID : " + courseID + ", " + studentID);

        await teacherService.removeStudent(courseID, studentID);

        res.json(true);

    } catch (error) {
        console.error('removeStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.cancelCourse = async (req, res) => {
    try {
        const { courseID } = req.body;
      
        // Vérifier si les champs sont remplis
        if (!courseID) {
          return res.status(400).json({ error: 'cancelCourse | Le champ courseID doit être fourni.' });
        }
      
        console.log("cancelCourse | courseID : " + courseID);

        await teacherService.cancelCourse(courseID);

        res.json(true);

    } catch (error) {
        console.error('cancelCourse | error:', error);
        res.status(500).json(false);
    }
};