const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const { ValidationError } = require('sequelize');

const app = express();

// connect morgan middleware for logging info about requests and responses
app.use(morgan('dev'));

// parse cookies
app.use(cookieParser());

// parse json
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
// this check token as well
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(function (req, resp, next) {
    if (req.headers['x-forwarded-proto'] == 'http' && isProduction) {
        return resp.redirect(301, 'https://' + req.headers.host + '/');
    } else {
        return next();
    }
});

// connect all routes
app.use(routes);

// connect error handler
    // Resource Not Found Handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

    // Sequelize Error Handler
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.status = 403;
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }

    next(err);
});

    // Format Error and Return JSON Error Handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    const errJSON = {};
    errJSON.message = err.message;
    errJSON.statusCode = err.status;
    errJSON.errors = err.errors;
    if (!isProduction) errJSON.stack = err.stack;
    res.json(errJSON);

    // res.json({
    //     // title: err.title || 'Server Error',
    //     message: err.message,
    //     statusCode: err.status,
    //     errors: err.errors,
    //     stack: isProduction ? null : err.stack
    // });
});

module.exports = app;