import React, {useEffect, useState} from 'react'
import './SpotReviews.css';
import './SpotReviewsModal.css';
import {useSelector, useDispatch} from 'react-redux';

import * as spotReviewsActions from '../../store/spotReviews';

export default function SpotReviewsModal({ spotId, setShowReviewModal }) {
  // console.log(spotId);
  const spotReviews = useSelector(state => state.spotReviews.spotAllReviews);
  // spotReviews []

  const dispatch = useDispatch();
  useEffect(() => {
    if (spotId) dispatch(spotReviewsActions.getSpotReviews(spotId));
  }, [dispatch]);

  return (
    <div className='spot-reviews-modal'>
      <div className='login exit-button-wrapper'>
        <div className='login exit-button-div' onClick={() => setShowReviewModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>      
      <div className='spot-reviews-wrapper'>
        {
          spotReviews?.map((review, idx) => {
            return (
              <div key={review.id} className='single-reviews-wrapper'>
                {review.User && <span className='reviewer-name'>{review.User.firstName}</span>}
                <span className='reviewer-date'>{review.updatedAt}</span>
                <span className='reviewer-review'>{review.review}</span>
              </div>
            )
          })
        }
        {spotReviews.length === 0 && <span className='reviewer-date'>This listing has no reviews.</span>}
      </div>
    </div>
  )
}
