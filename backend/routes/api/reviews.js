const router = require('express').Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage } = require('../../db/models');

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