import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OwnerSpots.css';

import * as spotsActions from '../../store/spots';
import { NavLink } from 'react-router-dom';

export default function OwnerSpotsTR({ setShowUpdateSpotModal, spot, setCurrSpot, setDeleteMessage, setShowDelete }) {
    const { previewImage, city, state, name, updatedAt, numberOfBooking } = spot;
    const date = new Date(updatedAt);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();

    const handleUpdate = () => {
        setCurrSpot(spot);
        setShowUpdateSpotModal(true);
    }

    const dispatch = useDispatch();
    const handleDelete = async () => {
        // console.log('in handleDelete')
        const message = await dispatch(spotsActions.deleteOneSpot(spot.id));
        // console.log('handleDelete thunk returning...', message)
        setDeleteMessage(message);
        setShowDelete(true);

        dispatch(spotsActions.getOwnerSpots())
            .then(() => {
                // setPage(1);
            })
    }

    const history = useHistory();
    const handleImages = async () => {
        // console.log('in handle images --------- ')

        history.push(`/spots/${spot.id}/images`)
    }

    return (
        <tr>
            <td className='td-listing'>
                <div className="table-image-wrapper" style={{ display: 'flex' }}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <div className='table-image-div' >
                            {previewImage ? <img src={`${previewImage}`} alt='preview' /> : <div className='no-image-div ownerspots-no-image'>No Image</div>}
                        </div>
                    </NavLink>
                    <span><b>{name}</b></span>
                </div>
            </td>
            <td className='td-to-do'>  
                <div className='modify-button-div'>
                    <button className='modify-buttons first' onClick={handleImages}>
                        Images
                        {/* <i className="fa-solid fa-image"></i> */}
                    </button>
                    <button className='modify-buttons first' onClick={handleUpdate}>
                        Edit
                        {/* <i className="fa-solid fa-pen-to-square"></i> */}
                    </button>
                    <button className='modify-buttons' onClick={handleDelete} >
                        Delete
                        {/* <i className="fa-solid fa-trash"></i> */}
                    </button>
                </div>
            </td>
            <td>
                {numberOfBooking > 0 ?
                    <NavLink to={`${spot.id}/bookings`} className='spot-booking-link'>{numberOfBooking} booking(s)</NavLink>
                    :
                    <span>No booking</span>
                }
            </td>            
            <td>
                <span>{city}, {state}</span>
            </td>
            <td>
                <span>{month} {day}</span>
            </td>
        </tr>
    )
}
