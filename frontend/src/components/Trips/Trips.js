import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../../store/bookings'
import FutureTrips from './FutureTrips';
import PastTrips from './PastTrips';
import './Trips.css';

export default function Trips() {
    // console.log('-----------Trips Component-------------')
    const dispatch = useDispatch()
    const userFutureBookings = useSelector(state => state.bookings.userFutureBookings)
    const userPastBookings = useSelector(state => state.bookings.userPastBookings)

    useEffect(() => {
        dispatch(getUserBookings())
            .then((bookings) => {
                // console.log('success', bookings)
            })
            .catch(async (data) => {
                const error = await data.json()
            })
    }, [])

  return (
      <div className='all-bookings-wrapper'>
          <div className='all-bookings-sub-wrapper'>
              <div className='all-bookings-header-wrapper'>
                  {(userFutureBookings.length > 0 || userPastBookings > 0) ? <h4>Trips</h4> : <h4>You have no trips</h4>}
              </div>
          </div>
          <FutureTrips userFutureBookings={userFutureBookings}/>
          <PastTrips userPastBookings={userPastBookings} />
      </div>
  )
}
