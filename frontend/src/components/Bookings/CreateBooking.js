import React, { useState } from 'react';
import RatingNumReview from '../Reviews/RatingNumReview';
import MyButton from '../FormElements/MyButton';
import CalendarDates from './CalendarDates';
import './CreateBooking.css';

import { getStartDateStr, getEndDateStr } from '../Spots/SpotCalcs/spotDates';

export default function CreateBooking({ spot, setShowReviewModal, startDate, setStartDate, endDate, setEndDate, setDateErrors, totalDays }) {
    const nf = new Intl.NumberFormat();
    const price = nf.format(spot.price);

    const totalPrice = nf.format(spot.price * totalDays);
    const serviceFee = nf.format(Math.ceil(spot.price * totalDays * 0.1));
    const totalFinal = nf.format(Math.ceil(spot.price * totalDays * 1.1));

  return (
    <form className='create-booking-wrapper'>
        <div className='price-rating-wrapper'>
            <span><span className='top-price'>${price}</span> night</span>
            <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
        </div>
        <div className='choose-date-wrapper'>
              <CalendarDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setDateErrors={setDateErrors} />
        </div>
        <div className='choose-guest-wrapper'>
            <div>
                  Guest feature to come
            </div>
        </div>        
        <MyButton name='Reserve' />
        <span>You won't be charged yet</span>
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