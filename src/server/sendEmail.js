import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
},
});

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: '"Tales & Trinkets" <e-library@ffmsdev.com>',
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;