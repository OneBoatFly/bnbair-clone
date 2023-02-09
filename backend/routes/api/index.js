const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js').router;
const reviewsRouter = require('./reviews');
const spotImagesRouter = require('./spot-images');
const bookingsRouter = require('./bookings');
const reviewImagesRouter = require('./review-images');
const mapsRouter = require('./maps');
const openAIRouter = require('./spotai');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/bookings', bookingsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/maps', mapsRouter);
router.use('/spotai', openAIRouter);

// router.post('/test', (req, res) => {
//     console.log('getting to post - /test endpoint')
//     res.json({reqBody: req.body})
// });

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