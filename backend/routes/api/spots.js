const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('express').Router();
const { Spot } = require('../../db/models');

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
    check('lat')
        .exists({checkFalsy: true})
        .isDecimal({min: -90.0, max: 90.0})
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal({ min: -180.0, max: 180.0 })
        .withMessage("Latitude is not valid"),
    check('name')
        .exists({checkFalsy: true})
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy: true})
        .isDecimal({min: 0, decimal_digits: '0,2'})
        .withMessage("Price per day is required"),
    handleValidationErrors
];

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    console.log('in post a spot route');
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
    console.log('in add an image given a spotId route');
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
            err.status = 401;
            next(err);
        }
    }
});

module.exports = router;