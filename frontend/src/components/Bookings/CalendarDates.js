import React, { useEffect } from 'react';
import './CalendarDates.css';

export default function CalendarDates({ startDate, setStartDate, endDate, setEndDate, setDateErrors }) {
    
    useEffect(() => {
        // console.log(startDate, endDate)

    }, [startDate, endDate])

  return (
    <div className='dates-input-wrapper'>
        <div className='dates-input startDate'>
            <span className='check-inout-label'><label htmlFor='startDate'>CHECK-IN</label></span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
        </div>
        <div className='dates-input endDate'>
            <span className='check-inout-label'><label htmlFor='startDate'>CHECKOUT</label></span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
        </div>
    </div>
  )
}
