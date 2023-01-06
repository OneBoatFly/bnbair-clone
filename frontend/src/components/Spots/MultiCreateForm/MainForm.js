import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './MainForm.css';
import Cookies from 'js-cookie';
import * as spotsActions from '../../../store/spots';

import { FormTitles, FormSubTitles, progressBar, PageDisplay, checkInput} from './multiCreateUtil';
import { validateAddress } from '../../../store/maps';

export default function MainForm({ apiKey, sessionUser }) {
  const [addressErrors, setAddressErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState('');
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [priceErrors, setPriceErrors] = useState('');
  const [geoError, setGeoError] = useState('');
  const [imageErrors, setImageErrors] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [newSpot, setNewSpot] = useState({});
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [createComplete, setCreateComplete] = useState(false);
  const spot = useSelector(state => state.spots.newSpot);
  const history = useHistory();

  const allErrors = {
    addressErrors,
    setAddressErrors,
    geoError,
    titleErrors,
    setTitleErrors,
    descriptionErrors,
    setDescriptionErrors,
    priceErrors,
    setPriceErrors,
    imageErrors,
  }

  let existingFormData = Cookies.get('create-formData');
  if (!existingFormData) {
    existingFormData = {
      address: '',
      city: '',
      province: '',
      zipCode: '',
      country: '',
      name: '',
      lat: 0,
      lng: 0,
      description: '',
      price: 4500,
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms:1,
      amenityBasic: {},
      amenityStandout: {},
      amenitySafety: {}
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
    setHasSubmitted(false);
    if (page >= FormTitles.length) return;
    setPage(currPage => currPage + 1)
  }

  const goBack = () => {
    setHasSubmitted(false);
    if (page <= 0) return;
    setPage(currPage => currPage - 1)
  }

  const checkAddress = () => {
    dispatch(validateAddress(apiKey, {
      address: formData.address, 
      city: formData.city,  
      province: formData.province, 
      zipCode: formData.zipCode,  
      country: formData.country, 
    })).then((result) => {
      // console.log('dispatch address validation.then---')
      // console.log(result.geocode.location) // {latitude: 47.7362009, longitude: -122.1700787}
      // console.log(result.address.postalAddress)
      
      setFormData({
          ...formData,
          lat: result.geocode.location.latitude,
          lng: result.geocode.location.longitude,
          address: result.address.postalAddress.addressLines[0],
          city: result.address.postalAddress.locality,
          province: result.address.postalAddress.administrativeArea,
          country: result.address.postalAddress.regionCode,           
        })

    }).then(() => {
      goNext()
    }).catch((error) => {
      // console.log('dispatch error.catch', error.message)
      setHasSubmitted(true);
      setGeoError("We don't recognize that address. Is it correct?");
    })

  }

  const onNext = () => {
    if (!checkInput(page, allErrors)) {
      setHasSubmitted(true);
      return;
    }

    if (page === 0) checkAddress()
    else goNext()
  }

  const dispatch = useDispatch();
  const handleCreateSpot = () => {
    setHasSubmitted(true);
    if (addressErrors.length || titleErrors.length || descriptionErrors.length || priceErrors.length || geoError.length) {
      return;
    }

    dispatch(spotsActions.createOneSpot({ ...formData, state: formData.province }))
      .then((spot) => {
        setHasSubmitted(false);
        Cookies.remove('create-formPage');
        Cookies.remove('create-formData');
        setNewSpot(spot);
        dispatch(spotsActions.getOneSpot(spot.id));
        // dispatch(spotsActions.getOwnerSpots());
        // goNext();
        history.push(`/spots/current`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setAddressErrors([data.message]);
        } else if (data && data.errors) {
          setAddressErrors((errors) => {
            if (data.errors.address) {
              errors.push(data.errors.address);
              setPage(0)
            }
            if (data.errors.city) {
              errors.push(data.errors.city);
              setPage(0)
            }
            if (data.errors.state) {
              errors.push(data.errors.state);
              setPage(0)
            }
            if (data.errors.country) {
              errors.push(data.errors.country);
              setPage(0)
            }
            return errors;
          });

          if (data.errors.name) {
            setTitleErrors(data.errors.name);
            setPage(4)
          }
          if (data.errors.description) {
            setDescriptionErrors(data.errors.description);
            setPage(5)
          }
          if (data.errors.price) {
            setPriceErrors(data.errors.price);
            setPage(3)
          }

          if (data.errors.lat || data.errors.lng) {
            setValidationErrors(err => data.errors);
            setPage(0)
          }
        }
      });
  }
  
  // const handlePublish = (e) => {
  //   e.preventDefault();
  //   setHasSubmitted(true);
  //   // console.log('handleImageSubmit fired')

  //   if (!spot) {
  //     console.log('no spot created, returned')
  //     return;
  //   }

  //   if (spot.SpotImages?.length < 5) {
  //     console.log('not enough images, returned')
  //     return;
  //   }

  //   history.push(`/spots/current`);
  // }

  useEffect(() => {
    if (!formData) return;
    Cookies.set('create-formData', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (page === null) return;
    Cookies.set('create-formPage', page)
  }, [page])

  useEffect(() => {
    if (!spot) return;

    const existingImages = spot.SpotImages || [];
    setImageUrlArr(existingImages)
  }, [dispatch, spot])

  if (createComplete) return (
    <Redirect push to={`/spots/current`} />
  )

  // if (!sessionUser) return (
  //   <Redirect to='/' />
  // )

  return (
    <div className='main-create-form'>
        <div className='main-create-form-container'>
          <span className='main-create-form-title'>{FormTitles[page]}</span>
          <span className='main-create-form-sub-title'>{FormSubTitles[page]}</span>
          <div className='main-create-form-body'>
            {PageDisplay(page, formData, setFormData, hasSubmitted, allErrors, newSpot)}
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
          {page > 0 && page !== 6 && <button className='main-create-button button-left' onClick={goBack}>Back</button>}
          {page < FormTitles.length - 1 && page !== 5 && <button className='main-create-button button-right'  onClick={onNext}>Next</button>}
          {page === 5 && <button className='main-create-button button-right' onClick={handleCreateSpot}>Create Spot</button>}
          {/* {page === FormTitles.length - 1 && <button onClick={handlePublish}>Publish</button>} */}
        </div>
    </div>
  )
}
