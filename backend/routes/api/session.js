//this file holds resources with path '/api/session'
const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// list of middlewares to 1)check credential, 2) check password, 3)validate credential and password from req body
const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// login route
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (user) {
        const token = setTokenCookie(res, user);
        const userJSON = user.toJSON();
        userJSON.token = token;
        // console.log('from login success', userJSON)
        return res.json(userJSON);
    } else {
        // const err = new Error('Login failed');
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }
});

// logout route
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
});

// get session user route
router.get('/', restoreUser, async (req, res) => {
    const user = req.user;
    if (user) {
        return res.json(user.toSafeObject())
    } else {
        return res.json({});
    }
});

module.exports = router;