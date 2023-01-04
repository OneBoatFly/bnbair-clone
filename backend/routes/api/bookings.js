const { requireAuth } = require('../../utils/auth');
const router = require('express').Router();
const { Booking, Spot, SpotImage, User } = require('../../db/models');
const { validateBooking } = require('./spots');
const checkConflict = require('../../utils/booking-conflicts');
const moment = require('moment')

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                    model: SpotImage,
                    where: {preview: true},
                    attributes: ['url'],
                    required: false
                }, 
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['firstName', 'lastName'],
                }            
            ],
        }
    });

    let bookingsFutureJSON = [];
    let bookingsPastJSON = [];
    for (let booking of bookings) {
        const bookingJSON = booking.toJSON();

        // console.log(moment(booking.endDate).format('YYYY-MM-DD'))
        if (moment(booking.endDate) > moment()) {
            if (bookingJSON.Spot.SpotImages.length) {
                bookingJSON.Spot.previewImage = bookingJSON.Spot.SpotImages[0].url;
            } else {
                bookingJSON.Spot.previewImage = null;
            }
            
            bookingJSON.Spot.ownerFirstName = bookingJSON.Spot.Owner.firstName;
            bookingJSON.Spot.ownerLastName = bookingJSON.Spot.Owner.lastName;

            delete bookingJSON.Spot.SpotImages;
            delete bookingJSON.Spot.Owner;
    
            bookingsFutureJSON.push(bookingJSON);
        } else {
            if (bookingJSON.Spot.SpotImages.length) {
                bookingJSON.Spot.previewImage = bookingJSON.Spot.SpotImages[0].url;
            } else {
                bookingJSON.Spot.previewImage = null;
            }

            bookingJSON.Spot.ownerFirstName = bookingJSON.Spot.Owner.firstName;
            bookingJSON.Spot.ownerLastName = bookingJSON.Spot.Owner.lastName;

            delete bookingJSON.Spot.SpotImages;
            delete bookingJSON.Spot.Owner;

            bookingsPastJSON.push(bookingJSON);            
        }
    }
    
    bookingsFutureJSON.sort((b1, b2) => b1.endDate - b2.endDate)
    bookingsPastJSON.sort((b1, b2) => b1.endDate - b2.endDate)
    res.json({ BookingsFuture: bookingsFutureJSON, BookingsPast: bookingsPastJSON });
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
            err.status = 403;
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
            err.status = 403;
            return next(err);
        }        
    }
});

module.exports = router;