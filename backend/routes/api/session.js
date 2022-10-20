//this file holds resources with path '/api/session'
const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// login route
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (user) {
        setTokenCookie(res, user);
        return res.json({user});
    } else {
        const err = new Error('Login failed');
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

module.exports = router;