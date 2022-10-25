const { check, query } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('express').Router();
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

// get all spot with query filters
    // check query inputs
const validateQuery = [
    query('page', "Page must be greater than or equal to 1")
        .if((value, {req}) => req.query.page)
        .isInt({ min: 1 }),
    query('size', "Size must be greater than or equal to 1")
        .if((value, { req }) => req.query.size)
        .isInt({min: 1}),
    query('maxLat', "Maximum latitude is invalid")
        .if((value, { req }) => req.query.maxLat)
        .isFloat({ min: -90, max: 90 }),
    query('minLat', "Minimum latitude is invalid")
        .if((value, { req }) => req.query.minLat)
        .isFloat({ min: -90, max: 90 })
        .custom((value, { req }) => {
            if (parseInt(value) > parseInt(req.query.maxLat)) {
                return false;
            }
            return true;
        }),
    query('maxLng', "Maximum longitude is invalid")
        .if((value, { req }) => req.query.maxLng)
        .isFloat({ min: -180, max: 180 }),
    query('minLng', "Minimum longitude is invalid")
        .if((value, { req }) => req.query.minLng)
        .isFloat({ min: -180, max: 180 })
        .custom((value, { req }) => {
            if (parseInt(value) > parseInt(req.query.maxLng)) {
                return false;
            }
            return true;
        }),
    query('maxPrice', "Maximum price must be greater than or equal to 0")
        .if((value, { req }) => req.query.maxPrice)
        .isFloat({min: 0}),
    query('minPrice', "Minimum price must be greater than or equal to 0")
        .if((value, { req }) => req.query.minPrice)
        .isFloat({min: 0})
        .custom((value, { req }) => {
            if (value > req.query.maxPrice) {
                return false;
            }
            return true;
        }),
    handleValidationErrors
];

router.get('/', validateQuery, async (req, res, next) => {
    // const spots = await Spot.findAll({
    //     include: [
    //         {
    //             model: Review,
    //             attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    //             group: ['Reviews.id']
    //         }
    //     ],
    //     group: ['Spot.id']
    // });
    // this works on sqlite but gets an error message in postres
    // "column \"Reviews.id\" must appear in the GROUP BY clause or be used in an aggregate function"
    
    let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
    if (!page) page = 1;
    if (!size) size = 20;
    const offset = (page - 1) * size;
    
    const where = {};
    // console.log('--------------------', maxLat, minLat, maxLng, minLng, maxPrice, minPrice)
    const latOp = [];
    if (maxLat) latOp.push({ [Op.lte]: maxLat });
    if (minLat) latOp.push({ [Op.gte]: minLat });
    if (maxLat || minLat) where.lat = {[Op.and]: latOp};

    const lngOp = [];
    if (maxLng) lngOp.push({ [Op.lte]: maxLng });
    if (minLng) lngOp.push({ [Op.gte]: minLng });
    if (maxLng || minLng) where.lng = { [Op.and]: lngOp };

    const priceOp = [];
    if (maxPrice) priceOp.push({ [Op.lte]: maxPrice });
    if (minPrice) priceOp.push({ [Op.gte]: minPrice });
    if (maxPrice || minPrice) where.price = { [Op.and]: priceOp };

    // console.log('****************', where)
    const spots = await Spot.findAll({ where, limit: size, offset });

    const spotsArr = [];
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        
        const spotJSON = spot.toJSON();
        const avgRating = await Review.findAll({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            where: { spotId: spot.id }
        });
        // console.log(avgRating[0].toJSON().avgRating);
        if (!avgRating[0].toJSON().avgRating) {
            spotJSON.avgRating = null;
        } else {
            spotJSON.avgRating = Math.round(avgRating[0].toJSON().avgRating * 10) / 10;
        }
    
        const preview = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            },
            attributes: ['url']
        });
        if (preview) {
            spotJSON.preview = preview.url;
        } else {
            spotJSON.preview = null;
        }
        
        spotsArr.push(spotJSON);
    }

    res.json({ 
        Spots: spotsArr,
        page,
        size
    });
});

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
                // console.log('**', spot.toJSON())
                // console.log('*** userId:', req.user.id, typeof req.user.id)
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