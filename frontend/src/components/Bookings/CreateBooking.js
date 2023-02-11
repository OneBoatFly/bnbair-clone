import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingNumReview from '../Reviews/RatingNumReview';
import MyButton from '../FormElements/MyButton';
import CalendarDates from './CalendarDates';
import './CreateBooking.css';
import { createSpotBooking } from '../../store/spots';
import { useHistory } from 'react-router-dom';

export default function CreateBooking({ calendarRef, spot, setShowReviewModal, dates, setDates, setDateErrors, totalDays }) {
    const user = useSelector(state =>  state.session.user);
    const history = useHistory();
    const nf = new Intl.NumberFormat();
    const price = nf.format(spot.price);

    const totalPrice = nf.format(spot.price * totalDays);
    const serviceFee = nf.format(Math.ceil(spot.price * totalDays * 0.1));
    const totalFinal = nf.format(Math.ceil(spot.price * totalDays * 1.1));

    const [bookingErrors, setBookingErrors] = useState('')
    const dispatch = useDispatch();

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
            history.push('/trips')
        }).catch(async (data) => {
            const error = await data.json()
            // console.log('error --------', error)
            setBookingErrors(error.message)
        })

    }


  return (
    <form className='create-booking-wrapper' onSubmit={handleSubmit}>
        <div className='price-rating-wrapper'>
            <span><span className='top-price'>${price}</span> night</span>
            <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
        </div>
        <div className='choose-date-wrapper'>
              <CalendarDates calendarRef={calendarRef} dates={dates} setDates={setDates} setDateErrors={setDateErrors} />
        </div>
        <div className='choose-guest-wrapper'>
            <div>
                  Guest feature to come
            </div>
        </div>
        {user ?
            <MyButton name='Reserve' disabled={false} />
            :
            <MyButton name='Please log in first' disabled={true} />
        }
        {bookingErrors.length > 0 &&
            <div className='error-messages-wrapper'>
                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                <span className='error-messages'>{bookingErrors}</span>
            </div>  
        } 
        <span style={{'marginTop': '8px'}}>You won't be charged ever</span>
        <div className='itemized-price-wrapper'>
            <div className='total-price'>
                <span>${price} x {totalDays} night</span>
                <span>${totalPrice}</span>
            </div>
            <div className='total-price'>
                <span>Service fee</span>
                <span>${serviceFee}</span>
            </div>            
        </div>
        <div className='total-price-wrapper'>
            <div className='total-price'>
                <span>Total before taxes</span>
                <span>${totalFinal}</span>
            </div>              
        </div>
    </form>
  )
};