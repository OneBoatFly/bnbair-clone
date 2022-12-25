import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../FormElements/MyButton';
import { createSpotBooking } from '../../store/spots';
import './CreateBookingMobile.css';

export default function CreateBookingMobile({ spot, dates }) {
    const user = useSelector(state => state.session.user);
    const nf = new Intl.NumberFormat();
    const price = nf.format(spot.price);

    const [bookingErrors, setBookingErrors] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        setBookingErrors('')
    }, [dates])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('CreateBooking handleSubmit')

        dispatch(createSpotBooking(
            spot.id,
            {
                'startDate': dates.startDate.format("YYYY-MM-DD"),
                'endDate': dates.endDate.format("YYYY-MM-DD")
            }
        )).then((response) => {
            // console.log('booked', response)
            // redirect to my bookings page once built.
        }).catch(async (data) => {
            const error = await data.json()
            // console.log('error --------', error)
            setBookingErrors(error.message)
        })

    }


    return (
        <form className='create-booking-wrapper-mobile' onSubmit={handleSubmit}>
            <div className='price-rating-wrapper-mobile'>
                <span><b>${price}</b> night</span>
                {dates &&
                    <span className='create-booking-mobile-dates'>{dates.startDate?.format('MMM D')} - {dates.endDate?.month() === dates.startDate?.month() ? dates.endDate?.format('D') : dates.endDate?.format('MMM D')}</span>
                }
            </div>
            {bookingErrors.length > 0 &&
                <div className='error-messages-wrapper'>
                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                    <span className='error-messages'>{bookingErrors}</span>
                </div>
            }
            <div className='create-booking-mobile-button-div'>
                {user ?
                    <MyButton name='Reserve' disabled={false} />
                    :
                    <MyButton name='Please log in first' disabled={true} />
                }
            </div>
        </form>
    )
}
