const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/addCredit', studentController.addCredit);
router.post('/getSubscriptionEndDate', studentController.getSubscriptionEndDate);
router.post('/getCourses', studentController.getCourses);
router.post('/buyPlace', studentController.buyPlace);
router.post('/getPaymentHistory', studentController.getPaymentHistory);
router.post('/addLink', studentController.addLink);
router.post('/searchParticipatedCourses', studentController.searchParticipatedCourses);

module.exports = router;
