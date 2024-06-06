const adminTeacherService = require('../services/adminTeacherService');

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
          await adminTeacherService.addPlaceStudent(userID, studentID, type, number);
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
      
        await adminTeacherService.removeLink(courseID, userID,link);

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
      const result = await adminTeacherService.addTag(userID, courseID, tag);
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
    
      await adminTeacherService.removeTag(courseID, userID,tag);

      res.json({ success: true });

  } catch (error) {
      console.error('removeTag | error:', error);
      res.status(500).json({ success: false, message: error.message });
  }
};