import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { dateRange, timeDiff } from './util';
import './FutureTrips.css';
import { deleteBooking } from '../../store/bookings';

export default function FutureTrips({ userFutureBookings }) {
    const history = useHistory()
    const handleClick = (e, spotId) => {
        if (e.target.className.includes('fa-solid')) return;
        history.push(`/spots/${spotId}`)
    }

    const dispatch = useDispatch();
    const handleDelete = (e, bookingId) => { 
        dispatch(deleteBooking(bookingId))
    }

  return (
    <div className='future-booking-container'>
        <span>Upcoming reservations</span>
        <div className='future-booking-all-div'>
            {
                userFutureBookings?.map(booking => {
                    const inTime = timeDiff(booking.startDate)
                    const rangeStr = dateRange(booking.startDate, booking.endDate)

                    return (
                        <div key={booking.id} className='future-booking-single-div' onClick={(e) => handleClick(e, booking.Spot.id)}>
                            <div className='future-booking-single-left'>
                                <div className='future-booking-single-left-top'>
                                    <span className='s-city'>{booking.Spot.city}
                                        {/* {console.log(moment(booking.startDate))} */}
                                        {moment(booking.startDate) > moment() &&
                                            <i className="fa-solid fa-trash future-booking-delete" onClick={(e) => handleDelete(e, booking.id)}></i>
                                        }
                                    </span>
                                    <span className='s-name'>{booking.Spot.name} hosted by {booking.Spot.ownerFirstName}</span>
                                </div>
                                <div className='future-booking-single-left-bottom'>
                                    {/* <div className='future-boooking-single-left-bottom-border'> */}
                                        <span className='s-range'>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                        <span className='s-location-wrapper'>
                                            <span className='s-location'>{booking.Spot.address}</span>
                                            <span className='s-location'>{booking.Spot.city}, {booking.Spot.state}</span>
                                            <span className='s-country'>{booking.Spot.country}</span>
                                        </span>
                                    {/* </div> */}
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
        <div className='future-booking-all-div-mobile'>
            {
                userFutureBookings?.map(booking => {
                    const inTime = timeDiff(booking.startDate)
                    const rangeStr = dateRange(booking.startDate, booking.endDate)

                    return (
                        <div key={booking.id} className='future-booking-single-div-mobile'>
                            <div className='future-booking-single-right-mobile'>
                                <span>In {inTime}</span>
                                {booking.Spot.previewImage ?
                                    <img src={booking.Spot.previewImage} alt='' />
                                    :
                                    <div className='no-image-div'>No Image</div>
                                }
                            </div>                            
                            <div className='future-booking-single-left-mobile'>
                                <div className='future-booking-single-left-top-mobile'>
                                    <span className='s-city'>{booking.Spot.city}</span>
                                    <span className='s-name'>{booking.Spot.name} hosted by {booking.Spot.ownerFirstName}</span>
                                </div>
                                <div className='future-booking-single-left-bottom-mobile'>
                                    <span className='s-range'>{rangeStr} <span>{moment(booking.endDate).year()}</span></span>
                                    <span className='s-location-wrapper'>
                                        <span className='s-location'>{booking.Spot.address}</span>
                                        <span className='s-location'>{booking.Spot.city}, {booking.Spot.state}</span>
                                        <span className='s-country'>{booking.Spot.country}</span>
                                    </span>
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
