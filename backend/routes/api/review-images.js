const router = require('express').Router();
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: Review
    });

    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        next(err);        
    } else {
        // console.log(reviewImage.toJSON());
        if (reviewImage.Review.userId == req.user.id) {
            // can delete
            await reviewImage.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
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

module.exports = router;