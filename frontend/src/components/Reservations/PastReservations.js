import React from 'react';
import moment from 'moment';
import { dateRange } from '../Trips/util';
import './PastReservations.css';

export default function PastReservations({ spotPastBookings }) {

    return (
        <div className='past-booking-container'>
            <span>Past reservations</span>
            <div className='past-booking-all-div'>
                {
                    spotPastBookings?.map(booking => {
                        const rangeStr = dateRange(booking.startDate, booking.endDate)

                        return (
                            <div key={booking.id} className='past-booking-single-div past-reservation' >
                                <div className='past-booking-single-left'>
                                    {booking.User.profileImage ?
                                        <img src={booking.User.profileImage} alt='' />
                                        :
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
                                    }
                                </div>
                                <div className='past-booking-single-right'>
                                    <span className='s-name-past'>Guest: {booking.User.firstName}</span>
                                    <span className='s-range-past'>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
