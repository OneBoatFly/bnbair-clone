const { requireAuth } = require('../../utils/auth');
const router = require('express').Router();
const { Booking, Spot, SpotImage } = require('../../db/models');
const { validateBooking } = require('./spots');

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
    const oldBooking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            attributes: ['id'],
            include: {
                model: Booking,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        }
    });

    if (!oldBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err);
    } else {
        if (oldBooking.userId == req.user.id) {
            if (oldBooking.endDate < Date.now()) {
                const err = new Error("Past bookings can't be modified");
                err.status = 403;
                next(err);
            } else {
                const existingBookings = oldBooking.toJSON().Spot.Bookings;

                const err = new Error('Sorry, this spot is already booked for the specified dates');
                err.errors = {};
                err.status = 403;
    
                let [startConflict, endConflict, bothConflict] = [false, false, false];
    
                existingBookings.forEach(booking => {
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
                    const newBooking = await oldBooking.update({ startDate, endDate });
                    const newBookingJSON = newBooking.toJSON();
                    delete newBookingJSON.Spot;

                    res.json(newBookingJSON);
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

module.exports = router;