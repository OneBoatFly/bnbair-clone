// this file holds the resources with path '/api/users'

const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('/', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.signup({ username, email, password });

    setTokenCookie(res, user);
    return res.json({user});
});

module.exports = router;