import React, {useState} from 'react'
import './SpotReviews.css';

export default function SpotReviews({ spotReviews }) {
  console.log('SpotReviews', spotReviews);
  // spotReviews []

  const [showAllReviews, setShowAllReviews] = useState(false);

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
