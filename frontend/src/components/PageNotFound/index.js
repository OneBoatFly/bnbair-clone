import React from 'react'
import { NavLink } from 'react-router-dom';
import './index.css'

export default function PageNotFound() {
  return (
    <div className='page-not-found-wrapper'>
        <div>
            <h1>Oops!</h1>
            <h2>We can't seem to find the page you're looking for.</h2>
            <h6>Error code: 404</h6>
            <span>Back to <NavLink to='/'>home page</NavLink>.</span>
        </div>
        <div>
            <img src='https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif' alt='page-not-found'></img>
        </div>
    </div>
  )
}
