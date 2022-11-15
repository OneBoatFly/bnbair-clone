import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import * as spotReviewsActions from '../../store/spotReviews';

export default function UserReviews({ isLoaded }) {
    const userReviews = useSelector(state => state.spotReviews.userAllReviews);
    let userReviewsArr = [];
    if (userReviews) userReviewsArr = Object.values(userReviews);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotReviewsActions.getUserReviews());
    }, [dispatch]);

    if (!isLoaded) {
        return (
            <Redirect to='/' />
        )
    }

  return (
      <div className='all-reviews-wrapper'>
          <div className='all-reviews-sub-wrapper'>
              {
                  userReviewsArr?.map(review => {
                      const { previewImage, city, state } = review.Spot
                      return (
                        <div key={review.id} className='individual-spot-wrapper'>
                        <NavLink to={`/spots/${review.Spot.id}`} className='link-wrapper'>
                            <div className='image-div'>
                                <img src={`${previewImage}`} alt='preview' />
                            </div>
                            <div className='short-info-wrapper'>
                                <span className='cityState'>{city}, {state}</span>
                            </div>
                        </NavLink>
                        <div></div>
                        </div>
                      )
                  })
              }
          </div>
      </div>
  )
}
