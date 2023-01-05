import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './SpotDetails.css';
import moment from 'moment';

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

import { getMMMDDYYYStr } from '../Spots/SpotCalcs/spotDates';
import CreateBookingMobile from '../Bookings/CreateBookingMobile';
import SpotMapContainer from '../Maps/SpotMapContainer';
import SpotDetailHostLoc from './SpotDetailHostLoc';
import SpotDetailSuperhostLogo from './SpotDetailSuperhostLogo';
import SpotDetailRooms from './SpotDetailRooms';
import SpotDetailHighlight from './SpotDetailHighlight';

export default function SpotDetails() {
    // console.log('Spot Details Compoment')
    // console.log('spot', spot)

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetails);
    const spotReviews = useSelector(state => state.spotReviews.spotAllReviews);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);
    const [backendErrors, setBackendErrors] = useState('');
    const [showAllImages, setShowAllImages] = useState(false);

    const {spotId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('-------------- dispatching getonespot')
        dispatch(spotsActions.getOneSpot(spotId))
            .then((spot) => {
                dispatch(spotsActions.getSpotBookings(spotId));
                dispatch(spotReviewsActions.getSpotReviews(spotId));
            })
            .catch(() => {
                setBackendErrors('Listing not found.')
            })

        return () => {
            setBackendErrors('')
            dispatch(spotsActions.unloadOneSpot());
        }
    }, [dispatch]);
    
    // date related
    const [dates, setDates] = useState({ startDate: moment(), endDate: moment() });
    const [dateErrors, setDateErrors] = useState({});
    const [totalDays, setTotayDays] = useState(1);

    useEffect(() => {
        if (!spot) return;
        setDates({
            startDate: moment(spot.firstAvailableStart), 
            endDate: moment(spot.firstAvailableEnd)
        })

        return () => {
            setDates({});
        }
    }, [spot])

    useEffect(() => {
        if (dates.endDate <= dates.startDate) return; 
        setTotayDays(Math.round((dates.endDate - dates.startDate) / 86400000));

        return () => {
            setTotayDays(1);
        }
    }, [dates])

    // date related end

  return (
    <div className='single-spot-wrapper'>
        {spot &&
            <div className='single-spot-sub-wrapper'>
                <div className='signle-spot-header-wrapper'>
                    <h3>{spot.name}</h3>
                    <div style={{display:'flex', alignItems:'center', columnGap:'8px'}}>
                        {sessionUser && <div className='review-modify-buttons' style={{ marginTop: '10px', border:'1px solid #222222', borderRadius: '8px', overflow: 'hidden' }} >
                            <button className='modify-buttons' onClick={() => setShowAddReviewForm(true)} >
                                <i className="fa-solid fa-plus" style={{ marginRight: '7px' }}></i>
                                <span>Add a review</span>
                            </button>
                        </div>}
                    </div>
                </div>
                <div className='title-div-wrapper'>
                    <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
                    <SpotDetailHostLoc spot={spot} />
                </div>

                {spot.SpotImages && 
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
                        <div className='pictures-single-mobile'>
                              <div className='image-div-mobile'>
                                  {spot.SpotImages[0] ?
                                      <img src={`${spot.SpotImages[0].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>
                                  }
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
                }

                <div className='signle-spot-header-wrapper-mobile'>
                    <h3>{spot.name}</h3>
                </div>
                <div className='title-div-wrapper-mobile'>
                    <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
                    <SpotDetailHostLoc spot={spot} />
                </div>

                <div className='info-booking-wrapper'>
                    <div className='spot-info-wrapper'>
                        {spot.Owner && 
                            <div className='hostName'>
                                <div>
                                    <h4>Hosted by {spot.Owner.firstName}</h4>
                                    <SpotDetailRooms spot={spot} />
                                </div>
                                <div className='host-profile-pic-div'>
                                    <img className='host-profile-pic-img' src={spot.Owner.profileUrl} alt=''/>
                                    {spot.Owner.isSuperhost &&
                                        <div className='host-superhost-logo-div'>
                                            <SpotDetailSuperhostLogo />
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        <div className='info-detail-wrapper'>
                            <SpotDetailHighlight owner={spot?.Owner} />
                        </div>
                        <div className='info-detail-wrapper'>
                            <div>
                                <img className='aircover-img' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' alt='aircover'></img>
                            </div>
                            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>
                        <div className='info-detail-wrapper'>
                            <p>{spot.description}</p>
                        </div>
                        {spot.SpotImages &&
                            <div className='pictures-in-mobile'>
                                <div className='pictures-big-mobile upper'>
                                    {spot.SpotImages[1] ?
                                        <img src={`${spot.SpotImages[1].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>
                                    }
                                </div>
                                <div className='pictures-small-mobile'>
                                    <div className='image-div-mobile-middle-left'>
                                        {spot.SpotImages[2] ? <img src={`${spot.SpotImages[2].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                                    </div>
                                    <div className='image-div-mobile-middle-right-one'>
                                        {spot.SpotImages[3] ? <img src={`${spot.SpotImages[3].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                                    </div>
                                    <div className='image-div-mobile-middle-right-two'>
                                        {spot.SpotImages[4] ? <img src={`${spot.SpotImages[4].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                                    </div>
                                </div>
                                <div className='pictures-big-mobile lower'>
                                    {spot.SpotImages[5] ?
                                        <img src={`${spot.SpotImages[5].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>
                                    }
                                </div>
                                <div className='review-modify-buttons show-all-images' style={{ marginTop: '10px', border: '1px solid #222222', borderRadius: '8px', overflow: 'hidden' }} >
                                    <button className='modify-buttons' onClick={() => setShowAllImages(true)} style={{ color: '#222222' }} >
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
                        }          
                        <div className='info-detail-wrapper'>
                            <h4>{totalDays} nights in {spot.city}</h4>
                            <div className='date-calendar-span'>
                                <span>{`${getMMMDDYYYStr(dates.startDate)}`} - {dates.endDate ? `${getMMMDDYYYStr(dates.endDate)}` : getMMMDDYYYStr(moment(dates.startDate, 'DD-MM-YYYY').add(1, 'day'))}</span>
                            </div>
                            <ShowCalendar dates={dates} setDates={setDates} setDateErrors={setDateErrors} />
                        </div>
                      
                    </div>
                    <div className='booking-form-wrapper'>
                        <div className='booking-form-sub-wrapper'>
                            <div className='booking-form'>
                                  <CreateBooking spot={spot} setShowReviewModal={setShowReviewModal} dates={dates} setDates={setDates} setDateErrors={setDateErrors} totalDays={totalDays} />
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
                    <SpotReviews spotReviews={spotReviews} />
                </div>
                <div className='spot-map-wrapper' id='spot-detail-map'>
                    <div className='spot-map-sub-wrapper'>
                        <h4>
                            Where you'll be
                        </h4>
                    </div>                    
                    <SpotMapContainer spot={spot}/>
                </div>

                <div className='booking-form-wrapper-mobile'>
                      <CreateBookingMobile spot={spot} dates={dates} />
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
                <SpotReviewsModal spotId={spotId} setShowReviewModal={setShowReviewModal} spot={spot} />
            </Modal>
        )}
        {showAddReviewForm &&
            <Modal onClose={() => setShowAddReviewForm(false)}>
                  <AddReview setShowAddReviewForm={setShowAddReviewForm} spotId={spotId}/>
            </Modal>
        }
    </div>
  )
}
