const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/generateResetToken', userController.generateResetToken);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;
