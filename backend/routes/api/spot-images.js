const { requireAuth } = require('../../utils/auth');
const router = require('express').Router();
const { SpotImage, Spot } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: Spot,
    });

    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (spotImage.Spot.ownerId !== req.user.id) {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        } else {
            await spotImage.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }
});

module.exports = router;