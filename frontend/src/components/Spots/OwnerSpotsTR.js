import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OwnerSpots.css';
import * as spotsActions from '../../store/spots';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const countryCodes = require('country-codes-list');

export default function OwnerSpotsTR({ setShowUpdateSpotModal, spot, setCurrSpot, setDeleteMessage, setShowDelete }) {
    const { previewImage, city, state, name, updatedAt, numberOfBooking, isPublished} = spot;
    const history = useHistory();
    const dispatch = useDispatch();
    const date = new Date(updatedAt);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();

    const myCountryNameObject = countryCodes.customList('countryNameEn', '{countryNameEn} - {countryCode}')
    // console.log('myCountryNameObject', myCountryNameObject)

    const handleUpdate = () => {
        setCurrSpot(spot);
        // setShowUpdateSpotModal(true);

        dispatch(spotsActions.getOneSpot(spot.id))
            .then((editSpot) => {
                // console.log('-------editSpot', editSpot)
                const editFormData = {
                    spotId: editSpot ? editSpot.id : null,
                    address: editSpot.address,
                    city: editSpot.city,
                    province: editSpot.state,
                    zipCode: '',
                    country: myCountryNameObject[editSpot.country],
                    name: editSpot.name,
                    lat: editSpot.lat,
                    lng: editSpot.lng,
                    description: editSpot.description,
                    price: `$${editSpot.price}`,
                    realPrice: editSpot.price,
                    guests: editSpot.guests,
                    bedrooms: editSpot.bedrooms,
                    beds: editSpot.beds,
                    bathrooms: editSpot.bathrooms,
                    amenityBasic: editSpot.AmenityBasic,
                    amenityStandout: editSpot.AmenityStandout,
                    amenitySafety: editSpot.AmenitySafety
                }
        

                Cookies.remove('create-formData');
                Cookies.remove('create-formPage');

                history.push('/spots/create', {
                    editFormData,
                    mode: 'edit'
                })
            })

    }

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

    // const handleImages = async () => {
    //     // console.log('in handle images --------- ')

    //     history.push(`/spots/${spot.id}/images`)
    // }

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
            <td>
                <span>{isPublished ? 'Published' : 'Pending'}</span>
            </td>            
            <td className='td-to-do'>  
                <div className='modify-button-div'>
                    {/* <button className='modify-buttons first' onClick={handleImages}>
                        Images
                        <i className="fa-solid fa-image"></i>
                    </button> */}
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
