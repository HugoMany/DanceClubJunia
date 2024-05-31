const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/getStudent', teacherController.getStudent);
router.post('/newStudent', teacherController.newStudent);
router.post('/modifyStudent', teacherController.modifyStudent);
router.post('/removeStudent', teacherController.removeStudent);

module.exports = router;
