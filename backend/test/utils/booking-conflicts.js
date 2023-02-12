const chai = require('chai');
const { returnBookingError } = require('../../utils/booking-conflicts');

chai.should();
const assert = chai.assert;

describe('booking conflicts check', () => {

    /* test book conflict returned error */
    describe('return errors when conflict is found', () => {
        it('should return an error if startend, enddate and both found true', () => {
            const startConflictBooking = true;
            const endConflictBooking = true;
            const bothConflictBooking = false;
            const result1 = returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking);
            assert.instanceOf(result1, Error);
            assert.equal(result1.message, 'Sorry, this spot is already booked for the specified dates');
            assert.equal(result1.errors.startDate, 'Start date conflicts with an existing booking');
            assert.equal(result1.errors.endDate, 'End date conflicts with an existing booking');
        });

        it('should return an error if startdate found true', () => {
            const startConflictBooking = true;
            const endConflictBooking = false;
            const bothConflictBooking = false;
            const result2 = returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking)
            assert.instanceOf(result2, Error);
            assert.equal(result2.message, 'Sorry, this spot is already booked for the specified dates');
            assert.equal(result2.errors.startDate, 'Start date conflicts with an existing booking');
        });

        it('should return an error if enddate found true', () => {
            const startConflictBooking = false;
            const endConflictBooking = true;
            const bothConflictBooking = false;
            const result3 = returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking)
            assert.instanceOf(result3, Error);
            assert.equal(result3.message, 'Sorry, this spot is already booked for the specified dates');
            assert.equal(result3.errors.endDate, 'End date conflicts with an existing booking');
        });

        it('should return an error if not found startend or enddate but start and end found wrapping true', () => {
            const startConflictBooking = false;
            const endConflictBooking = false;
            const bothConflictBooking = true;
            const result4 = returnBookingError(startConflictBooking, endConflictBooking, bothConflictBooking)
            assert.instanceOf(result4, Error);
            assert.equal(result4.message, 'Sorry, this spot is already booked for the specified dates');
            assert.equal(result4.errors.startDate, 'Start date conflicts with an existing booking');
            assert.equal(result4.errors.endDate, 'End date conflicts with an existing booking');
        });      
    });

    describe('return false when no conflict is found', () => {
        it('should return an false if no startdate, enddate or wrapping case found', () => {
            const startConflictBooking = false;
            const endConflictBooking = false;
            const bothConflictBooking = false;
            const result5 = (startConflictBooking, endConflictBooking, bothConflictBooking)
            assert.equal(result5, false);
        });
    });
});