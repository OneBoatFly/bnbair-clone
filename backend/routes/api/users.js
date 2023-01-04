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
    check('username', 'Username is required.')
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
        .withMessage('First name is required.'),
    check('firstName', 'First name is required.')
        .not()    
        .isEmpty({ ignore_whitespace: true }),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last name is required.'),
    check('lastName', 'Last name is required.')
        .not()
        .isEmpty({ ignore_whitespace: true }),     
    handleValidationErrors        
];

// sign up route
router.post('/', validateSignup, async (req, res, next) => {
    let { username, email, firstName, lastName, password, profileUrl } = req.body;
    if (!profileUrl) profileUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

    try {
        const user = await User.signup({ username, email, firstName, lastName, password, profileUrl });
    
        const token = setTokenCookie(res, user);
        const userJSON = user.toJSON();
        userJSON.token = token;
        return res.json(userJSON);
    } catch (e) {
        const err = new Error("User already exists");
        err.status = 403;
        err.errors = {};
        
        let uniqueViolation = false;
        // console.log('**************')
        // console.log(e.errors)
        for (let i = 0; i < e.errors.length; i++) {
            if (e.errors[i].type === 'unique violation') {
                uniqueViolation = true;
                const path = e.errors[i].path;
                err.errors[path] = `User with that ${path} already exists` ;
            }
        }
        if (uniqueViolation) next(err);
        else next(e);
    }
});

module.exports = router;