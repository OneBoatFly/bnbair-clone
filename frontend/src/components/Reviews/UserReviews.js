import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import * as spotReviewsActions from '../../store/spotReviews';
import './UserReviews.css';

export default function UserReviews({ isLoaded }) {
    console.log('isLoaded? ', isLoaded)
    const userReviews = useSelector(state => state.spotReviews.userAllReviews);
    let userReviewsArr = [];
    if (userReviews) userReviewsArr = Object.values(userReviews);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotReviewsActions.getUserReviews());
    }, [dispatch]);

    const handleDeleteReview = (e) => {
        console.log('handleDeleteReview')
        console.log(e.target)
        console.log(e.target.id);

        dispatch(spotReviewsActions.deleteReview(e.target.id));
    }

  return (
      <div className='all-reviews-wrapper'>
          <div className='all-reviews-sub-wrapper'>
              <h3>Past reviews you’ve written</h3>
              {
                  userReviewsArr?.map(review => {
                      const { previewImage, city, state, name } = review.Spot
                      return (
                        <div key={review.id} className='spot-image-spot-wrapper'>
                            <NavLink to={`/spots/${review.Spot.id}`} className='spot-image-user-reviews'>
                                <div className='image-div'>
                                    <img src={`${previewImage}`} alt='preview' />
                                </div>
                                {/* <span className='title'>{name}</span> */}
                            </NavLink>
                            <div className='review-buttons-wrapper'>
                                <div className='review-modify-buttons'>
                                    <button className='modify-buttons first' >Add images</button>
                                    <button className='modify-buttons' id={review.id} onClick={handleDeleteReview}>Delete</button>
                                </div>
                            </div>
                            <div key={review.id} className='single-reviews-wrapper my-reviews'>
                                {review.User && <span className='reviewer-name'>{review.User.firstName}</span>}
                                <span className='reviewer-date'>{review.updatedAt}</span>
                                <span className='reviewer-review' >{review.review}</span>
                            </div>
                        </div>
                      )
                  })
              }
          </div>
      </div>
  )
}
