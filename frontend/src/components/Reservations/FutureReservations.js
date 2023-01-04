import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { dateRange, timeDiff } from '../Trips/util';
import './FutureReservations.css';
import { deleteBooking, getSpotBookings } from '../../store/bookings';

export default function FutureReservations({ spotFutureBookings }) {
    const { spotId } = useParams();

    const dispatch = useDispatch();
    const handleDelete = (e, bookingId) => {
        dispatch(deleteBooking(bookingId))
            .then(() => {
                dispatch(getSpotBookings(spotId))
            })
    }

    // console.log('spotFutureBookings', spotFutureBookings)

    return (
        <div className='future-booking-container'>
            <span>Upcoming reservations</span>
            <div className='future-reservation-all-div'>
                {
                    spotFutureBookings?.map(booking => {
                        const inTime = timeDiff(booking.startDate)
                        const rangeStr = dateRange(booking.startDate, booking.endDate)

                        return (
                            <div key={booking.id} className='future-reservation-single-div'>
                                <div className='future-reservation-single-right'>
                                    <span>In {inTime}</span>
                                    {booking.User.profileImage ?
                                        <img src={booking.User.profileImage} alt='' />
                                        :
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
                                    }
                                </div>                                
                                <div className='future-reservation-single-left'>
                                    <div className='future-reservationsingle-left-top'>
                                        <span className='s-name'>Guest: <b>{booking.User.firstName}</b></span>
                                    </div>
                                    <div className='future-reservation-single-left-bottom'>
                                        <span className='s-range-reservation'>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                    </div>
                                    <i className="fa-solid fa-trash future-reservation-delete" onClick={(e) => handleDelete(e, booking.id)}></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
