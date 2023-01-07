import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import './MainForm.css';
import Cookies from 'js-cookie';
import * as spotsActions from '../../../store/spots';

import { FormTitles, FormSubTitles, progressBar, PageDisplay, checkInput} from './multiCreateUtil';
import { validateAddress } from '../../../store/maps';
import { csrfFetch } from '../../../store/csrf';

export default function MainForm({ apiKey, sessionUser }) {
  const [addressErrors, setAddressErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState('');
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [priceErrors, setPriceErrors] = useState('');
  const [geoError, setGeoError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imageError, setImageError] = useState('');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let editFormData;
  editFormData = location.state?.editFormData;

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
    setImageError
  }

  // check cookies first
  let spot = useSelector(state => state.spots.spotDetails);
  if (!spot) {
    spot = Cookies.get('modifySpot');
  }

  let existingFormData = Cookies.get('create-formData');
  if (!existingFormData) {
    if (!editFormData?.spotId) {
      existingFormData = {
        spotId: spot ? spot.id : null,
        address: '',
        city: '',
        province: '',
        zipCode: '',
        country: "United States of America - US",
        name: '',
        lat: 0,
        lng: 0,
        description: '',
        price: '$4500',
        realPrice: 4500,
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms:1,
        amenityBasic: {},
        amenityStandout: {},
        amenitySafety: {}
      }
    } else {
      existingFormData = {...editFormData};
    }
  } else {
    existingFormData = JSON.parse(existingFormData)
  }

  const [formData, setFormData] = useState(existingFormData);

  let currentPage = Cookies.get('create-formPage');
  if (!currentPage) currentPage = 0;
  else currentPage = parseInt(currentPage);

  const [page, setPage] = useState(currentPage);
  // check cookies and set variables end
  

  const goNext = () => {
    setHasSubmitted(false);
    setValidationErrors({});
    if (page >= FormTitles.length) return;

    setPage(currPage => currPage + 1)
  }

  const goBack = () => {
    setHasSubmitted(false);
    if (page <= 0) return;
    setPage(currPage => currPage - 1)
  }

  const handleCreateSpot = () => {
    setHasSubmitted(true);
    // titleErrors.length || descriptionErrors.length || pending spot status, no title or description
    if (addressErrors.length || priceErrors.length || geoError.length) {
      return;
    }

    const countryWCode = formData.country?.split(' - ');
    dispatch(spotsActions.createOneSpot({ ...formData, state: formData.province, country: countryWCode[0], price: formData.realPrice, name: 'Unpublished', description: 'Unpublished' }))
      .then((spot) => {
        setHasSubmitted(false);
        setFormData({
          ...formData,
          name: spot.name,
          description: spot.description,
          spotId: spot.id
        })
      })
      .then(() => {
        goNext();
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

  const handleEditSpot = () => {
    setHasSubmitted(true);
    if (addressErrors.length || titleErrors.length || descriptionErrors.length || priceErrors.length || geoError.length) {
      return;
    }

    const countryWCode = formData.country?.split(' - ');
    dispatch(spotsActions.updateOneSpot({ ...formData, state: formData.province, country: countryWCode[0], price: formData.realPrice }, formData.spotId))
      .then((spot) => {
        setHasSubmitted(false);
        goNext();
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

  const handleEditAmenities = () => {
    // updateSpotAmenities
    setHasSubmitted(true);

    dispatch(spotsActions.updateSpotAmenities({ ...formData}, formData.spotId))
      .then(() => {
        setHasSubmitted(false);
      })
      .then(() => {
        goNext();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors({...validationErrors, amenities: data.errors});
        }
      });

  }

  const checkAddress = () => {
    let countryWCode = formData.country?.split(' - ');
    
    dispatch(validateAddress(apiKey, {
      address: formData.address, 
      city: formData.city,  
      province: formData.province, 
      zipCode: formData.zipCode,  
      country: countryWCode[1], 
    })).then((result) => {     
      setFormData({
          ...formData,
          lat: result.geocode.location.latitude,
          lng: result.geocode.location.longitude,
          address: result.address.postalAddress.addressLines[0],
          city: result.address.postalAddress.locality,
          province: result.address.postalAddress.administrativeArea,   
        })
    }).then(() => {
      if (formData.spotId) {
        handleEditSpot();
      } else {
        handleCreateSpot();
      }

    }).catch((error) => {
      setHasSubmitted(true);
      setGeoError("We don't recognize that address. Is it correct?");
    })

  }


  const handlePublish = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!spot) {
      return;
    }

    if (spot.SpotImages?.length < 5) {
      setImageError('Please upload at least 5 photos.')
      return;
    }

    const options = {
      method: 'PATCH',
      body: JSON.stringify({isPublished: true})
    };

    const response = await csrfFetch(`/api/spots/${spot.id}`, options);

    if (response.ok) {
      Cookies.remove('create-formPage');
      Cookies.remove('create-formData');
      Cookies.remove('modifySpot');
      history.push(`/spots/current`);
    } else {
      const data = await response.json();
      if (data && data.errors) {
        setValidationErrors({ ...validationErrors, isPublished: data.errors})
      }
    }
  }

  const onNext = () => {
    if (!checkInput(page, allErrors)) {
      setHasSubmitted(true);
      return;
    }

    if (page === 0) {
      checkAddress();
    } else if (page === 2) handleEditAmenities();
    else handleEditSpot();
  }

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
    if (!spot.id) return;

    Cookies.set('modifySpot', JSON.stringify(spot));
  }, [spot])

  useEffect(() => {
    dispatch(spotsActions.getAmenities())
  }, [dispatch])

  useEffect(() => {
    if (!formData.spotId) return;
    dispatch(spotsActions.getOneSpot(formData.spotId));
  }, [dispatch])

  console.log('MainForm --- formData', formData)
  // console.log('MainForm --- formPage', page)

  // if (createComplete) return (
  //   <Redirect push to={`/spots/current`} />
  // )

  // if (!sessionUser) return (
  //   <Redirect to='/' />
  // )

  return (
    <div className='main-create-form'>
        <div className='main-create-form-container'>
          <span className='main-create-form-title'>{FormTitles[page]}</span>
          <span className='main-create-form-sub-title'>{FormSubTitles[page]}</span>
          <div className='main-create-form-body'>
            {PageDisplay(page, formData, setFormData, hasSubmitted, allErrors)}
          </div>
        </div>
        <div className='main-create-form-validation-errors'>
          {hasSubmitted && Object.values(validationErrors) &&
            Object.values(validationErrors).map((err, idx) => {
              return (
                <div key={idx} className='error-messages-wrapper'>
                  <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                  <span className='error-messages'>{err}</span>
                </div>
              )
            })
          }
          {hasSubmitted && imageError.length > 0 &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
            <span className='error-messages'>{imageError}</span>
            </div>
          }
        </div>
        <div className='main-create-progress-bar-container'>
        <div className='main-create-progress-bar' style={{ 'width': `${progressBar(page)*100}%`}}></div>
        </div>
        <div className='main-create-button-container'>
          {page > 0 && page !== 6 && <button className='main-create-button button-left' onClick={goBack}>Back</button>}
          {page < FormTitles.length - 1 && <button className='main-create-button button-right'  onClick={onNext}>Next</button>}
          {/* {page === 5 && <button className='main-create-button button-right' onClick={handleCreateSpot}>Create Spot</button>} */}
          {page === FormTitles.length - 1 && <button className='main-create-button button-right' onClick={handlePublish}>Publish</button>}
        </div>
    </div>
  )
}
