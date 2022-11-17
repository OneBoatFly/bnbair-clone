import React, { useEffect } from 'react';
import './CalendarDates.css';

export default function CalendarDates({ dates, setDates, setDateErrors }) {
    
    // useEffect(() => {
    //     // console.log(startDate, endDate)

    // }, [startDate, endDate])

  return (
    <div className='dates-input-wrapper'>
        <div className='dates-input startDate'>
            <span className='check-inout-label'>CHECK-IN</span>
            {dates.startDate && <div>{dates.startDate.format().slice(0, 10)}</div>}
        </div>
        <div className='dates-input endDate'>
            <span className='check-inout-label'>CHECKOUT</span>
            {dates.endDate && <div>{dates.endDate.format().slice(0, 10)}</div>}
        </div>
    </div>
  )
}
