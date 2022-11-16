import React from 'react';
import { NavLink } from 'react-router-dom';
import './Spots.css';

export default function Spots({ spots, lastSpotElementRef, getSpotsErrors }) {
    let spotsArr = [];
    if (spots) spotsArr = Object.values(spots);

    let getSpotErrorsArr = [];
    if (getSpotErrorsArr) getSpotErrorsArr = Object.values(getSpotErrorsArr);

    // console.log('spts array >>> ', spotsArr)
    // const dispatch = useDispatch();
    
    // const [userCoord, setUserCoord] = useState({});
    // navigator.geolocation.getCurrentPosition((location) => setUserCoord(location.coords))
    // console.log('userCoord', userCoord)
    // useEffect(() => {
    //     // dispatch(spotsActions.getAllSpots(userCoord));
    //     dispatch(spotsActions.getAllSpots());
    // }, [dispatch]);

  return (
    <div className='all-spots-wrapper'>
        <div>
            {getSpotErrorsArr?.map(error => {
                return (
                    <div className='error-messages-wrapper'>
                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                        <span className='error-messages'>{error}</span>
                    </div>
                )
            })}
        </div>
        <div className='all-spots-sub-wrapper'>
            {
                spotsArr?.map((spot, idx) => {
                    const { previewImage, city, state, avgRating, price, id, distance } = spot;
                    if (spotsArr.length === idx + 1) {
                        return (
                            <NavLink ref={lastSpotElementRef} key={id} to={`/spots/${id}`} className='link-wrapper'>
                                <div className='individual-spot-wrapper'>
                                    <div className='image-div'>
                                        <img src={`${previewImage}`} alt='preview' />
                                    </div>
                                    <div className='short-info-wrapper'>
                                        <span className='cityState'>{city}, {state}</span>
                                        {/* {console.log(distance)} */}
                                        {!isNaN(distance) && <span style={{ color: '#717171' }}>{distance} miles away</span>}
                                        <span style={{ color: '#717171' }}><span style={{ fontWeight: '500' }}>${price}</span> night</span>
                                        <span className='rating-wrapper'>
                                            <i className="fa-solid fa-star" />
                                            {/* {console.log(avgRating)} */}
                                            {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    } else {
                        return (
                            <NavLink key={id} to={`/spots/${id}`} className='link-wrapper'>
                                <div className='individual-spot-wrapper'>
                                    <div className='image-div'>
                                        <img src={`${previewImage}`} alt='preview' />
                                    </div>
                                    <div className='short-info-wrapper'>
                                        <span className='cityState'>{city}, {state}</span>
                                        {/* {console.log(distance)} */}
                                        {!isNaN(distance) && <span style={{ color: '#717171' }}>{distance} miles away</span>}
                                        <span style={{ color: '#717171' }}><span style={{ fontWeight: '500' }}>${price}</span> night</span>
                                        <span className='rating-wrapper'>
                                            <i className="fa-solid fa-star" />
                                            {/* {console.log(avgRating)} */}
                                            {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    }
                })
            }
        </div>
    </div>
  )
}
