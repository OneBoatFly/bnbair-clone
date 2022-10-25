function checkConflict(bookings, startDate, endDate) {
    const err = new Error('Sorry, this spot is already booked for the specified dates');
    err.errors = {};
    err.status = 403;

    let [startC, endC, bothC] = [false, false, false];
    for (let booking of bookings) {
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);

        // console.log('****************')
        // console.log('new', newStart, newEnd)
        // console.log('existing', existingStart, existingEnd)
        // console.log('****************')
        if (newStart <= existingStart && existingStart <= newEnd && newStart <= existingEnd && existingEnd <= newEnd) {
            // console.log('----------- both', booking.id)
            err.errors.startDate = "Start date conflicts with an existing booking";
            err.errors.endDate = "End date conflicts with an existing booking";
            bothC = true;
        } else if (newStart <= existingStart && existingStart <= newEnd) {
            // console.log('----------- end', booking.id)
            err.errors.endDate = "End date conflicts with an existing booking";
            startC = true;
        } else if (newStart <= existingEnd && existingEnd <= newEnd) {
            // console.log('----------- start', booking.id)
            err.errors.startDate = "Start date conflicts with an existing booking";
            endC = true;
        }

    };

    if (startC || endC || bothC) {
        return err;
    } else {
        return false;
    }
}

module.exports = checkConflict;