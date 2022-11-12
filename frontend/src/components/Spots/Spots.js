import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import './Spots.css';

import * as spotsActions from '../../store/spots';

export default function Spots({ spots }) {
    console.log('1. Spots component rendered')
    // const spots = useSelector(state => state.spots.allSpots);
    console.log('spots >>> ', spots)
    // const spotsFromStore = store.getState().allSpots;
    // console.log('spots from store getstate >>>', spotsFromStore)

    let spotsArr = [];
    if (spots) spotsArr = Object.values(spots);
    // console.log('spts array >>> ', spotsArr)
    // const dispatch = useDispatch();
    
    // const [userCoord, setUserCoord] = useState({});
    // navigator.geolocation.getCurrentPosition((location) => setUserCoord(location.coords))
    // console.log('userCoord', userCoord)
    // useEffect(() => {
    //     // dispatch(spotsActions.getAllSpots(userCoord));
    //     dispatch(spotsActions.getAllSpots());
    // }, [dispatch]);

  return (
    <div className='all-spots-wrapper'>
        <div className='all-spots-sub-wrapper'>
            {console.log('&&&&&&&&', spotsArr)}
            {
                spotsArr?.map(spot => {
                    const { previewImage, city, state, avgRating, price, id, distance } = spot;
                    return (
                        <NavLink key={id} to={`/spots/${id}`} className='link-wrapper'>
                            <div className='individual-spot-wrapper'>
                                <div className='image-div'>
                                    <img src={`${previewImage}`} alt='preview' />
                                </div>
                                <div className='short-info-wrapper'>
                                    <span className='cityState'>{city}, {state}</span>
                                    {/* {console.log(distance)} */}
                                    {!isNaN(distance) && <span style={{ color: '#717171'}}>{distance} miles away</span>}
                                    <span style={{ color: '#717171' }}><b>${price}</b> night</span>
                                    <span className='rating-wrapper'>
                                        <i className="fa-solid fa-star" />
                                        {/* {console.log(avgRating)} */}
                                        {avgRating ? <span>{avgRating.toFixed(1)}</span> : null }
                                    
                                    </span>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
            }
        </div>
    </div>
  )
}
