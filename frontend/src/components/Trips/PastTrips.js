import React from 'react';
import moment from 'moment';
import { dateRange, timeDiff } from './util';
import './PastTrips.css';

export default function PastTrips({ userPastBookings }) {
    console.log('-----------PastTrips Component-------------', userPastBookings)

    return (
        <div className='past-booking-container'>
            <span>Where you've been</span>
            <div className='past-booking-all-div'>
                {
                    userPastBookings?.map(booking => {
                        const inTime = timeDiff(booking.startDate)

                        return (
                            <div key={booking.id} className='past-booking-single-div'>
                                <div className='past-booking-single-left'>
                                    {booking.Spot.previewImage ?
                                        <img src={booking.Spot.previewImage} alt='' />
                                        :
                                        <div className='no-image-div'>No Image</div>
                                    }
                                </div>                                
                                <div className='past-booking-single-right'>
                                    <span className='s-city-past'>{booking.Spot.city}</span>
                                    <span className='s-name-past'>Hosted by {booking.Spot.ownerFirstName}</span>
                                    <span className='s-range-past'>In {inTime}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
