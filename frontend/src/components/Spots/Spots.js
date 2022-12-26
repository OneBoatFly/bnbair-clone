import React, { useState, useEffect, useRef, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Spots.css';
// import * as spotsActions from '../../store/spots';

import useSearchFetch from '../Navigation/useSearchFetch';
import coordinatesDistance from './SpotCalcs/spotDistance';

export default function Spots({ query, setQuery }) {
    const spots = useSelector(state => state.spots.allSpots);
    const userLocation = useSelector(state => state.session.userLocation);

    // infinite scroll
    const pagination = useSelector(state => state.spots.pagination);

    let hasMore = false;
    if (pagination) hasMore = pagination.spotsFound - pagination.page * pagination.size > 0;

    const [page, setPage] = useState(1);
    
    const { loading, getSpotsErrors } = useSearchFetch(query);

    useEffect(() => {
        setQuery((query => {
            const newQuery = { ...query };
            newQuery.size = page * 20;
            return newQuery;
        }))
    }, [page])

    const observer = useRef();
    const lastSpotElementRef = useCallback(node => {
        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })

        if (node) {
            observer.current.observe(node)
        }

    }, [loading, hasMore])

  // end of infinite scroll setting

    let spotsArr = [];
    if (spots) spotsArr = Object.values(spots);

    let getSpotErrorsArr = [];
    if (getSpotErrorsArr) getSpotErrorsArr = Object.values(getSpotErrorsArr);

    const successGeo = (position) => {
        console.log(position)
    }

    const errorGeo = (error) => {
        console.log(error);
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 3000,
    }

    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, options)

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
                    const { previewImage, city, state, avgRating, price, id, lat, lng, weekPast } = spot;
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
                                        {distance !== 'NaN' ? <span className="distance-dates">{distance} miles away</span> : <span className="distance-dates-noDistance">1 click away</span>}
                                        <span className="distance-dates">Added {weekPast} week ago</span>
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
                                        {distance !== 'NaN' ? <span className="distance-dates">{distance} miles away</span> : <span className="distance-dates-noDistance">1 click away</span>}
                                        <span className="distance-dates">Added {weekPast} week{weekPast > 1 ? 's' : ''} ago</span>
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
