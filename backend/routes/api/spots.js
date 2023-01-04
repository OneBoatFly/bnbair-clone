const { check, query } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const Moment = require('moment');
const MomentRange = require('moment-range');

// get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: { ownerId: req.user.id }
    });

    const spotsArr = [];
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        const spotJSON = spot.toJSON();

        const avgRating = await Review.findAll({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            where: { spotId: spot.id }
        });

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
            spotJSON.previewImage = preview.url;
        } else {
            spotJSON.previewImage = null;
        }

        const numberOfBooking = await Booking.findAll({
            attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "numberOfBooking"]],
            where: { spotId: spot.id }
        });

        spotJSON.numberOfBooking = numberOfBooking[0].toJSON().numberOfBooking

        spotsArr.push(spotJSON);
    }

    res.json({ Spots: spotsArr });
})

// get all reviews by a spotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);        
    } else {
        const reviews = await Review.findAll({
            where: { spotId: req.params.spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                },
            ]
        });

        res.json({ Reviews: reviews });
    }
});

// get all bookings by a spotId
    // removed requireAuth here
router.get('/:spotId/bookings', async (req, res, next) => {
    console.log('spotId/bookings -----------', req.params.spotId)
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);        
    } else {
        const bookings = await spot.getBookings({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });

        if (!req.user) {
            // console.log('--------------1----------------------------')
            const bookingsJSON = [];
            for (let booking of bookings) {
                const bookingJSON = {};
                bookingJSON.spotId = booking.spotId;
                bookingJSON.startDate = booking.startDate;
                bookingJSON.endDate = booking.endDate;
                bookingsJSON.push(bookingJSON);
            }

            res.json({ Bookings: bookingsJSON });
        } else {
            if (req.user.id === spot.ownerId) {
                const moment = MomentRange.extendMoment(Moment);

                let bookingsFutureJSON = [];
                let bookingsPastJSON = [];
                for (let booking of bookings) {
                    const bookingJSON = booking.toJSON();

                    if (moment(booking.endDate) > moment()) {
                        bookingsFutureJSON.push(bookingJSON);
                    } else {
                        bookingsPastJSON.push(bookingJSON); 
                    }
                }

                bookingsFutureJSON.sort((a, b) => moment(a.startDate) - moment(b.startDate)) // earliest first
                bookingsPastJSON.sort((a, b) => moment(b.startDate) - moment(a.startDate)) // latest first
                res.json({ BookingsFuture: bookingsFutureJSON, BookingsPast: bookingsPastJSON });
            } else {
                // console.log('-------------3-----------------------------')
                const bookingsJSON = [];
                for (let booking of bookings) {
                    const bookingJSON = {};
                    bookingJSON.spotId = booking.spotId;
                    bookingJSON.startDate = booking.startDate;
                    bookingJSON.endDate = booking.endDate;
                    bookingsJSON.push(bookingJSON);
                }
    
                res.json({Bookings: bookingsJSON});
            }
        }

    }

});

// get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include : [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
            }
        ]
    });

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else {
        const spotJSON = spot.toJSON();

        const countAndAvg = await Review.findAll({
            attributes: [[sequelize.fn("COUNT", sequelize.col('stars')), 'numReviews'], [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            where: { spotId: spot.id }
        });
        // console.log(countAndAvg[0].toJSON().numReviews, typeof countAndAvg[0].toJSON().numReviews)

        if (!countAndAvg[0].toJSON().numReviews || !countAndAvg[0].toJSON().numReviews === '0') {
            spotJSON.numReviews = 0;
        } else {
            spotJSON.numReviews = parseInt(countAndAvg[0].toJSON().numReviews);
        }

        if (!countAndAvg[0].toJSON().avgRating) {
            spotJSON.avgStarRating = null;
        } else {
            spotJSON.avgStarRating = Math.round(countAndAvg[0].toJSON().avgRating * 10) / 10;
        }

        const bookings = await spot.getBookings();
        // console.log('--------- bookings of a spot in spot route --------', bookings)
        const moment = MomentRange.extendMoment(Moment);
        let startDate = moment();
        let endDate = moment(startDate, "DD-MM-YYYY").add(2, 'days'); // adding 3 days for now
        bookings.sort((b1, b2) => moment(b1.startDate) - moment(b2.startDate))
        if (bookings.length) {
            while (!isAvailableDate(endDate, bookings, true) || !isAvailableDate(startDate, bookings, false)) {
                endDate = moment(endDate, "DD-MM-YYYY").add(1, 'days');
                startDate = moment(endDate, "DD-MM-YYYY").subtract(2, 'days');
            }
        }

        // console.log('firstavailable end date >>>>>>>>>>', endDate)
        spotJSON.firstAvailableStart = moment(endDate, "DD-MM-YYYY").subtract(2, 'days')
        spotJSON.firstAvailableEnd = endDate;
        // console.log('Spot detail with first availability -----------', spotJSON)

        res.json(spotJSON);
    }
})

const isAvailableDate = (date, bookings, isEndDate) => {
    const moment = MomentRange.extendMoment(Moment);
    // console.log('-------------------------------------------------')
    
    for (let booking of bookings) {
        const bookedRange = moment.range(booking.startDate, booking.endDate);
        if (bookedRange.contains(moment(date))) {
            // console.log(`Invalid ${isEndDate ? 'endDate' : 'startDate'}`)
            // console.log(moment(date))
            // console.log(booking.startDate, booking.endDate)
            return false;  
        }      
    }

    // console.log(`Valid ${isEndDate ? 'endDate' : 'startDate'}`)
    // console.log(moment(date))
    return true;
}

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
            if (parseInt(value, 10) > parseInt(req.query.maxPrice, 10)) {
                // console.log('rejected here**************************')
                return false;
            }
            return true;
        }),
    handleValidationErrors
];


router.get('/', validateQuery, async (req, res, next) => {
    // console.log(req.query)
    // console.log(req.query.minPrice, typeof req.query.minPrice)
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
    // console.log('-------------------------------------------------------------------')
    // GET /api/spots?page=1&minPrice=10&maxPrice=200
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
    const totalSpots = await Spot.findAll({ where, 
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'totalNumSpots']],
    });

    // console.log(totalSpots[0].toJSON())
    const spots = await Spot.findAll({ where, limit: size, offset, order: ['id'] });

    const spotsArr = [];
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        
        const spotJSON = spot.toJSON();
        const avgRating = await Review.findAll({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            where: { spotId: spot.id }
        });
        // console.log(typeof avgRating[0].toJSON().avgRating);
        if (!avgRating[0].toJSON().avgRating) {
            spotJSON.avgRating = null;
        } else {
            // console.log(avgRating)
            spotJSON.avgRating = Math.round(avgRating[0].toJSON().avgRating * 100) / 100;
        }
    
        const previews = await SpotImage.findAll({
            where: {
                preview: true,
                spotId: spot.id
            },
            attributes: ['url']
        });
        if (previews.length) {
            let previewUrls = []
            for (let preview of previews) {
                previewUrls.push(preview.url)
            }
            spotJSON.previewImage = previewUrls;
        } else {
            spotJSON.previewImage = [];
        }
        
        spotsArr.push(spotJSON);
    }

    res.json({ 
        Spots: spotsArr,
        page,
        size,
        spotsFound: totalSpots[0].toJSON().totalNumSpots
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
    
    try {
        const spot = await Spot.create({ ownerId: req.user.id, 
            address, city, state, country, lat, lng, name, description, price });
    
        res.json(spot);
    } catch(e) {
        // console.log('backend error: ', e)
        // console.log('backend error: ', typeof e)
        // console.log('backend e.parent.error: ', e.parent.error)
        
        if (e.errors) {
            const err = new Error();
            const resError = {}
            e.errors.forEach(error => {
                // console.log('backend each error: ', error)
                if (error.type === 'unique violation') {
                    // console.log('unique')
                    err.message = 'This address already exists.'
                }
                resError[error.path] = error.message
            })
            err.status = 403;
            err.errors = resError;
            // console.log('backend resError: ', resError);
            next(err);
        } else {
            // console.log('backend e.parent: ', e.parent)
            // console.log('backend e.parent: ', typeof e.parent)
            const err = new Error();
            err.status = 403;
            err.errors = e.parent;
            next(err);
        }

    }
    
});

// edit a spot
// need to confirm if i should assume body must include all attributes
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (spot.ownerId == req.user.id) {
            // make the updates
            const updatedSpot = await spot.update({ address, city, state, country, lat, lng, name, description, price });
            res.json(updatedSpot);
        } else {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        }
    }
});

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    // console.log('***************')
    // if (spot) console.log(spot.toJSON())
    // else console.log(spot)
    // console.log('***************')

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (spot.ownerId !== req.user.id) {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        } else {
            await spot.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }

})

// add an image to a spot based on spotId
    // check image body
const validateImage = [
    check('url')
        .exists({checkFalsy: true})
        .isURL({require_tld:false})
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
            // console.log('passed express validation--------')
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
            err.status = 403;
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
        .withMessage('Must have a valid end Date.')
        .custom((value, {req}) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                return false;
            }
            return true;
        })
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];

const checkConflict = require('../../utils/booking-conflicts');

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
        err.status = 403;
        return next(err);
    } else {
        const { startDate, endDate } = req.body;
        const hasConflict = await checkConflict(req.params.spotId, startDate, endDate);

        if (hasConflict) {
            next(hasConflict);
        } else {
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

module.exports = { router, validateReview, validateBooking };