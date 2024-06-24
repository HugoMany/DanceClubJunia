const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: config.mail,
        pass: config.mailPass
    }
});

const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: config.mail,
        to,
        subject,
        text,
        html
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendMail
};