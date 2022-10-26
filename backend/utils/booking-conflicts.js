const { Booking } = require('../db/models');
const { Op } = require('sequelize');

async function checkConflict(spotId, newStart, newEnd) {
    const err = new Error('Sorry, this spot is already booked for the specified dates');
    err.errors = {};
    err.status = 403;

    const startConflictBooking = await Booking.findOne({
        where: {
            startDate: {[Op.lte]: newStart},
            endDate: {[Op.gte]: newStart},
            spotId,
        }
    });

    const endConflictBooking = await Booking.findOne({
        where: {
            startDate: {[Op.lte]: newEnd},
            endDate: {[Op.gte]: newEnd},
            spotId,
        }
    });

    const bothConflictBooking = await Booking.findOne({
        where: {
            startDate: {[Op.gte]: newStart},
            endDate: {[Op.lte]: newEnd},
            spotId,
        }
    });

    // console.log('-----------------checkling conflicts--------------------')
    // if (startConflictBooking) console.log('start', startConflictBooking.toJSON());
    // if (endConflictBooking) console.log('end', endConflictBooking.toJSON());
    // if (bothConflictBooking) console.log('both', bothConflictBooking.toJSON())

    if (startConflictBooking && endConflictBooking) {
        // console.log('both conflicts by falling into a existing booking')
        err.errors.startDate = "Start date conflicts with an existing booking";
        err.errors.endDate = "End date conflicts with an existing booking";
        return err;
    } else if (startConflictBooking) {
        err.errors.startDate = "Start date conflicts with an existing booking";
        return err;
    } else if (endConflictBooking) {
        err.errors.endDate = "End date conflicts with an existing booking";
        return err;        
    } else if (!startConflictBooking && !endConflictBooking && bothConflictBooking ) {
        // console.log('both conflicts by wrapping a existing booking')
        err.errors.startDate = "Start date conflicts with an existing booking";
        err.errors.endDate = "End date conflicts with an existing booking";
        return err;
    } else {
        return false;
    }
}

module.exports = checkConflict;