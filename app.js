const express = require('express');
const createError = require("http-errors");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path = require('path')
const routes = require('./routes')

const app = express();

app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
app.use(bodyParser.json({}));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '200000kb',
        parameterLimit: 200000 * 100,
    }),
);
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory
app.set('view engine', 'ejs'); // or your preferred template engine
app.set('views', path.join(__dirname, 'views'));
/** ALl Routes */
app.use('/api/v1', routes)

app.use((req, res, next) => {
    next(createError(404));
});
// General error handler for API responses
/* tslint:disable:no-unused-variable */
app.use((err, req, res, next) => {
    console.log(err)
    const status = err?.status || 500;
    res.status(status).json({
        success: false,
        statusCode: status,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
