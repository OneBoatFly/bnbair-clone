import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import * as spotReviewsActions from '../../store/spotReviews';
import MyButton from '../FormElements/MyButton';
import './AddReview.css';

export default function AddReview({ spotId, setShowAddReviewForm }) {
    // console.log(spotId);
    // const userReviews = useSelector(state => state.spotReviews.userAllReviews);
    // userReviews []

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [starsError, setStarsError] = useState('');
    const [errors, setErrors] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (!review.length) setReviewError('Review is required.');
        else if (review.length > 255) setReviewError('Please provide review with less than 255 characters.');
        else setReviewError('');

        if (!stars.length) setStarsError('Rating is required.');
        else if (stars < 1 || stars > 5 || !Number.isInteger(parseInt(stars, 10))) setStarsError("Stars must be an integer from 1 to 5");
        else setStarsError('');

    }, [review, stars]);
    
    const dispatch = useDispatch();
    const handleAddReview = (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (reviewError || starsError) {
            // console.log('has errors, returned')
            // console.log('reviewError', reviewError)
            // console.log('starsError', starsError)
            return;
        }

        dispatch(spotReviewsActions.addUserReview(spotId, {review, stars}))
            .then(() => {
                // console.log('review added successfully ---', newReview)
                // setPage(1)
                setHasSubmitted(false);
                setShowAddReviewForm(false);
            })
            .catch(async (response) => {
                const e = await response.json();
                // console.log('review add errors ---', e.message)
                setErrors(e.message);
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
                        <div className='login errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                            {
                                hasSubmitted && reviewError.length > 0 && (
                                    <div className='error-messages-wrapper'>
                                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                        <span className='error-messages'>{reviewError}</span>
                                    </div>
                                )
                            }
                        </div>                    
                    </div>
                    <div className='add-review-sub second'>
                        <div className='select-rating-wrapper'>
                            {/* <label htmlFor='stars'>Rating</label> */}
                            <select value={stars} onChange={(e) => setStars(e.target.value)}>
                                <option value='' disabled>Please selecting a rating...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className='errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                            {
                                hasSubmitted && starsError.length > 0 && (
                                    <div className='error-messages-wrapper'>
                                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                        <span className='error-messages'>{starsError}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <MyButton name={'Add review'} />
                    <div className='errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                        {
                            hasSubmitted && errors.length > 0 && (
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errors}</span>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
