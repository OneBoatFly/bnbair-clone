import React, { useEffect, useState } from 'react';
import './WhereQuery.css';


export default function WhereQuery({ hasSubmitted, errors, setErrors, minLat, setMinLat, maxLat, setMaxLat, minLng, setMinLng, maxLng, setMaxLng }) {
    console.log('------------- WhereQuery --------------')
    const [location, setLocation] = useState('')

    const handleLocationChange = (e) => {
        console.log('handle location change')
        setLocation(e.target.value)
    }

    return (
        <div className='where-query-wrapper'>
            <div className='where-search-wrapper'>
                <label htmlFor='where-location'>
                    <div>Where</div>
                    <input type="text" id="where-location" placeholder="Search destinations" value={location} onChange={(e) => handleLocationChange(e)} />
                </label>
            </div>
            {/* {hasSubmitted && weekErrorsArr.map((err, idx) => {
                return (
                    <div key={idx} className='error-messages-wrapper'>
                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                        <span className='error-messages'>{err}</span>
                    </div>
                )
            })} */}
        </div>
    )
}
