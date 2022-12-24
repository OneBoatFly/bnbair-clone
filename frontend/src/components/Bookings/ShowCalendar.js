import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

import './ShowCalendar.css';
import { useSelector } from 'react-redux';

export default function ShowCalendar({ dates, setDates }) {
    console.log('******** ShowCalendar Component ********')
    const moment = extendMoment(Moment);

    const spotBookings = useSelector(state => state.spots.spotBookings);

    const defaultFocusedInput = "startDate";
    const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
    const [numberOfMonths, setnumberOfMonths] = useState(1);
    const [futureBookedRanges, setFutureBookedRanges] = useState([]);
    const [cutoffDate, setCutoffDate] = useState(moment().add(6, 'M'));
    

    // create event listener on window with to set months
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

    // set bookedRanges
    useEffect(() => {
        const booked = [];
        const today = moment();
        if (spotBookings) {
            spotBookings.forEach(booking => {
                const range = moment.range(booking.startDate, booking.endDate)
                if (range.end > today) booked.push(range)
            });
        }

        booked.sort((b1, b2) => b1.start - b2.start);

        setFutureBookedRanges(booked)
    }, [spotBookings])


    const handleDatesChange = (dates) => {
        console.log('handleDatesChange', dates)
        console.log(dates.endDate, dates.startDate)
        setDates(dates);

        // when dates.endDate is null
        // that means a start date is selected and need to check if any future dates should be marked as invalid
        if (!dates.endDate) {
            console.log('logic to set cutoff date')
            console.log(futureBookedRanges)
            let newCutoffDate = dates.startDate;
            for (let booking of futureBookedRanges) {
                console.log('comparing booking and newCutoffDate')
                console.log(booking.start)
                console.log(newCutoffDate)
                if (booking.start >= newCutoffDate) {
                    newCutoffDate = booking.start;
                    break;
                }
            }

            setCutoffDate(newCutoffDate);
        } else {
            setCutoffDate(moment().add(6, 'M'))
        }
    };

    const handleFocusChange = (focusedInput) => {
        console.log('handleFocusChange', focusedInput)
        setFocusedInput(focusedInput);
    };

    const leftArrow = (
        <i className="fa-solid fa-chevron-left in-calendar"></i>
    )

    const rightArrow = (
        <i className="fa-solid fa-chevron-right"></i>
    )

    const isDayBlocked = (date) => {
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

    console.log('futureBookedRanges', futureBookedRanges)
    console.log('cutoffDate', cutoffDate.format("YYYY-MM-DD"))
    // console.log('startDate', dates.startDate)
    // console.log('endDate', dates.endDate)

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
            isOutsideRange={date => isInclusivelyBeforeDay(date, moment()) || isInclusivelyAfterDay(date, cutoffDate)}
            isDayBlocked={isDayBlocked}
        />
    </div>
  )
}
