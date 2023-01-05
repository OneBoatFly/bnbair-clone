import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './MainForm.css';
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import * as spotsActions from '../../../store/spots';

import { FormTitles, FormSubTitles, progressBar, PageDisplay, checkInput} from './multiCreateUtil';

export default function MainForm({ apiKey, sessionUser }) {
  Geocode.setApiKey(apiKey);

  const [addressErrors, setAddressErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState('');
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [priceErrors, setPriceErrors] = useState('');
  const [geoError, setGeoError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const allErrors = {
    addressErrors,
    setAddressErrors,
    geoError,
    titleErrors,
    setTitleErrors,
    descriptionErrors,
    setDescriptionErrors,
    priceErrors,
    setPriceErrors
  }

  const [newSpot, setNewSpot] = useState({});

  let existingFormData = Cookies.get('create-formData');
  if (!existingFormData) {
    existingFormData = {
      address: '',
      city: '',
      province: '',
      country: '',
      name: '',
      description: '',
      price: 4500
    }
  } else {
    existingFormData = JSON.parse(existingFormData)
  }

  const [formData, setFormData] = useState(existingFormData);

  let currentPage = Cookies.get('create-formPage');
  if (!currentPage) currentPage = 0;
  else currentPage = parseInt(currentPage);

  const [page, setPage] = useState(currentPage);

  const goNext = () => {
    if (page >= FormTitles.length) return;
    setPage(currPage => currPage + 1)
  }

  const goBack = () => {
    if (page <= 0) return;
    setPage(currPage => currPage - 1)
  }

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    // console.log('handleSubmit fired')

    if (addressErrors.length || titleErrors.length || descriptionErrors.length || priceErrors.length) {
      return;
    }

    Geocode.fromAddress(`${formData.address} ${formData.city} ${formData.province} ${formData.country}`)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);

        dispatch(spotsActions.createOneSpot({ ...formData, lat, lng }))
          .then((spot) => {
            setHasSubmitted(false);
            setNewSpot(spot);
            dispatch(spotsActions.getOwnerSpots());
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.message) {
              setAddressErrors([data.message]);
            } else if (data && data.errors) {
              setAddressErrors((errors) => {
                if (data.errors.address) errors.push(data.errors.address);
                if (data.errors.city) errors.push(data.errors.city);
                if (data.errors.state) errors.push(data.errors.state);
                if (data.errors.country) errors.push(data.errors.country);
                return errors;
              });

              if (data.errors.name) setTitleErrors(data.errors.name);
              if (data.errors.description) setDescriptionErrors(data.errors.description);
              if (data.errors.price) setPriceErrors(data.errors.price);

              if (data.errors.lat || data.errors.lng) setValidationErrors(err => data.errors);
            }
          });

      },
      ).catch(e => {
        // console.log('-------- geo error ----------')
        // console.log(e);
        setGeoError('Invalid address.')
      })

  }

  useEffect(() => {
    if (!formData) return;
    Cookies.set('create-formData', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (page === null) return;
    Cookies.set('create-formPage', page)
  }, [page])

  // if (!sessionUser) return (
  //   <Redirect to='/' />
  // )

  if (!apiKey) return null;

  if (newSpot.id) return (
    <Redirect push to={`/spots/current`} />
  )

  return (
    <div className='main-create-form'>
        <div className='main-create-form-container'>
          <span className='main-create-form-title'>{FormTitles[page]}</span>
          <span className='main-create-form-sub-title'>{FormSubTitles[page]}</span>
          <div className='main-create-form-body'>
            {PageDisplay(page, formData, setFormData, hasSubmitted, setHasSubmitted, allErrors)}
          </div>
        </div>
        <div className='main-create-form-validation-errors'>
          {
            hasSubmitted && Object.values(validationErrors) &&
            Object.values(validationErrors).map((err, idx) => {
              return (
                <div key={idx} className='error-messages-wrapper'>
                  <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                  <span className='error-messages'>{err}</span>
                </div>
              )
            })
          }
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
