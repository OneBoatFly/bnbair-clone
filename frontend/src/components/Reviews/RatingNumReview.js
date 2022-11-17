import React from 'react';
import './RatingNumReview.css';

export default function RatingNumReview({ spot, setShowReviewModal }) {
  return (
    <div>
        <i className="fa-solid fa-star" />
        {spot.avgStarRating && <span className='rating-span'>{spot.avgStarRating.toFixed(1)}</span>}
        <span> · </span>
        {setShowReviewModal ?
        <span onClick={() => setShowReviewModal(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }} className='number-of-review'>{spot.numReviews} reviews</span>
            :
            <span className='number-of-review'>{spot.numReviews} reviews</span>
        }
    </div>
  )
}
