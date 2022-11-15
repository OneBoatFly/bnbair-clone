import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './SpotDetails.css';

// import AddSpotImages from './AddSpotImages';
import SpotReviews from '../Reviews/SpotReviews';
import SpotReviewsModal from '../Reviews/SpotReviewsModal';
import {Modal} from '../../context/Modal';

import * as spotsActions from '../../store/spots';

export default function SpotDetails() {
    // console.log('Spot Details Compoment')
    const spot = useSelector(state => state.spots.spotDetails);
    // const sessionUser = useSelector(state => state.session.user);

    const [showReviewModal, setShowReviewModal] = useState(false);

    const {spotId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId));
    }, [dispatch]);

  return (
    <div className='single-spot-wrapper'>
        {spot &&
            <div className='single-spot-sub-wrapper'>
                <div><h3>{spot.name}</h3></div>
                <div className='title-div-wrapper'>
                    <i className="fa-solid fa-star" />
                    {spot.avgStarRating && <span className='rating-span'>{spot.avgStarRating.toFixed(1)}</span>}
                    <span> · </span>
                    <span onClick={() => setShowReviewModal(true)} style={{textDecoration:'underline', cursor: 'pointer'}}>{spot.numReviews} reviews</span>
                </div>
                {spot.SpotImages.length > 0 ?
                    <div className='pictures-div-wrapper'>
                        <div className='pictures-big'>
                            <div className='image-div'>
                                {spot.SpotImages[0] && <img src={`${spot.SpotImages[0].url}`} alt='room'></img>}
                            </div>
                        </div>
                        <div className='pictures-small'>
                            <div className='image-div'>
                                {spot.SpotImages[1] && <img src={`${spot.SpotImages[1].url}`} alt='room'></img>}
                            </div>
                            <div className='image-div'>
                                {spot.SpotImages[2] && <img src={`${spot.SpotImages[2].url}`} alt='room'></img>}
                            </div>
                            <div className='image-div'>
                                {spot.SpotImages[3] && <img src={`${spot.SpotImages[3].url}`} alt='room'></img>}
                            </div>
                            <div className='image-div'>
                                {spot.SpotImages[4] && <img src={`${spot.SpotImages[4].url}`} alt='room'></img>}
                            </div>
                        </div>
                    </div> : <div>This listing has no image.</div>
                }

                {/* {spot.ownerId === sessionUser.id && 
                    <AddSpotImages spotid={spotId} />
                } */}
                <div className='info-booking-wrapper'>
                    <div className='spot-info-wrapper'>
                        <div className='hostName'>{spot.Owner && <h4>Hosted by {spot.Owner.firstName}</h4>}</div>
                        <div className='info-detail-wrapper'>
                            <div>
                                <img className='aircover-img' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' alt='aircover'></img>
                            </div>
                            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>
                        <div className='info-detail-wrapper'>
                            <p>{spot.description}</p>
                        </div>
                        <div className='info-detail-wrapper'>
                            <h4>5 nights in {spot.city}</h4>
                            <div className='date-calendar-wrapper'>placeholder for date and calendar
                                <span>placeholder for dates</span>
                                <div>
                                    placeholder for calendar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='booking-form-wrapper'>
                        <div className='booking-form-sub-wrapper'>
                            <div className='booking-form'>
                                placholder for booking
                            </div>
                            <div>
                                <p>
                                    Good price.Your dates are $392 less than the avg. nightly rate over the last 3 months.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reviews-wrapper'>
                    <div className='reviews-sub-wrapper'>
                        <h4>
                            <div className='review-title-wrapper'>
                                <i className="fa-solid fa-star" />
                                {spot.avgStarRating && <span className='rating-span'>{spot.avgStarRating.toFixed(1)}</span>}
                                <span> · </span>
                                <span>{spot.numReviews} reviews</span>
                            </div>
                        </h4>
                    </div>
                    <SpotReviews spotId={spot.id}/>
                </div>
            </div>          
        }
        {showReviewModal && (
            <Modal onClose={() => setShowReviewModal(false)} >
                <SpotReviewsModal setShowReviewModal={setShowReviewModal} />
            </Modal>
        )}  
    </div>
  )
}
