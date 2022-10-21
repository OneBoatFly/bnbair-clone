// this file holds the resources with path '/api/users'

const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// list of middlewares to check username (check length, and check not email), email, password, then validate them
const validateSignup = [
    check('email')
        .exists({checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({checkFalsy: true})
        .isLength({min: 4})
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({checkFalsy: true})
        .isLength({ min: 6})
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({checkFalsy: true})
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name.'),        
    handleValidationErrors        
];

// sign up route
router.post('/', validateSignup, async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const user = await User.signup({ username, email, firstName, lastName, password });

    const token = setTokenCookie(res, user);
    const userJSON = user.toJSON();
    userJSON.token = token;
    return res.json(userJSON);
});

module.exports = router;