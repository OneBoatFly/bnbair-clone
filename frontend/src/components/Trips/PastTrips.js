import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { dateRange } from './util';
import './PastTrips.css';

export default function PastTrips({ userPastBookings }) {
    const history = useHistory()
    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }
    
    return (
        <div className='past-booking-container'>
            <span>Where you've been</span>
            <div className='past-booking-all-div'>
                {
                    userPastBookings?.map(booking => {
                        const rangeStr = dateRange(booking.startDate, booking.endDate)

                        return (
                            <div key={booking.id} className='past-booking-single-div' onClick={() => handleClick(booking.Spot.id)}>
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
