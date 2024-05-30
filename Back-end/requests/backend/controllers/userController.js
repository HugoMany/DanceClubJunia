const userService = require('../services/userService');

exports.generateResetToken = async (req, res) => {
  const { userID } = req.body;

  console.log(`generateResetToken | userID: ${userID}`);

  if (userID <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid userID' });
  }

  try {
    const token = await userService.generateResetToken(userID);
    res.json({ success: true, message: 'Token generated and stored', token });
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
