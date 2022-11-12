import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './Spots.css';

import * as spotsActions from '../../store/spots';

export default function SpotDetails() {
    const spot = useSelector(state => state.spots.spotDetails);
    const {spotId} = useParams();
    // console.log(spotId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId));
    }, [dispatch]);

  return (
    <div className='single-spot-wrapper'>
        <div className='single-spot-sub-wrapper'>
            <div><h3>{spot.name}</h3></div>
            <div className='title-div-wrapper'>
                <i className="fa-solid fa-star" />
                {console.log("rating---------", spot.avgStarRating)}
                {spot.avgStarRating && <span>{spot.avgStarRating.toFixed(1)}</span>}
                <span> · </span>
                <NavLink to=''><span>{spot.numReviews} reviews</span></NavLink>
            </div>
            <div className='pictures-div-wrapper'>
                <div>
                    <div className='pictures-big'>
                        {spot.SpotImages[0] && <img src={`${spot.SpotImages[0].url}`} alt='room'></img>}
                    </div>
                    <div className='pictures-small'>
                        {spot.SpotImages[1] && <img src={`${spot.SpotImages[1].url}`} alt='room'></img>}
                        {spot.SpotImages[2] && <img src={`${spot.SpotImages[2].url}`} alt='room'></img>}
                        {spot.SpotImages[3] && <img src={`${spot.SpotImages[3].url}`} alt='room'></img>}
                        {spot.SpotImages[4] && <img src={`${spot.SpotImages[4].url}`} alt='room'></img>}
                    </div>
                </div>
            </div>
            <div className='spot-info-wrapper'>
                <div>{spot.Owner && <h4>Hosted by {spot.Owner.firstName}</h4>}</div>
                <div>
                    <div>air cover logo</div>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                </div>
                <div>
                    <p>{spot.description}</p>
                </div>
                <div>
                    <h4>5 nights in {spot.city}</h4>
                    <span>placeholder for dates</span>
                    <div>
                        placeholder for calendar
                    </div>
                </div>
            </div>
            <div className='reviews'>
                placeholder for reviews
            </div>
        </div>
    </div>
  )
}
