const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const {User} = require('../../db/models');

router.use(restoreUser);

// /* ------------------ test starts ----------------------- */
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });

// router.post('/test', (req, res) => {
//     res.json({reqBody: req.body})
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

module.exports = router;