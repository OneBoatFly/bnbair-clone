import React, { useState, useEffect, useRef, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Spots.css';

export default function Spots({ lastSpotElementRef, getSpotsErrors }) {
    const spots = useSelector(state => state.spots.allSpots);
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

//     const [page, setPage] = useState(1);
//     console.log('page', page)
//     const [query, setQuery] = useState({});
//     console.log('query', query)
//     const { loading, getSpotsErrors, hasMore } = useSearchFetch(query);
//     // console.log('query', query)
//     console.log(loading, getSpotsErrors, hasMore)
//     console.log('__________________________________________________')

//     useEffect(() => {
//         setQuery((query => {
//             const newQuery = { ...query };
//             newQuery.page = page;
//             return newQuery;
//         }))
//     }, [page])

//     const observer = useRef();
//     const lastSpotElementRef = useCallback(node => {
//         if (loading) {
//             // console.log('is loading? ', loading);
//             return;
//         }

//         if (observer.current) {
//             // console.log('there is an observer: ', observer.current);
//             observer.current.disconnect();
//         }

//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && hasMore) {
//                 // console.log('Visible -----------------')
//                 setPage(prev => prev + 1);
//             }
//         })

//         if (node) {
//             // console.log('lastSpotElementRef')
//             // console.log(node)
//             observer.current.observe(node)
//         }

//     }, [loading, hasMore])

//   // end of infinite scroll setting
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
                                        {/* {!isNaN(distance) && <span style={{ color: '#717171' }}>{distance} miles away</span>} */}
                                        <span className="priceNight" ><span style={{ fontWeight: '500' }}>${price}</span> night</span>
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
                                        <span className="priceNight" ><span style={{ fontWeight: '500' }}>${price}</span> night</span>
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
