import React, { useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import './OwnerSpots.css';

export default function OwnerSpots({ isLoaded }) {
  const ownerSpots = useSelector(state => state.spots.ownerSpots);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getOwnerSpots());
  }, [dispatch]);

  if (!isLoaded) {
    return (
        <Redirect to = '/' />
      )
  }

  let ownerSpotsArr = [];
  if (ownerSpots) ownerSpotsArr = Object.values(ownerSpots);

  return (
    <div className='all-spots-wrapper'>
      <div className='all-spots-sub-wrapper'>
        {
          ownerSpotsArr?.map(spot => {
            const { previewImage, city, state, avgRating, price, id } = spot;
            return (
              <div key={id} className='owner-spots-wrapper'>
                <NavLink to={`/spots/${id}`} className='link-wrapper'>
                  <div className='individual-spot-wrapper'>
                    <div className='image-div'>
                      <img src={`${previewImage}`} alt='preview' />
                    </div>
                    <div className='short-info-wrapper'>
                      <span className='cityState'>{city}, {state}</span>
                      <span style={{ color: '#717171' }}><b>${price}</b> night</span>
                      <span className='rating-wrapper'>
                        <i className="fa-solid fa-star" />
                        {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
                      </span>
                    </div>
                  </div>
                </NavLink>
                <div className='modify-button-div'><button className='modify-buttons'>Update</button></div>
                <div className='modify-button-div'><button className='modify-buttons'>Delete</button></div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
