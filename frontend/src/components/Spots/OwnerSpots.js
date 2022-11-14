import React, { useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import * as spotsActions from '../../store/spots';
import { Modal } from '../../context/Modal';
import UpdateSpot from './UpdateSpot';
import OwnerSpotsTR from './OwnerSpotsTR';
import CreateSpot from './CreateSpot';

import './OwnerSpots.css';

export default function OwnerSpots({ isLoaded }) {
  const ownerSpots = useSelector(state => state.spots.ownerSpots);
  const [showSpotFormModal, setShowSpotFormModal] = useState(false);
  const [showUpdateSpotModal, setShowUpdateSpotModal] = useState(false);
  const [currSpot, setCurrSpot] = useState({});
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getOwnerSpots());
  }, [dispatch]);

  useEffect(() => {
    if (deleteMessage === '') return;
    console.log('deleteMessage change detected')
    const toDelete = setTimeout(() => setShowDelete(false), 2000)

    return () => clearTimeout(toDelete);
  }, [deleteMessage]);

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
        <div style={{}} className='header-div'>
          <div style={{ }} className='header-create-wrapper'>
            <h4>
              {ownerSpotsArr.length > 0 ? `${ownerSpotsArr.length} listings` : 'No listing'}
            </h4>
            <button onClick={() => setShowSpotFormModal(true)} className='modify-buttons create'>
              <i className="fa-solid fa-plus"></i>
              <span> Create a listing</span>
              </button>
          </div>
          <h5 id='delete-message' className={showDelete ? 'fadeIn' : 'fadeOut'}>
            {deleteMessage.length > 0 && `${deleteMessage}.`}
          </h5>
        </div>
        <div className='table-div'>
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
                ownerSpotsArr?.map((spot, idx) => {
                  return <OwnerSpotsTR key={idx} setShowUpdateSpotModal={setShowUpdateSpotModal} spot={spot} setCurrSpot={setCurrSpot} setDeleteMessage={setDeleteMessage} setShowDelete={setShowDelete}/>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {showSpotFormModal && (
        <Modal onClose={() => setShowSpotFormModal(false)} >
          <CreateSpot setShowSpotFormModal={setShowSpotFormModal} />
        </Modal>
      )}  
      {showUpdateSpotModal && (
        <Modal onClose={() => setShowUpdateSpotModal(false)} >
          <UpdateSpot setShowUpdateSpotModal={setShowUpdateSpotModal} spot={currSpot} />
        </Modal>
      )}
    </div>
  )
}
