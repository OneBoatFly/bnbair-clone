import React from 'react';
import moment from 'moment';
import { dateRange, timeDiff } from './util';

export default function FutureTrips({ useFutureBookings }) {
    console.log('-----------FutureTrips Component-------------', useFutureBookings)

  return (
    <div className='future-booking-container'>
        <span>Upcoming reservations</span>
        <div className='future-booking-all-div'>
            {
                useFutureBookings?.map(booking => {
                    const inTime = timeDiff(booking.startDate)
                    const rangeStr = dateRange(booking.startDate, booking.endDate)

                    return (
                        <div key={booking.id} className='future-booking-single-div'>
                            <div className='future-booking-single-left'>
                                <div className='future-booking-single-left-top'>
                                    <span className='s-city'>{booking.Spot.city}</span>
                                    <span className='s-name'>{booking.Spot.name}</span>
                                </div>
                                <div className='future-booking-single-left-bottom'>
                                    <span className=''>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                    <span>{booking.Spot.address}</span>
                                </div>
                            </div>
                            <div className='future-booking-single-right'>
                                <span>In {inTime}</span>
                                {booking.Spot.previewImage ?
                                    <img src={booking.Spot.previewImage} alt='' /> 
                                    : 
                                    <div className='no-image-div'>No Image</div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
