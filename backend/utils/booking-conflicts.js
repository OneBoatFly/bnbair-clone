const { Op } = require('sequelize');
const moment = require('moment');
const { Booking } = require('../db/models');

function returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking) {
  const err = new Error('Sorry, this spot is already booked for the specified dates');
  err.errors = {};
  err.status = 403;
  
  if (startConflictBooking && endConflictBooking) {
    err.errors.startDate = 'Start date conflicts with an existing booking';
    err.errors.endDate = 'End date conflicts with an existing booking';
    return err;
  } if (startConflictBooking) {
    err.errors.startDate = 'Start date conflicts with an existing booking';
    return err;
  } if (endConflictBooking) {
    err.errors.endDate = 'End date conflicts with an existing booking';
    return err;
  } if (!startConflictBooking && !endConflictBooking && bothConflictBooking) {
    err.errors.startDate = 'Start date conflicts with an existing booking';
    err.errors.endDate = 'End date conflicts with an existing booking';
    return err;
  }

  return false;
}

async function checkConflict(spotId, newStart, newEnd) {
  const potentialStartConflictBooking = await Booking.findOne({
    where: {
      startDate: { [Op.lte]: newStart },
      endDate: { [Op.gte]: newStart },
      spotId,
    },
  });

  let startConflictBooking;
  if (potentialStartConflictBooking) {
    if (moment(potentialStartConflictBooking.endDate) > moment(newEnd)) {
      startConflictBooking = true;
    }
  }

  const endConflictBooking = await Booking.findOne({
    where: {
      startDate: { [Op.lte]: newEnd },
      endDate: { [Op.gte]: newEnd },
      spotId,
    },
  });

  const bothConflictBooking = await Booking.findOne({
    where: {
      startDate: { [Op.gte]: newStart },
      endDate: { [Op.lte]: newEnd },
      spotId,
    },
  });

  return returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking);  
}

module.exports = {checkConflict, returnBookingError};
