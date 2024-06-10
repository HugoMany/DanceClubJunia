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
        const { firstname, surname, email, password, connectionMethod, credit, photo } = req.body;
      
        console.log("newStudent | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit + ", " + photo); 

        // Vérification que tous les champs sont remplis
        if (!firstname || !surname || !email || !password || !connectionMethod || !credit || !photo === undefined) {
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
        
        const result = await teacherService.newStudent(firstname, surname, email, password, connectionMethod, credit, photo);

        res.json({success: true, student : result[0] });

    } catch (error) {
        console.error('newStudent | error:', error);
        res.status(500).json(false);
    }
};

exports.modifyStudent = async (req, res) => {
    try {
        const { studentID, firstname, surname, email, password, connectionMethod, credit, photo } = req.body;

        console.log("modifyStudent | studentID? firstname, surname, email, password, connectionMethod, credit : " + studentID + ", " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit + ", " + photo);       

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
      
        if (photo) {
          fieldsToUpdate.push('photo = ?');
          values.push(photo);
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
      const { userID, courseID, studentID } = req.body;

      console.log("removeStudent | userID, courseID, studentID : " + userID + ", " + courseID + ", " + studentID);
    
      // Vérifier si les champs sont remplis
      if (!userID || !courseID || !studentID) {
          return res.status(400).json({ error: 'Les champs userID, courseID et studentID doivent être fournis.' });
      }
    
      await teacherService.removeStudent(userID, courseID, studentID);

      res.json({ success: true });

  } catch (error) {
      console.error('removeStudent | error:', error);
      res.status(500).json({ success: false, error: error.message });
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
      res.status(500).json({ sucess: false, error: error.message });
  }
};

 
exports.getStudentsInCourse = async (req, res) => {
  try {
      const { courseID, userID } = req.query;

      console.log("getStudentsInCourse |  courseID, userID : " + courseID, userID);

      // Vérifier si les champs sont remplis
      if (!courseID || !userID) {
          return res.status(400).json({ error: 'getTeacherPlaces | Le champs courseID et userID doivent être fournis.' });
      }

      const students = await teacherService.getStudentsInCourse(courseID,userID);

      res.json({ success : true, students : students });

  } catch (error) {
      console.error('getStudentsInCourse | error:', error);
      res.status(500).json(false);
  }
};

exports.getStudentsInCourse = async (req, res) => {
  try {
      const { userID, courseID } = req.body;

      console.log(`getStudentsInCourse | userID, courseID : ${userID}, ${courseID}`);

      if (!userID || !courseID) {
          return res.status(400).json({ error: 'Les champs userID et courseID sont obligatoires.' });
      }

      const students = await teacherService.getStudentsInCourse(userID, courseID);
      res.json({ students });
  } catch (error) {
      console.error('getStudentsInCourse | error:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des étudiants du cours.' });
  }
};

exports.addPlaceStudent = async (req, res) => {
  const { userID, studentID, type, number } = req.body;

    console.log(`addPlaceStudent | UserID, studentID, type, number:${userID}, ${studentID}, ${type}, ${number}`);

    if (!Number.isInteger(number) || number <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid number' });
    }

    if (studentID <= 0) {
        return res.status(401).json({ success: false, message: 'Invalid studentID' });
    }

    if (userID <= 0) {
      return res.status(402).json({ success: false, message: 'Invalid userID' });
  }

    try {
        await teacherService.addPlaceStudent(userID, studentID, type, number);
        res.json({ success: true, message: 'Place added successfully' });
    } catch (error) {
        console.error('addPlaceStudent | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.removeLink = async (req, res) => {
  try {
      const { courseID, userID, link } = req.body;

      console.log("removeLink | courseID, userID : " + courseID + ", " + userID);
    
      // Vérifier si les champs sont remplis
      if (!courseID || !userID || !link) {
        return res.status(400).json({ success: false, error: 'removelink | Les champs courseID, userID et link doivent être fournis.' });
      }
    
      await teacherService.removeLink(courseID, userID,link);

      res.json({ success: true });

  } catch (error) {
      console.error('removelink | error:', error);
      res.status(500).json({ success: false, message: error.message });
  }
};

exports.addTag = async (req, res) => {
const { userID, courseID, tag } = req.body;

console.log(`addTag | userID, courseID, tag: ${userID}, ${courseID}, ${tag}`);

if (!tag) {
    return res.status(400).json({ success: false, message: 'Tag is required' });
}

if (userID <= 0 || courseID <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid userID or courseID' });
}

try {
    const result = await teacherService.addTag(userID, courseID, tag);
    if (result.success === false) {
        return res.status(400).json(result);
    }
    res.json({ success: true, message: 'Tag added successfully' });
} catch (error) {
    console.error('addTag | error:', error);
    res.status(500).json({ success: false, message: 'Error executing query' });
}
};

exports.removeTag = async (req, res) => {
try {
    const { courseID, userID, tag } = req.body;

    console.log("removeTag | courseID, userID : " + courseID + ", " + userID);
  
    // Vérifier si les champs sont remplis
    if (!courseID || !userID || !tag) {
      return res.status(400).json({ success: false, error: 'removeTag | Les champs courseID, userID et tag doivent être fournis.' });
    }
  
    await teacherService.removeTag(courseID, userID,tag);

    res.json({ success: true });

} catch (error) {
    console.error('removeTag | error:', error);
    res.status(500).json({ success: false, message: error.message });
}
};