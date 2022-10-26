const { requireAuth } = require('../../utils/auth');
const router = require('express').Router();
const { Booking, Spot, SpotImage } = require('../../db/models');
const { validateBooking } = require('./spots');
const checkConflict = require('../../utils/booking-conflicts');

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
});

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const oldBooking = await Booking.findByPk(req.params.bookingId);

    if (!oldBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (oldBooking.userId == req.user.id) {
            if (new Date(oldBooking.endDate) < Date.now()) {
                const err = new Error("Past bookings can't be modified");
                err.status = 403;
                next(err);
            } else {
                const hasConflict = await checkConflict(oldBooking.spotId, startDate, endDate);
                if (hasConflict) {                 
                    next(hasConflict);
                } else {
                    const newBooking = await oldBooking.update({ startDate, endDate });
                    res.json(newBooking);
                }
            }

        } else {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }
    }
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            attributes: ['id', 'ownerId']
        }
    });

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err);        
    } else {
        if (booking.userId == req.user.id || booking.Spot.ownerId == req.user.id) {
            if (new Date(booking.startDate) < Date.now()) {
                const err = new Error("Bookings that have been started can't be deleted");
                err.status = 403;
                next(err);
            } else {
                await booking.destroy();
                res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                });
            }
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