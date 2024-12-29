require('dotenv').config({ path: process.cwd() + '/.env' });

module.exports = {
    serverConfig: {
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
        sslKey: process.env.SSL_KEY,
        sslCert: process.env.SSL_CERT,
        siteUrl: process.env.SITE_URL,
        frontendUrl: process.env.FRONTEND_URL,
    },
    jwtConfig: {
        secretKey: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    emailConfig: {
        host: process.env.MAIL_HOST || 'smtp.gamil.com',
        service: process.env.MAIL_SERVICE || 'gmail',
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
    },
};
