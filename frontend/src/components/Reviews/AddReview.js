import React, { startTransition, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import * as spotReviewsActions from '../../store/spotReviews';

import MyButton from '../FormElements/MyButton';

export default function AddReview({spotId, setShowAddReviewForm}) {
    console.log(spotId);
    // const userReviews = useSelector(state => state.spotReviews.userAllReviews);
    // userReviews []

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [reviewError, setReviewError] = useState('');
    const [starsError, setStarsError] = useState('');
    const [errors, setErrors] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (!review.length) setReviewError('Review is required.');
        else if (review.length > 255) setReviewError('Please provide a first name with less than 255 characters.');
        else setReviewError('');

        if (!stars.length) setStarsError('Rating is required.');
        else if (stars < 1 || startTransition > 5 || !Number.isInteger(parseInt(stars, 10))) setStarsError("Stars must be an integer from 1 to 5");
        else setStarsError('');

    }, [review, stars]);
    
    const dispatch = useDispatch();
    const handleAddReview = (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (reviewError || starsError) {
            console.log('has errors, returned')
            console.log('reviewError', reviewError)
            console.log('starsError', starsError)
            return;
        }

        dispatch(spotReviewsActions.addUserReview(spotId, {review, stars}))
            .then((review) => {
                setHasSubmitted(false);
                setShowAddReviewForm(false);
            })
            .catch((message) => {
                setErrors(message);
            })
    }

    return (
        <div className='add-review-modal'>
            <div className='login exit-button-wrapper'>
                <div className='login exit-button-div' onClick={() => setShowAddReviewForm(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className='add-review-wrapper'>
                <form onSubmit={handleAddReview}>
                    <div className='add-review-sub' >
                        <div className='content-wrapper'>
                            <label htmlFor='review'>Your review</label>
                            <textarea id="review" placeholder='An awesone place' value={review} onChange={(e) => setReview(e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div className='login errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                        {
                            hasSubmitted && reviewError.length > 0 && (<span className='error-messages'>{reviewError}</span>)
                        }
                    </div>                    
                    <div className='add-review-sub'>
                        <div className='rating-wrapper'>
                            <label htmlFor='stars'>Rating</label>
                            <select value={stars} onChange={(e) => setStars(e.target.value)}>
                                <option value=''>Please selecting a rating...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className='errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                        {
                            hasSubmitted && starsError.length > 0 && (<span className='error-messages'>{starsError}</span>)
                        }
                    </div>
                    <MyButton name={'Add review'} />
                    <div className='errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                        {
                            hasSubmitted && errors.length > 0 && (<span className='error-messages'>{errors}</span>)
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
