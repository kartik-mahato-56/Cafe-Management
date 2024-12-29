const http = require('http')
const fs = require('fs');
const https = require('https');
const app = require('./app')
const config = require('./config/config')

const PORT = config.serverConfig.port;
// Load SSL certificates (only required for HTTPS)
const sslOptions =
    config.serverConfig.nodeEnv == 'production' ||
        config.serverConfig.nodeEnv == 'development'
        ? {
            key: fs.readFileSync(config.serverConfig.sslKey),
            cert: fs.readFileSync(config.serverConfig.sslCert),
        }
        : {};
// Create the server based on the environment
if (
    config.serverConfig.nodeEnv == 'production' ||
    config.serverConfig.nodeEnv == 'development'
) {
    // Create HTTPS server if in production mode
    https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`HTTPS Server is running on PORT::${PORT}`);
    });
} else {
    // Create HTTP server if in any other mode (e.g., development)
    http.createServer(app).listen(PORT, () => {

        console.log(`HTTP Server is running on PORT::${PORT}`);
    });
}
