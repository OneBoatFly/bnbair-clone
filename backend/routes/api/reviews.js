const router = require('express').Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage, User, Spot, SpotImage } = require('../../db/models');

// get all reviews of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {userId: req.user.id},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const reviewsArr = [];
    for (let i = 0; i < reviews.length; i++) {
        let reviewJSON = reviews[i].toJSON();

        const spotId = reviewJSON.Spot.id;
        const previewImage = await SpotImage.findOne({
            where: {spotId, preview: true}
        });

        if (!previewImage) {
            reviewJSON.Spot.previewImage = null;
        } else {
            reviewJSON.Spot.previewImage = previewImage.url;
        }

        reviewsArr.push(reviewJSON);
    }

    res.json({ Reviews: reviewsArr });
});

// add an image to a review given reviewId
    // test body first
const validateReview = [
    check('url')
        .exists({checkFalsy: true})
        .isURL()
        .withMessage('Image url must be provided.'),
    handleValidationErrors
];

router.post('/:reviewId/images', requireAuth, validateReview, async (req, res, next) => {
    // console.log('in the add an image to a review route');
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId,
            userId: req.user.id,
        },
        include: ReviewImage
    });
    
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (review.toJSON().ReviewImages.length === 10) {
            const err = new Error("Maximum number of images for this resource was reached");
            err.status = 403;
            next(err);            
        } else {
            const image = await review.createReviewImage({url: req.body.url});
            const imageJSON = image.toJSON();
            delete imageJSON.reviewId;
            delete imageJSON.createdAt;
            delete imageJSON.updatedAt;
            res.json(imageJSON);
        }
    }
});

module.exports = router;