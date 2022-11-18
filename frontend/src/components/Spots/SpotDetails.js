import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './SpotDetails.css';
import moment from 'moment';

import AddSpotImages from './AddSpotImages';
import SpotReviews from '../Reviews/SpotReviews';
import SpotReviewsModal from '../Reviews/SpotReviewsModal';
import AddReview from '../Reviews/AddReview';
import RatingNumReview from '../Reviews/RatingNumReview';
import CreateBooking from '../Bookings/CreateBooking';
import ShowCalendar from '../Bookings/ShowCalendar';
import ShowAllPhotos from './ShowAllPhotos';
import { Modal } from '../../context/Modal';
import { ModalWhole } from '../../context/ModalWhole';

import * as spotsActions from '../../store/spots';
import * as spotReviewsActions from '../../store/spotReviews';

import { getStartDateStr, getEndDateStr, getMMMDDYYYStr } from '../Spots/SpotCalcs/spotDates';

export default function SpotDetails() {
    // console.log('Spot Details Compoment')
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetails);
    // console.log('spot', spot)
    const spotReviews = useSelector(state => state.spotReviews.spotAllReviews);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);
    const [showAddImageForm, setShowAddImageForm] = useState(false);
    const [backendErrors, setBackendErrors] = useState('');
    const [showAllImages, setShowAllImages] = useState(false);

    const {spotId} = useParams();
    // console.log('---------- spotId', spotId)
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('-------------- dispatching getonespot')
        dispatch(spotsActions.getOneSpot(spotId))
            .then(() => {
                dispatch(spotReviewsActions.getSpotReviews(spotId));
            })
            .catch(() => {
                // console.log('!!!!!!', e.status)
                setBackendErrors('Listing not found.')
            })
    }, [dispatch]);
    
    // date related
    const startDateStr = getStartDateStr();
    const endDateStr = getEndDateStr();
    const [startDate, setStartDate] = useState(startDateStr);
    const [endDate, setEndDate] = useState(endDateStr);

    const [dates, setDates] = useState({ startDate: moment(startDateStr), endDate: moment(endDateStr) });
    const [dateErrors, setDateErrors] = useState({});

    const [totalDays, setTotayDays] = useState(1);

    useEffect(() => {
        if (dates.endDate <= dates.startDate) return; 
        setTotayDays((dates.endDate - dates.startDate) / 86400000);
        setStartDate(dates.startDate);
        setEndDate(dates.endDate)
    }, [dates])

    // date related end

  return (
    <div className='single-spot-wrapper'>
        {spot &&
            <div className='single-spot-sub-wrapper'>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h3>{spot.name}</h3>
                    <div style={{display:'flex', alignItems:'center', columnGap:'8px'}}>
                        <div className='review-modify-buttons' style={{ marginTop: '10px', border:'1px solid #222222', borderRadius: '8px', overflow: 'hidden' }} >
                            <button className='modify-buttons' onClick={() => setShowAddReviewForm(true)} >
                                <i className="fa-solid fa-plus" style={{ marginRight: '7px' }}></i>
                                <span>Add a review</span>
                            </button>
                        </div>
                        {sessionUser && spot.ownerId === sessionUser.id &&
                              <div className='review-modify-buttons' style={{ marginTop: '10px', border: '1px solid #222222', borderRadius: '8px', overflow: 'hidden' }} >
                                <button className='modify-buttons' onClick={() => setShowAddImageForm(true)} >
                                    <i className="fa-solid fa-plus" style={{ marginRight: '7px' }}></i>
                                    <span>Add images</span>
                                </button>
                            </div>  
                        }
                    </div>
                </div>
                <div className='title-div-wrapper'>
                    <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
                </div>

                <div className='pictures-div-wrapper'>
                    <div className='pictures-big'>
                        <div className='image-div'>
                            {spot.SpotImages[0] ? 
                                <img src={`${spot.SpotImages[0].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>
                            }
                        </div>
                    </div>
                    <div className='pictures-small'>
                        <div className='image-div'>
                            {spot.SpotImages[1] ? <img src={`${spot.SpotImages[1].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[2] ? <img src={`${spot.SpotImages[2].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[3] ? <img src={`${spot.SpotImages[3].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[4] ? <img src={`${spot.SpotImages[4].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                    </div>
                    <div className='review-modify-buttons show-all-images' style={{ marginTop: '10px', border: '1px solid #222222', borderRadius: '8px', overflow: 'hidden' }} >
                        <button className='modify-buttons' onClick={() => setShowAllImages(true)} style={{color: '#222222'}} >
                            <i className="fa-solid fa-ellipsis-vertical"></i><i className="fa-solid fa-ellipsis-vertical"></i><i className="fa-solid fa-ellipsis-vertical last-dots"></i>
                            <span>Show all photos</span>
                        </button>
                    </div>
                    {showAllImages &&
                        <ModalWhole>
                            <ShowAllPhotos spotImages={spot.SpotImages} setShowAllImages={setShowAllImages} />
                        </ModalWhole>
                    }
                </div>

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
                            <h4>{totalDays} nights in {spot.city}</h4>
                            <div className='date-calendar-span'>
                                <span>{`${getMMMDDYYYStr(startDate)}`} - {`${getMMMDDYYYStr(endDate)}`}</span>
                            </div>
                              <ShowCalendar dates={dates} setDates={setDates} setDateErrors={setDateErrors} />
                        </div>
                    </div>
                    <div className='booking-form-wrapper'>
                        <div className='booking-form-sub-wrapper'>
                            <div className='booking-form'>
                                  <CreateBooking spot={spot} setShowReviewModal={setShowReviewModal} dates={dates} setDates={setDates} setEndDate={setEndDate} setDateErrors={setDateErrors} totalDays={totalDays} />
                            </div>
                            <div>
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reviews-wrapper'>
                    <div className='reviews-sub-wrapper'>
                        <h4>
                            <RatingNumReview spot={spot} />
                        </h4>
                    </div>
                    <SpotReviews spotReviews={spotReviews}/>
                </div>
            </div>          
        }
        {backendErrors.length > 0 &&
            <div className='page-not-found-wrapper'>
                <div>
                    <h3>This listing is not found.</h3>
                    <span>Back to <NavLink to='/'>home page</NavLink>.</span>
                </div>
                <div>
                    <img src='https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif' alt='page-not-found'></img>
                </div>
            </div>
        }
        {showReviewModal && (
            <Modal onClose={() => setShowReviewModal(false)} >
                <SpotReviewsModal setShowReviewModal={setShowReviewModal} />
            </Modal>
        )}
        {showAddReviewForm &&
            <Modal onClose={() => setShowAddReviewForm(false)}>
                <AddReview setShowAddReviewForm={setShowAddReviewForm} spotId={spotId} />
            </Modal>
        }
        {showAddImageForm &&
            <Modal onClose={() => setShowAddImageForm(false)}>
                <AddSpotImages setShowAddImageForm={setShowAddImageForm} spotId={spotId} />
            </Modal>
        }
    </div>
  )
}
