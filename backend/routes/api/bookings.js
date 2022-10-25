const { requireAuth } = require('../../utils/auth');
const router = require('express').Router();
const { Booking, Spot, SpotImage } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: {
                model: SpotImage,
                where: {preview: true},
                attributes: ['url'],
                required: false
            },
        }
    });

    let bookingsJSON = [];
    for (let booking of bookings) {
        const bookingJSON = booking.toJSON();

        if (bookingJSON.Spot.SpotImages.length) {
            bookingJSON.Spot.previewImage = bookingJSON.Spot.SpotImages[0].url;
        } else {
            bookingJSON.Spot.previewImage = null;
        }
        
        delete bookingJSON.Spot.SpotImages;

        bookingsJSON.push(bookingJSON);
    }

    res.json({Bookings: bookingsJSON});
})

module.exports = router;