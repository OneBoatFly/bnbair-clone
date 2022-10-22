const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);

router.post('/test', (req, res) => {
    res.json({reqBody: req.body})
});

module.exports = router;

// /* ------------------ test starts ----------------------- */
// const {User} = require('../../db/models');
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });


// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'DemoUser'
//         }
//     });

//     setTokenCookie(res, user);
//     return res.json({user});
// });

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// })
// /* ------------------ test ends ----------------------- */