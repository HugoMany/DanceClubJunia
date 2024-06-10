const userService = require('../services/userService');

exports.generateResetToken = async (req, res) => {
  const { email } = req.body;

  console.log(`generateResetToken | email: ${email}`);

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email not set' });
  }

  try {
    const token = await userService.generateResetToken(email);
    res.json({ success: true, message: 'Token generated and stored'});
  } catch (error) {
    console.error('generateResetToken | error:', error);
    res.status(500).json({ success: false, message: 'Error generating token' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log(`resetPassword | token: ${token}, newPassword: ${newPassword}`);

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: 'Token and newPassword are required' });
  }

  try {
    await userService.resetPassword(token, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('resetPassword | error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addLink = async (req, res) => {
  const { userID, courseID, link } = req.body;

  console.log(`addLink | userID, courseID, link: ${userID}, ${courseID}, ${link}`);

  if (!link) {
      return res.status(400).json({ success: false, message: 'Link is required' });
  }

  if (userID <= 0 || courseID <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid userID or courseID' });
  }

  try {
      const result = await userService.addLink(userID, courseID, link);
      if (result.success === false) {
          return res.status(400).json(result);
      }
      res.json({ success: true, message: 'Link added successfully' });
  } catch (error) {
      console.error('addLink | error:', error);
      res.status(500).json({ success: false, message: 'Error executing query' });
  }
};

exports.searchCoursesStudent = async (req, res) => {
  const { userID, startDate, tags } = req.query;

  console.log(`searchCoursesStudent | userID: ${userID}, startDate: ${startDate}, tags: ${tags}`);

  if (userID <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid userID' });
  }

  try {
    const courses = await userService.searchCoursesStudent(userID, startDate, tags);
    res.json({ success: true, courses });
  } catch (error) {
    console.error('searchCoursesStudent | error:', error);
    res.status(500).json({ success: false, message: 'Error executing query' });
  }
};

exports.searchCoursesTeacher = async (req, res) => {
  const { userID, startDate, tags } = req.query;

  console.log(`searchCoursesTeacher | userID: ${userID}, startDate: ${startDate}, tags: ${tags}`);

  if (userID <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid userID' });
  }

  try {
    const courses = await userService.searchCoursesTeacher(userID, startDate, tags);
    res.json({ success: true, courses });
  } catch (error) {
    console.error('searchCoursesTeacher | error:', error);
    res.status(500).json({ success: false, message: 'Error executing query' });
  }
};

exports.searchCourse = async (req, res) => {
  const { courseID } = req.query;

  console.log(`searchCourse | courseID: ${courseID}`);

  if (courseID <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid courseID' });
  }

  try {
    const courses = await userService.searchCourse(courseID);
    res.json({ success: true, courses });
  } catch (error) {
    console.error('courseID | error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContactsStudents = async (req, res) => {
    try {
        const contacts = await userService.getContactsStudents();
        res.json({ success: true, contacts: contacts });
    } catch (error) {
        console.error('getContactsStudents | error:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des contacts.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { userID } = req.query;
  
        console.log("getProfile | userID : " + userID); 

        // V�rifier si userID est n�gatif ou nul
        if (!userID) {
          res.json(false);
          return console.error('getProfile | error: empty field');
        }    

        const result = await userService.getProfile(userID);

        return res.status(200).json({success: true, student : result[0] });

    } catch (error) {
        console.error('getProfile | error:', error);
        res.status(500).json(false);
    }
};