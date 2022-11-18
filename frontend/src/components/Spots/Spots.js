import React, { useState, useEffect, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Spots.css';
import * as spotsActions from '../../store/spots';

import coordinatesDistance from './SpotCalcs/spotDistance';

export default function Spots({ lastSpotElementRef }) {
    const spots = useSelector(state => state.spots.allSpots);
    const userLocation = useSelector(state => state.session.userLocation);
    // console.log('&&&',userLocation)

    let spotsArr = [];
    if (spots) spotsArr = Object.values(spots);

    let getSpotErrorsArr = [];
    if (getSpotErrorsArr) getSpotErrorsArr = Object.values(getSpotErrorsArr);
  return (
    <div className='all-spots-wrapper'>
        <div>
            {getSpotErrorsArr?.map(error => {
                return (
                    <div className='error-messages-wrapper'>
                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                        <span className='error-messages'>{error}</span>
                    </div>
                )
            })}
        </div>
        <div className='all-spots-sub-wrapper'>
            {
                spotsArr?.map((spot, idx) => {
                    const { previewImage, city, state, avgRating, price, id, lat, lng, createdAt } = spot;
                    const nf = new Intl.NumberFormat();
                    let distance = nf.format(coordinatesDistance(lat, lng, userLocation.lat, userLocation.lng));
                    // console.log(city, state, typeof distance, distance)
                    const priceFormatted = nf.format(price);
                    if (spotsArr.length === idx + 1) {
                        return (
                            <NavLink ref={lastSpotElementRef} key={id} to={`/spots/${id}`} className='link-wrapper'>
                                <div className='individual-spot-wrapper'>
                                    <div className='image-div'>
                                        <img src={`${previewImage}`} alt='preview' />
                                    </div>
                                    <div className='short-info-wrapper'>
                                        <span className='cityState'>{city}, {state}</span>
                                        {distance !== 'NaN' ? <span className="distance-dates">{distance} miles away</span> : <span className="distance-dates-noDistance">...loading</span>}
                                        <span className="distance-dates">Listed in {createdAt}</span>
                                        <span className="priceNight" ><span style={{ fontWeight: '500' }}>${priceFormatted}</span> night</span>
                                        <span className='rating-wrapper'>
                                            <i className="fa-solid fa-star" />
                                            {/* {console.log(avgRating)} */}
                                            {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    } else {
                        return (
                            <NavLink key={id} to={`/spots/${id}`} className='link-wrapper'>
                                <div className='individual-spot-wrapper'>
                                    <div className='image-div'>
                                        <img src={`${previewImage}`} alt='preview' />
                                    </div>
                                    <div className='short-info-wrapper'>
                                        <span className='cityState'>{city}, {state}</span>
                                        {distance !== 'NaN' ? <span className="distance-dates">{distance} miles away</span> : <span className="distance-dates-noDistance">...loading</span>}
                                        <span className="distance-dates">Listed in {createdAt}</span>
                                        <span className="priceNight" ><span style={{ fontWeight: '500' }}>${priceFormatted}</span> night</span>
                                        <span className='rating-wrapper'>
                                            <i className="fa-solid fa-star" />
                                            {/* {console.log(avgRating)} */}
                                            {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    }
                })
            }
        </div>
    </div>
  )
}
