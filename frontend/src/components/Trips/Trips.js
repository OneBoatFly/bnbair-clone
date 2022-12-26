import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../../store/bookings'
import FutureTrips from './FutureTrips';
import './Trips.css';

export default function Trips() {
    console.log('-----------Trips Component-------------')
    const dispatch = useDispatch()
    const useFutureBookings = useSelector(state => state.bookings.useFutureBookings)
    const usePastBookings = useSelector(state => state.bookings.usePastBookings)

    useEffect(() => {
        dispatch(getUserBookings())
            .then((bookings) => {
                // console.log('success', bookings)
            })
            .catch(async (data) => {
                const error = await data.json()
                // console.log('error', error)
            })
    }, [])

  return (
      <div className='all-bookings-wrapper'>
          <div className='all-bookings-sub-wrapper'>
              <div className='all-bookings-header-wrapper'>
                  {(useFutureBookings.length > 0 || usePastBookings > 0) ? <h4>Trips</h4> : <h4>You have no trips</h4>}
              </div>
          </div>
          <FutureTrips useFutureBookings={useFutureBookings}/>
      </div>
  )
}
