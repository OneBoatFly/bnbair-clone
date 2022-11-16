import React, { useState } from 'react';
import RatingNumReview from '../Reviews/RatingNumReview';
import MyButton from '../FormElements/MyButton';
import CalendarDates from './CalendarDates';
import './CreateBooking.css';

export default function CreateBooking({ spot, setShowReviewModal }) {
    const nf = new Intl.NumberFormat();
    const price = nf.format(spot.price);

    const startDateStr = getStartDateStr();
    const endDateStr = getEndDateStr();

    const [startDate, setStartDate] = useState(startDateStr);
    const [endDate, setEndDate] = useState(endDateStr);
    const [dateErrors, setDateErrors] = useState({});

    const [totalDays, setTotayDays] = useState(1);
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
}

function getStartDateStr() {
    const todayDate = new Date();
    const todayPlusDate = new Date(todayDate.setDate(todayDate.getDate() + 1)); // next day for now. need to check bookings later

    return dateToString(todayPlusDate);
}

function getEndDateStr() {
    const todayPlus = new Date();
    const todayPlusDate = new Date(todayPlus.setDate(todayPlus.getDate() + 3)); // adding 3 days for now

    return dateToString(todayPlusDate);
}

function dateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}