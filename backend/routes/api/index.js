const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots').router;
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

module.exports = router;
