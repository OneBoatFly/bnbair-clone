import React, {useEffect, useState} from 'react'
import './SpotReviews.css';
import {useSelector, useDispatch} from 'react-redux';

import * as spotImagesActions from '../../store/spotReviews';

export default function SpotReviews({spotId}) {
  console.log(spotId);
  const spotReviews = useSelector(state => state.spotReviews.spotAllReviews);
  // spotReviews []

  const [showAllReviews, setShowAllReviews] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotImagesActions.getSpotReviews(spotId));
  }, [dispatch]);

  return (
    <>
      <div className='spot-reviews-wrapper'>
        {
          spotReviews?.map((review, idx) => {
            if (idx < 3) {
              return (
                <div key={review.id} className='single-reviews-wrapper'>
                  {review.User && <span className='reviewer-name'>{review.User.firstName}</span>}
                  <span className='reviewer-date'>{review.updatedAt}</span>
                  <span className='reviewer-review' >{review.review}</span>
                </div>
              )
            } else {
              return (
                showAllReviews && 
                <div key={review.id} className='single-reviews-wrapper'>
                  {review.User && <span className='reviewer-name'>{review.User.firstName}</span>}
                  <span className='reviewer-date'>{review.updatedAt}</span>
                  <span className='reviewer-review'>{review.review}</span>
                </div>
              )
            }
          })
        }
      </div>
      {
        spotReviews?.length > 3 &&
        <button onClick={() => setShowAllReviews((curr) => !curr)} className='modify-buttons single-button'>
          <span>{showAllReviews ? 'Hide' : 'Show'} all {spotReviews.length} reviews</span>
        </button>
      }
    </>
  )
}
