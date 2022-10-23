// this file holds the resources with path '/api/users'

const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// list of middlewares to check username (check length, and check not email), email, password, then validate them
const validateSignup = [
    check('email', 'Valid email is required.')
        .exists({checkFalsy: true})
        .isEmail(),
    check('username', 'Please provide a username with at least 4 characters.')
        .exists({checkFalsy: true})
        .isLength({min: 4}),
    check('username', 'Username cannot be only whitespaces.')
        .not()
        .isEmpty({ ignore_whitespace: true }),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Password is required.')
        .isLength({ min: 6})
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({checkFalsy: true})
        .withMessage('First Name is required.'),
    check('firstName', 'First name cannot be only whitespaces')
        .not()    
        .isEmpty({ ignore_whitespace: true }),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required.'),
    check('lastName', 'Last name cannot be only whitespaces')
        .not()
        .isEmpty({ ignore_whitespace: true }),        
    handleValidationErrors        
];

// sign up route
router.post('/', validateSignup, async (req, res, next) => {
    const { username, email, firstName, lastName, password } = req.body;

    try {
        const user = await User.signup({ username, email, firstName, lastName, password });
    
        const token = setTokenCookie(res, user);
        const userJSON = user.toJSON();
        userJSON.token = token;
        return res.json(userJSON);
    } catch (e) {
        for (let i = 0; i < e.errors.length; i++) {
            if (e.errors[i].type === 'unique violation') {
                const path = e.errors[i].path;
                const err = new Error("User already exists");
                err.status = 403;
                if (path === 'email') err.errors = { email: `User with that email already exists` };
                else if (path === 'username') err.errors = { username: `User with that username already exists` };
                next(err);
            }
        }
        next(e)
    }
});

module.exports = router;