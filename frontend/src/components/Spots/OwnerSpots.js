import React, { useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import './OwnerSpots.css';

export default function OwnerSpots({ isLoaded }) {
  const ownerSpots = useSelector(state => state.spots.ownerSpots);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getOwnerSpots());
  }, [dispatch]);

  if (!isLoaded) {
    return (
        <Redirect to = '/' />
      )
  }

  let ownerSpotsArr = [];
  if (ownerSpots) ownerSpotsArr = Object.values(ownerSpots);

  return (
    <div className='owner-spots-wrapper'>
      <div className='owner-spots-sub-wrapper'>
        <h4>
          {ownerSpotsArr.length > 0 ? `${ownerSpotsArr.length} listings` : 'No listing'}
        </h4>
        <table className='owner-spots-table'>
          <thead>
            <tr className='owner-spots-header-row' >
              <th><span>LISTING</span></th>
              <th><span></span></th>
              <th><span>LOCATION</span></th>
              <th><span>LAST MODIFIED</span></th>
            </tr>
          </thead>
          <tbody>
            {
              ownerSpotsArr?.map(spot => {
                const { previewImage, city, state, name, id, updatedAt } = spot;
                const date = new Date(updatedAt);
                const month = date.toLocaleString('en-US', { month: 'long' });
                const day = date.getDate();

                return (
                  <tr key={id}>
                    <td>
                      <div className="table-image-wrapper" style={{display:'flex'}}>
                        <div className='table-image-div' >
                          <img src={`${previewImage}`} alt='preview' />
                        </div>
                        <span><b>{name}</b></span>
                      </div>
                    </td>
                    <td>
                      <div className='modify-button-div'>
                        <button className='modify-buttons first'>Update</button>
                        <button className='modify-buttons'>Delete</button>
                      </div>
                    </td>
                    <td>
                      <span>{city}, {state}</span>
                    </td>
                    <td>
                      <span>{month} {day}</span>
                    </td>                    
                  </tr>
                )
              })
            }
            {/* ownerSpotsArr?.map(spot => {
              
              // return (
              //   <div key={id} className='owner-spots-wrapper'>
              //     <NavLink to={`/spots/${id}`} className='link-wrapper'>
              //       <div className='individual-spot-wrapper'>
              //         <div className='image-div'>
              //           <img src={`${previewImage}`} alt='preview' />
              //         </div>
              //         <div className='short-info-wrapper'>
              //           <span className='cityState'>{city}, {state}</span>
              //           <span style={{ color: '#717171' }}><b>${price}</b> night</span>
              //           <span className='rating-wrapper'>
              //             <i className="fa-solid fa-star" />
              //             {avgRating ? <span>{avgRating.toFixed(1)}</span> : null}
              //           </span>
              //         </div>
              //       </div>
              //     </NavLink>
              //     <div className='modify-button-div'><button className='modify-buttons'>Update</button></div>
              //     <div className='modify-button-div'><button className='modify-buttons'>Delete</button></div>
              //   </div>
              // )
            }) */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
