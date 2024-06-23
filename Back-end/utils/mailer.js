const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'danceclubjunia@gmail.com',
        pass: 'jvdq ukat trfi uvdz'
    }
});

const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'danceclubjunia@gmail.com',
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