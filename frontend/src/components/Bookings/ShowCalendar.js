import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';

import './ShowCalendar.css';
import { useSelector } from 'react-redux';

export default function ShowCalendar({ dates, setDates }) {
    const moment = extendMoment(Moment);

    const spotBookings = useSelector(state => state.spots.spotBookings);

    const defaultFocusedInput = "startDate";
    const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
    const [numberOfMonths, setnumberOfMonths] = useState(1);
    
    console.log('******** ShowCalendar Component ********', spotBookings)

    useEffect(() => {
        if (window.innerWidth < 1200) setnumberOfMonths(1);
        else setnumberOfMonths(2);

        const handleResize = (e) => {
            // console.log(e)
            // console.log(window.innerWidth)
            if (window.innerWidth < 1200) setnumberOfMonths(1);
            else setnumberOfMonths(2);
        }

        window.addEventListener('resize', handleResize);
        return () => document.removeEventListener("resize", handleResize);
    }, []);


    const handleDatesChange = (dates) => {
        setDates(dates);
    };

    const handleFocusChange = (focusedInput) => {
        setFocusedInput(focusedInput);
    };

    const leftArrow = (
        <i className="fa-solid fa-chevron-left in-calendar"></i>
    )

    const rightArrow = (
        <i className="fa-solid fa-chevron-right"></i>
    )

    const isDayBlocked = date => {
        let bookings = []
        let bookedRanges = [];
        let blocked;

        if (spotBookings) bookings = spotBookings;

        bookings.forEach(booking => {
            const range = moment.range(booking.startDate, booking.endDate)
            // console.log('-------range---------', range)

            bookedRanges.push(range)
        });
        
        blocked = bookedRanges.find(range => range.contains(date, { excludeEnd: true }))
        // console.log('---------day and isblocked? -------', date, blocked)
        return blocked;
        
    }

  return (
    <div className='calendar-datepicker-wrapper'>
        <DayPickerRangeController
            startDate={dates.startDate}
            endDate={dates.endDate}
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput || defaultFocusedInput}
            onFocusChange={handleFocusChange}
            numberOfMonths={numberOfMonths}
            minimumNights={1}
            noBorder={true}
            navPrev={leftArrow}
            navNext={rightArrow}
            isOutsideRange={day => isInclusivelyBeforeDay(day, moment())}
            isDayBlocked={isDayBlocked}
        />
    </div>
  )
}
