import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import * as spotReviewsActions from '../../store/spotReviews';
import './UserReviews.css';

export default function UserReviews({ isLoaded }) {
    // console.log('isLoaded? ', isLoaded)
    const userReviews = useSelector(state => state.spotReviews.userAllReviews);
    let userReviewsArr = [];
    if (userReviews) userReviewsArr = Object.values(userReviews);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotReviewsActions.getUserReviews());
    }, [dispatch]);

    const handleDeleteReview = (e) => {
        // console.log('handleDeleteReview')
        // console.log(e.currentTarget)
        // console.log(e.currentTarget.id);

        dispatch(spotReviewsActions.deleteReview(e.currentTarget.id));
    }

  return (
      <div className='all-reviews-wrapper'>
          <div className='all-reviews-sub-wrapper'>
            <div className='all-reviews-header-wrapper'>
              <h4>Past reviews you’ve written</h4>
                {/* <div className='review-modify-buttons'>
                      <button className='modify-buttons' onClick={() => setShowAddReviewForm(true)}><i class="fa-solid fa-plus" style={{marginRight:'7px'}}></i><span>Add a review</span></button>
                </div> */}
            </div>
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
                            {/* <div className='review-buttons-wrapper'>
                                <div className='review-modify-buttons'>
                                    <button className='modify-buttons first' disabled >Add images</button>
                                    
                                </div>
                            </div> */}
                            <div key={review.id} className='single-reviews-wrapper my-reviews'>
                                {review.User && <span className='reviewer-name'>{review.User.firstName}</span>}
                                <span className='reviewer-date'>{review.updatedAt}</span>
                                <span className='reviewer-review' >{review.review}</span>
                            </div>
                            <div>
                                  <button className='review-delete' id={review.id} onClick={handleDeleteReview}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                      )
                  })
              }
          </div>
      </div>
  )
}
