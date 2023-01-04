import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSpotBookings } from '../../store/bookings';
import FutureReservations from './FutureReservations';
import PastReservations from './PastReservations';
// import PastReservations from './PastReservations';
import './Reservations.css';

export default function Reservations() {
    // console.log('-----------Reservations Component-------------')
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotFutureBookings = useSelector(state => state.bookings.spotFutureBookings)
    const spotPastBookings = useSelector(state => state.bookings.spotPastBookings)

    useEffect(() => {
        dispatch(getSpotBookings(spotId))
            .then((bookings) => {
                console.log('success', bookings)
            })
            .catch(async (data) => {
                const error = await data.json()
            })
    }, [])

    return (
        <div className='all-bookings-wrapper'>
            <div className='all-bookings-sub-wrapper'>
                <div className='all-bookings-header-wrapper'>
                    {(spotFutureBookings.length > 0 || spotPastBookings > 0) ? <h4>Reservations</h4> : <h4>You have no reservations</h4>}
                </div>
            </div>
            <FutureReservations spotFutureBookings={spotFutureBookings} />
            <PastReservations spotPastBookings={spotPastBookings} />
        </div>
    )
}
