const teacherService = require('../services/teacherService');

exports.getStudent = async (req, res) => {
    try {
        const { studentID } = req.query;
  
        console.log("getStudent | studentID : " + studentID); 

        // V�rifier si studentID est n�gatif ou nul
        if (!studentID) {
          res.json(false);
          return console.error('getStudent | error: empty field');
        }    

        const result = await teacherService.getStudent(studentID);

        return res.status(200).json({success: true, student : result[0] });

    } catch (error) {
        console.error('getStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.newStudent = async (req, res) => {
    try {
        const { firstname, surname, email, password, connectionMethod, credit } = req.body;
      
        console.log("newStudent | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit); 

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
        
        const result = await teacherService.newStudent(firstname, surname, email, password, connectionMethod, credit);

        res.json({success: true, student : result[0] });

    } catch (error) {
        console.error('newStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.modifyStudent = async (req, res) => {
    try {
        const { studentID, firstname, surname, email, password, connectionMethod, credit } = req.body;

        console.log("modifyStudent | studentID? firstname, surname, email, password, connectionMethod, credit : " + studentID + ", " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit);       

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

        res.json({success: true, student : result[0] });

    } catch (error) {
        console.error('modifyStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.removeStudent = async (req, res) => {
    try {
        const { courseID, studentID } = req.body;

        console.log("removeStudent | courseID, studentID : " + courseID + ", " + studentID);
      
        // Vérifier si les champs sont remplis
        if (!courseID || !studentID) {
          return res.status(400).json({ error: 'removeStudent | Les champs courseID et studentID doivent être fournis.' });
        }
      
        await teacherService.removeStudent(courseID, studentID);

        res.json({ success: true });

    } catch (error) {
        console.error('removeStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.affectStudent = async (req, res) => {
    try {
        const { teacherID, studentID, courseID } = req.body;
        
        console.log("affectStudent reqbody : ",req.body);
        console.log("affectStudent | teacherID, studentID, courseID : " + teacherID + ", " + studentID + ", " + courseID);
      
        // Vérifier si les champs sont remplis
        if (!teacherID || !studentID || !courseID) {
          return res.status(400).json({ error: 'affectStudent | Les champs teacherID, studentID et courseID doivent être fournis.' });
        }
      
        await teacherService.affectStudent(teacherID, studentID, courseID);

        res.json({ success: true });

    } catch (error) {
        console.error('affectStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.searchStudent = async (req, res) => {
  try {
      const { firstname, surname, email } = req.query;

      console.log("searchStudent | firstname, surname, email : " + firstname + ", " + surname + ", " + email);

      if (!firstname && !surname && !email) {
          return res.status(400).json({ error: 'Au moins un critère de recherche doit être fourni.' });
      }

      const result = await teacherService.searchStudent(firstname, surname, email);

      if (result) {
          res.json({ success: true, students: result });
      } else {
          res.json({ success: false, message: 'Aucun étudiant trouvé.' });
      }

  } catch (error) {
      console.error('searchStudent | error:', error);
      res.status(500).json(false);
  }
};

exports.cancelCourse = async (req, res) => {
    try {
        const { courseID, teacherID } = req.body;

        console.log("cancelCourse | courseID : " + courseID);
      
        // Vérifier si les champs sont remplis
        if (!courseID) {
          return res.status(400).json({ success: false, message: 'Empty field' });
        }

        if (teacherID <= 0) {
          return res.status(401).json({ success: false, message: 'Invalid teacherID' });
        }

        await teacherService.cancelCourse(courseID,teacherID);

        res.json({ success: true });

    } catch (error) {
        console.error('cancelCourse | error:', error);
        res.status(500).json(false);
    }
};

exports.getTeacherPlaces = async (req, res) => {
  try {
      const { teacherID, startDate, endDate } = req.query;

      console.log("getTeacherPlaces | teacherID, startDate, endDate : " + teacherID + ", " + startDate + ", " + endDate);

      // Vérifier si les champs sont remplis
      if (!teacherID || !startDate || !endDate) {
          return res.status(400).json({ error: 'getTeacherPlaces | Les champs teacherID, startDate et endDate doivent être fournis.' });
      }

      const teacherPlaces = await teacherService.getTeacherPlaces(teacherID, startDate, endDate);

      res.json({ teacherPlaces });

  } catch (error) {
      console.error('getTeacherPlaces | error:', error);
      res.status(500).json(false);
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

      const fieldsToUpdate = [];
      const values = [];

      // Ajouter les champs à mettre à jour et leurs valeurs correspondantes
      if (image !== undefined) {
          fieldsToUpdate.push('image = ?');
          values.push(image);
      }

      if (title !== undefined) {
          fieldsToUpdate.push('title = ?');
          values.push(title);
      }

      if (type !== undefined) {
          fieldsToUpdate.push('type = ?');
          values.push(type);
      }

      if (duration !== undefined) {
          fieldsToUpdate.push('duration = ?');
          values.push(duration);
      }

      if (startDate !== undefined && startTime !== undefined) {
          fieldsToUpdate.push('startDate = ?');
          const startDateTime = new Date(`${startDate} ${startTime}`);
          values.push(startDateTime);
      }

      if (location !== undefined) {
          fieldsToUpdate.push('location = ?');
          values.push(location);
      }

      if (maxParticipants !== undefined) {
          fieldsToUpdate.push('maxParticipants = ?');
          values.push(maxParticipants);
      }

      if (paymentType !== undefined) {
          fieldsToUpdate.push('paymentType = ?');
          values.push(paymentType);
      }

      if (isEvening !== undefined) {
          fieldsToUpdate.push('isEvening = ?');
          values.push(isEvening);
      }

      if (recurrence !== undefined) {
          fieldsToUpdate.push('recurrence = ?');
          values.push(recurrence);
      }

      if (fieldsToUpdate.length === 0) {
          return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
      }

      const result = await teacherService.modifyCourse(teacherID, courseID, values, fieldsToUpdate, teachers, students, links, tags);

      res.json({ success: true, course: result });

  } catch (error) {
      console.error('modifyCourse | error:', error);
      res.status(500).json(false);
  }
};