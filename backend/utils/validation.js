const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    for (let i = 0; i < validationErrors.array().length; i += 1) {
      const error = validationErrors.array()[i];
      errors[error.param] = error.msg;
    }

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }

  next();
};

module.exports = {
  handleValidationErrors,
};
