import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { dateRange, timeDiff } from '../Trips/util';
// import './FutureReservations.css';
import { deleteBooking } from '../../store/bookings';

export default function FutureReservations({ spotFutureBookings }) {
    const history = useHistory()
    // const handleClick = (e, spotId) => {
    //     if (e.target.className.includes('fa-solid')) return;
    //     history.push(`/spots/${spotId}`)
    // }

    const dispatch = useDispatch();
    const handleDelete = (e, bookingId) => {
        dispatch(deleteBooking(bookingId))
    }

    console.log('spotFutureBookings', spotFutureBookings)

    return (
        <div className='future-booking-container'>
            <span>Upcoming reservations</span>
            <div className='future-booking-all-div'>
                {
                    spotFutureBookings?.map(booking => {
                        const inTime = timeDiff(booking.startDate)
                        const rangeStr = dateRange(booking.startDate, booking.endDate)

                        return (
                            <div key={booking.id} className='future-booking-single-div'>
                                <div className='future-booking-single-left'>
                                    <div className='future-booking-single-left-top'>
                                        <span className='s-name'>Guest: {booking.User.firstName}</span>
                                        <i className="fa-solid fa-trash future-booking-delete" onClick={(e) => handleDelete(e, booking.id)}></i>
                                    </div>
                                    <div className='future-booking-single-left-bottom'>
                                        <span className='s-range'>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                        <span>In {inTime}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
