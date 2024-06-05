const studentService = require('../services/studentService');

exports.addCredit = async (req, res) => {
    try {
        let { studentID, credit } = req.body;
        credit = parseInt(credit);

        console.log("addCredit | studentID, credit : " + studentID + ", " + credit);

        if (!Number.isInteger(credit) || credit <= 0 || studentID <= 0) {
            console.error('addCredit | error');
            return res.status(400).json({ success: false, message: 'Invalid parameters' });
        }

        await studentService.addCredit(studentID, credit);

        return res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error executing query' });
    }
};

exports.getSubscriptionEndDate = async (req, res) => {
    try {
        const { studentID } = req.query;

        console.log("getSubscriptionEndDate | studentID : " + studentID);

        if (studentID <= 0) {
            res.status(400).json({ success: false, message: 'Invalid parameters' });
            return console.error('getSubscriptionEndDate | error: invalid studentID');
        }

        const subscriptionEndDate = await studentService.getSubscriptionEndDate(studentID);
        
        
        res.json({success: true, subscriptionEndDate : subscriptionEndDate });
    } catch (error) {
        console.log('getSubscriptionEndDate | error:', error);
        res.status(500).json({ success: false, message: 'Error executing query' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const { studentID } = req.query;

        console.log("getCourses | studentID : " + studentID);

        if (studentID <= 0) {
            res.status(400).json({ success: false, message: 'Invalid parameters' });
            return console.error('getCourses | error: invalid studentID');
        }

        const courses = await studentService.getCourses(studentID);
        res.json({ success: true, courses });
    } catch (error) {
        console.log('getSubscriptionEndDate | error:', error);
        res.status(500).json({ success: false, message: 'Error executing query' });
    }
}

exports.buyPlace = async (req, res) => {
    const { studentID, type, number } = req.body;

    console.log(`buyPlace | studentID, type, number: ${studentID}, ${type}, ${number}`);

    if (!Number.isInteger(number) || number <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid number' });
    }

    if (studentID <= 0) {
        return res.status(401).json({ success: false, message: 'Invalid studentID' });
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
    const { studentID } = req.query;

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

