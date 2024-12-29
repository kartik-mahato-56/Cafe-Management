const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: config.emailConfig.service,
    port: config.emailConfig.port,
    auth: {
        user: config.emailConfig.user,
        pass: config.emailConfig.pass,
    },
    from: config.emailConfig.from,
    tls: {
        rejectUnauthorized: false,
    },
});
const LOGO_URL = `${config.serverConfig.siteUrl}/images/ogo.png`;
const SUPPORT_LINK = `${config.serverConfig.frontendUrl}/support`;
const currentYear = new Date().getFullYear();

const sendEmail = (email, subject, data, templateName) => {
    data = {
        ...data,
        supportLink: SUPPORT_LINK,
        websiteLink: config.serverConfig.frontendUrl,
        year: currentYear,
    };
    const templatePath = path.join(__dirname, '..', 'views', templateName);
    const templateString = fs.readFileSync(templatePath, 'utf8');
    const renderedHtml = ejs.render(templateString, data);
    const mailOptions = {
        to: email,
        subject: subject,
        html: renderedHtml,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '..', 'public/images/logo.png'),
                cid: 'logo',
            },
        ],
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sendin email to::' + email, err);
        } else {
            console.log(`Successfully sent contact us email to ${email}`);
        }
    });
};

module.exports = sendEmail;
