const studentService = require('../services/studentService');

exports.addCredit = async (req, res) => {
    try {
        let { studentID, credit } = req.body;
        credit = parseInt(credit);

        console.log("addCredit | studentID, credit : " + studentID + ", " + credit);

        if (!Number.isInteger(credit) || credit <= 0 || studentID <= 0) {
            console.error('addCredit | error');
            return res.status(400).json(false);
        }

        await studentService.addCredit(studentID, credit);

        res.json(true);

    } catch (error) {
        console.error('addCredit | error:', error);
        res.status(500).json(false);
    }
};

exports.getSubscriptionEndDate = async (req, res) => {
    try {
        const { studentID } = req.body;

        console.log("getSubscriptionEndDate | studentID : " + studentID);

        if (studentID <= 0) {
            res.json(false);
            return console.error('getSubscriptionEndDate | error: invalid studentID');
        }

        const subscriptionEndDate = await studentService.getSubscriptionEndDate(studentID);

        res.json({ subscriptionEndDate });
    } catch (error) {
        console.error('getSubscriptionEndDate | error:', error);
        res.status(500).send('Error executing query');
    }
};

exports.getCourses = async (req, res) => {
    try {
        const { studentID } = req.body;

        console.log("getCourses | studentID : " + studentID);

        if (studentID <= 0) {
            res.json(false);
            return console.error('getCourses | error: invalid studentID');
        }

        const courses = await studentService.getCourses(studentID);
        res.json({ success: true, courses });
    } catch (error) {
        console.error('getSubscriptionEndDate | error:', error);
        res.status(500).send('Error executing query');
    }
}

exports.addLink = async (req, res) => {
    const { studentID, courseID, link } = req.body;

    console.log(`addLink | studentID, courseID, link: ${studentID}, ${courseID}, ${link}`);

    if (!link) {
        return res.status(400).json({ success: false, message: 'Link is required' });
    }

    if (studentID <= 0 || courseID <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid studentID or courseID' });
    }

    try {
        const result = await studentService.addLink(studentID, courseID, link);
        if (result.success === false) {
            return res.status(400).json(result);
        }
        res.json({ success: true, message: 'Link added successfully' });
    } catch (error) {
        console.error('addLink | error:', error);
        res.status(500).json({ success: false, message: 'Error executing query' });
    }
};

exports.buyPlace = async (req, res) => {
    const { studentID, type, number } = req.body;

    console.log(`buyPlace | studentID, type, number: ${studentID}, ${type}, ${number}`);

    if (!Number.isInteger(number) || number <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid number' });
    }

    if (studentID <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid studentID' });
    }

    try {
        await studentService.buyPlace(studentID, type, number);
        res.json({ success: true, message: 'Place purchased successfully' });
    } catch (error) {
        console.error('buyPlace | error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPaymentHistory = async (req, res) => {
    const { studentID } = req.body;

    console.log(`getPaymentHistory | studentID: ${studentID}`);

    if (studentID <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid studentID' });
    }

    try {
        const payments = await studentService.getPaymentHistory(studentID);
        if (payments.length > 0) {
            res.json({ success: true, payments });
        } else {
            res.status(404).json({ success: false, message: 'No payment history found for the given student ID' });
        }
    } catch (error) {
        console.error('getPaymentHistory | error:', error);
        res.status(500).json({ success: false, message: 'Error executing query' });
    }
};

exports.searchParticipatedCourses = async (req, res) => {
    const { studentID, startDate, tags } = req.body;
  
    console.log(`searchParticipatedCourses | studentID: ${studentID}, startDate: ${startDate}, tags: ${tags}`);
  
    if (studentID <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid studentID' });
    }
  
    try {
      const courses = await studentService.searchParticipatedCourses(studentID, startDate, tags);
      res.json({ success: true, courses });
    } catch (error) {
      console.error('searchParticipatedCourses | error:', error);
      res.status(500).json({ success: false, message: 'Error executing query' });
    }
  };