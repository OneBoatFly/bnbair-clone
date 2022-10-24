const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('express').Router();
const { Spot, Review } = require('../../db/models');

//create a spot
    // check create spot req body
const validateSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat', "Latitude is not valid")
        .exists({checkFalsy: true})
        .isFloat({min: -90, max: 90}),
    check('lng', "Longitude is not valid")
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }),
    check('name', "Name must be less than 50 characters")
        .exists({checkFalsy: true})
        .isLength({max: 50}),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price', "Price per day is required")
        .exists({checkFalsy: true})
        .isFloat({min: 0}),
    handleValidationErrors
];

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    // console.log('in post a spot route');
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ ownerId: req.user.id, 
        address, city, state, country, lat, lng, name, description, price });

    res.json(spot);
});

// add an image to a spot based on spotId
    // check image body
const validateImage = [
    check('url')
        .exists({checkFalsy: true})
        .isURL()
        .withMessage('Must provide a valid URL.'),
    check('preview')
        .exists()
        .isBoolean()
        .withMessage('Must indicate if this is preview or not.'),
    handleValidationErrors
];

router.post('/:spotId/images', requireAuth, validateImage, async (req, res, next) => {
    // console.log('in add an image given a spotId route');
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (spot.ownerId == req.user.id) {
            const image = await spot.createSpotImage({
                url: req.body.url,
                preview: req.body.preview,
            });
    
            const imageJSON = image.toJSON(); 
    
            res.json({
                id: imageJSON.id,
                url: imageJSON.url,
                preview: imageJSON.preview
            });
        } else {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }
    }
});

// create a booking for a spot given spotId
    // check body first
const validateBooking = [
    check('startDate')
        .exists({checkFalsy: true})
        .isDate()
        .withMessage('Must have a valid start Date.'),
    check('endDate')
        .exists({ checkFalsy: true })
        .isDate()
        .custom((value, {req}) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                return false;
            }
            return true;
        })
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    // console.log('in create a booking route');

    const spot = await Spot.findByPk(req.params.spotId);
    const guest = req.user;

    if (!spot) {
        // given spotId is not found
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else if (spot.ownerId == guest.id) {
        // Require proper authorization: Spot must NOT belong to the current user
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    } else {
        const { startDate, endDate } = req.body;
        const bookings = await spot.getBookings();
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.errors = {};
        err.status = 403;

        let [startConflict, endConflict, bothConflict] = [false, false, false];
        
        bookings.forEach(booking => {
            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);
            if (booking.startDate <= newStartDate && newStartDate <= booking.endDate && booking.startDate <= newEndDate && newEndDate <= booking.endDate) {
                bothConflict = true;
            } else if (booking.startDate <= newStartDate && newStartDate <= booking.endDate) {
                startConflict = true;           
            } else if (booking.startDate <= newEndDate && newEndDate <= booking.endDate) {
                endConflict = true;
            }
        });
        if (startConflict || bothConflict) err.errors.startDate = "Start date conflicts with an existing booking";
        if (endConflict || bothConflict) err.errors.endDate = "End date conflicts with an existing booking";

        if (startConflict || endConflict || bothConflict) next(err);
        else {
            // no conflict
            const booking = await spot.createBooking({userId: guest.id, startDate, endDate});
            res.json(booking);
        }
    }
});

// create a review for a spot given spotId
    // validate body first
const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists()
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else {
        const review = await Review.findOne({
            where: {
                spotId: spot.id,
                userId: req.user.id,
            }
        });

        if (!review) {
            try {
                console.log('**', spot.toJSON())
                console.log('*** userId:', req.user.id, typeof req.user.id)
                // const review = await spot.createReview({
                //     userId: req.user.id,
                //     review: req.body.review,
                //     stars: req.body.stars
                // });
                const review = await Review.create({
                    spotId: spot.id,
                    userId: req.user.id,
                    review: req.body.review,
                    stars: req.body.stars
                })
    
                res.json(review);
            } catch (e) {
                next(e);
            }
        } else {
            const err = new Error("User already has a review for this spot");
            err.status = 403;
            next(err);
        };
    };
});

module.exports = router;