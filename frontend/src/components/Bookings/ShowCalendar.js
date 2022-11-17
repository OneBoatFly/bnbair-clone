import React, { useState, useEffect } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DayPickerRangeController } from 'react-dates';

import './ShowCalendar.css';

export default function ShowCalendar({ dates, setDates }) {
    const defaultFocusedInput = "startDate";
    const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
    const [numberOfMonths, setnumberOfMonths] = useState(1);
    
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
        <i className="fa-solid fa-chevron-left"></i>
    )

    const rightArrow = (
        <i className="fa-solid fa-chevron-right"></i>
    )

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
        />
    </div>
  )
}
