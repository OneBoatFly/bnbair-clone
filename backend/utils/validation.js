const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        console.log('****', validationErrors)

        const errors = {};
        for (let i = 0; i < validationErrors.array().length; i++) {
            const error = validationErrors.array()[i];
            errors[error.param] = error.msg;
            // if there are multiple error with 1 param, the last error will be assigned here.          
        }
        // validationErrors.array().map((error) => return `${error.msg}`});

        // const err = Error('Bad request.');
        const err = Error('Validation error')
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }

    next();
};

module.exports = {
    handleValidationErrors
};