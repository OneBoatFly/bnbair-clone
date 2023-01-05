import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './MainForm.css';
import Cookies from 'js-cookie';

import { FormTitles, FormSubTitles, progressBar, PageDisplay, checkInput} from './multiCreateUtil';


export default function MainForm({ sessionUser }) {
  const geokey = useSelector((state) => state.maps.geokey);
  const [geoError, setGeoError] = useState('');
  
  const [page, setPage] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    province: '',
    country: '',
    name: '',
    description: '',
    price: 4500
  })

  const goNext = () => {
    if (page >= FormTitles.length) return;
    setPage(currPage => currPage + 1)
  }

  const goBack = () => {
    if (page <= 0) return;
    setPage(currPage => currPage - 1)
  }

  // if (!sessionUser) return (
  //   <Redirect to='/' />
  // )

  return (
    <div className='main-create-form'>
        <div className='main-create-form-container'>
          <span className='main-create-form-title'>{FormTitles[page]}</span>
          <span className='main-create-form-sub-title'>{FormSubTitles[page]}</span>
          <div className='main-create-form-body'>
            {PageDisplay(page, geokey, formData, setFormData, hasSubmitted, geoError)}
          </div>
        </div>
        <div className='main-create-progress-bar-container'>
        <div className='main-create-progress-bar' style={{ 'width': `${progressBar(page)*100}%`}}></div>
        </div>
        <div className='main-create-button-container'>
          {page > 0 && <button onClick={goBack}>Back</button>}
          {page < FormTitles.length - 1 && <button onClick={goNext}>Next</button>}
          {page === FormTitles.length - 1 && <button>Publish</button>}
        </div>
    </div>
  )
}
