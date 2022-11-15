import React from 'react';
import { useDispatch } from 'react-redux';
import './OwnerSpots.css';

import * as spotsActions from '../../store/spots';
import { NavLink } from 'react-router-dom';

export default function OwnerSpotsTR({ setShowUpdateSpotModal, spot, setCurrSpot, setDeleteMessage, setShowDelete }) {
    const { previewImage, city, state, name, updatedAt } = spot;
    const date = new Date(updatedAt);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();

    const handleUpdate = () => {
        setCurrSpot(spot);
        setShowUpdateSpotModal(true);
    }

    const dispatch = useDispatch();
    const handleDelete = async () => {
        console.log('in handleDelete')
        const message = await dispatch(spotsActions.deleteOneSpot(spot.id));
        console.log('handleDelete thunk returning...', message)
        setDeleteMessage(message);
        setShowDelete(true);

        dispatch(spotsActions.getOwnerSpots());
    }

    return (
        <tr>
            <td>
                <div className="table-image-wrapper" style={{ display: 'flex' }}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <div className='table-image-div' >
                            <img src={`${previewImage}`} alt='preview' />
                        </div>
                    </NavLink>
                    <span><b>{name}</b></span>
                </div>
            </td>
            <td>
                <div className='modify-button-div'>
                    <button className='modify-buttons first' onClick={handleUpdate}>Update</button>
                    <button className='modify-buttons' onClick={handleDelete} >Delete</button>
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
}
