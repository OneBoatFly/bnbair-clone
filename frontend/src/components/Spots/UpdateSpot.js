import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

import './CreateSpot.css';
import { handleLabelSmall, handleLabelBig, handleDivBottomBorder, handleDivBottomBorderOut } from '../styles';
import MyButton from '../FormElements/MyButton';

export default function UpdateSpot({ setShowUpdateSpotModal, spot }) {
  const [address, setAddress] = useState(spot.address);
  // const [aptNum, setAptNum] = useState(spot.aptNum);
  const [city, setCity] = useState(spot.city);
  const [province, setProvince] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);

  // const [errors, setErrors] = useState([]);
  const [addressErrors, setAddressErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState('');
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [priceErrors, setPriceErrors] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [newSpot, setNewSpot] = useState(spot);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    const hasAddressErrors = {};

    if (!address.length) hasAddressErrors.street = 'Street is required.';
    else if (address.length > 255) hasAddressErrors.street = 'Street must be less than 255 characters.';
    else delete hasAddressErrors.street;

    if (!city.length) hasAddressErrors.city = 'City is required.';
    else if (city.length > 255) hasAddressErrors.city = 'City must be less than 255 characters.';
    else delete hasAddressErrors.city;

    if (!province.length) hasAddressErrors.province = 'State is required.';
    else if (province.length > 255) hasAddressErrors.province = 'State must be less than 255 characters.';
    else delete hasAddressErrors.province;

    // console.log(country, country.length > 255)
    if (!country.length) hasAddressErrors.country = 'Country is required.';
    else if (country.length > 255) hasAddressErrors.country = 'Country must be less than 255 characters.';
    else delete hasAddressErrors.country;

    if (!name.length) setTitleErrors('Title is required.');
    else if (name.length > 50) setTitleErrors('Title must be less than 50 characters.');
    else setTitleErrors('');

    if (!description.length) setDescriptionErrors('Description is required.');
    else if (description.length > 500) setDescriptionErrors('Description must be less than 500 characters.');
    else setDescriptionErrors('');

    if (price <= 0 || !price) setPriceErrors('Valid price is required.');
    else setPriceErrors('');

    // set addressErrors expecting []:
    // console.log('hasAddressErrors', hasAddressErrors)
    if (Object.values(hasAddressErrors).length) {
      setAddressErrors(Object.values(hasAddressErrors));
    } else {
      setAddressErrors([]);
    }

    // console.log('addressErrors', addressErrors);
    // console.log('titleErrors', titleErrors);
    // console.log('descriptionErrors', descriptionErrors);
    // console.log('priceErrors', priceErrors);

  }, [address, city, province, country, name, description, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    // console.log('update handleSubmit fired')

    if (addressErrors.length || titleErrors.length || descriptionErrors.length || priceErrors.length) {
      // console.log('has errors, returned,')
      // console.log('addressErrors', addressErrors);
      // console.log('titleErrors', titleErrors);
      // console.log('descriptionErrors', descriptionErrors);
      // console.log('priceErrors', priceErrors);
      return;
    }

    dispatch(spotsActions.updateOneSpot({
      address, city, state: province, country, name, description, price, lat: spot.lat, lng: spot.lng
    }, spot.id))
      .then((spot) => {
        // console.log('update in dispatch success - checking spot', spot)
        setHasSubmitted(false);
        setNewSpot(spot);
        setSuccess(true);
        // setPage(1);
        setShowUpdateSpotModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log('update data returned: ', data)
        // console.log('update data.errors', data.errors)
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
  }

  // css related //
  const streetLabel = useRef(null);
  const streetInput = useRef(null);
  const cityLabel = useRef(null);
  const cityInput = useRef(null);
  const provinceLabel = useRef(null);
  const provinceInput = useRef(null);
  const countryLabel = useRef(null);
  const countryInput = useRef(null);

  const streetDivRef = useRef(null);
  const cityDivRef = useRef(null);
  const provinceDivRef = useRef(null);
  const countryDivRef = useRef(null);

  // css related //

  // check valid price //
  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete')
    if (!valid) {
      e.preventDefault();
    }
  }


  if (success) return (
    <Redirect push to={`/spots/${newSpot.id}`}/>
  )

  if (!sessionUser) return (
    <Redirect to='/' />
  )

  return (
    <div className='create-spot-wrapper'>
      <div className='create-spot exit-button-wrapper'>
        <div className='login exit-button-div' onClick={() => setShowUpdateSpotModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className='create-spot-sub-wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='create-spot-headers'>
            <h3>Confirm your address</h3>
          </div>          
          <div className='create-spot fullAddress-wrapper'>

            <div className='outline-wrapper street-wrapper' ref={streetDivRef}
              onFocus={() => handleDivBottomBorder(streetDivRef)} onBlur={() => handleDivBottomBorderOut(streetDivRef)}>
              <div className='create-spot-address' onFocus={() => handleLabelSmall(streetLabel)} onBlur={() => handleLabelBig(streetLabel, streetInput)}>
                <div className='label-div update-label-div' ref={streetLabel}>
                  <label htmlFor='address' >Street</label>
                </div>
                <div className='input-div' ref={streetInput} >
                  <input type='text' id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
            </div>

            <div className='outline-wrapper city-wrapper' ref={cityDivRef} onFocus={() => {
              handleDivBottomBorder(streetDivRef);
              handleDivBottomBorder(cityDivRef);
            }} onBlur={() => {
              handleDivBottomBorderOut(streetDivRef);
              handleDivBottomBorderOut(cityDivRef);
            }}>
              <div className='create-spot-city' onFocus={() => handleLabelSmall(cityLabel)} onBlur={() => handleLabelBig(cityLabel, cityInput)}>
                <div className='label-div update-label-div' ref={cityLabel}>
                  <label htmlFor='city'>City</label>
                </div>
                <div className='input-div' ref={cityInput}>
                  <input type='text' id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>
            </div>

            <div className='outline-wrapper state-wrapper' ref={provinceDivRef} onFocus={() => {
              handleDivBottomBorder(cityDivRef);
              handleDivBottomBorder(provinceDivRef);
            }} onBlur={() => {
              handleDivBottomBorderOut(cityDivRef);
              handleDivBottomBorderOut(provinceDivRef);
            }}>
              <div className='create-spot-province' onFocus={() => handleLabelSmall(provinceLabel)} onBlur={() => handleLabelBig(provinceLabel, provinceInput)}>
                <div className='label-div update-label-div' ref={provinceLabel}>
                  <label htmlFor='province'>State</label>
                </div>
                <div className='input-div' ref={provinceInput}>
                  <input type='text' id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
                </div>
              </div>
            </div>

            <div className='outline-wrapper country-wrapper' ref={countryDivRef} onFocus={() => {
              handleDivBottomBorder(provinceDivRef);
            }} onBlur={() => {
              handleDivBottomBorderOut(provinceDivRef);
            }}>
              <div className='create-spot-country' onFocus={() => handleLabelSmall(countryLabel)} onBlur={() => handleLabelBig(countryLabel, countryInput)}>
                <div className='label-div update-label-div' ref={countryLabel}>
                  <label htmlFor='country'>Country</label>
                </div>
                <div className='input-div' ref={countryInput}>
                  <input type='text' id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          {hasSubmitted && addressErrors.map((err, idx) => {
            return (
              <div key={idx} className='error-messages-wrapper'>
                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                <span className='error-messages'>{err}</span>
              </div>
            )
          })}

          <div className='create-spot-headers'>
            <h3>Create your title</h3>
          </div>
          <div className='create-spot '>
            <div className='outline-wrapper name-wrapper'>
              <div className='create-spot-name'>
                <input type='text' placeholder="An Aawesome Place" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
          </div>
          {hasSubmitted && titleErrors &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
              <span className='error-messages'>{titleErrors}</span>
            </div>
          }

          <div className='create-spot-headers'>
            <h3>Create your description</h3>
          </div>
          <div className='create-spot'>
            <div className='outline-wrapper description-wrapper'>
              <div className='create-spot-description'>
                <textarea id="description" placeholder='An awesone place' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
              </div>
            </div>
          </div>         
          {hasSubmitted && descriptionErrors &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
              <span className='error-messages'>{descriptionErrors}</span>
            </div>
          }

          <div className='create-spot-headers'>
            <h3>Set your price</h3>
          </div>
          <div className='create-spot'>
            <div className='outline-wrapper price-wrapper'>
              <div className='create-spot-price' style={{ display: 'flex' }}>
                {/* <label htmlFor='price'>Price</label> */}
                <span>$</span><input type='text' id="price" value={price} onChange={(e) => setPrice(e.target.value)} onKeyDown={handleKeyDown} />
              </div>
            </div>
          </div>
          {/* {console.log('price', priceErrors)} */}
          {hasSubmitted && priceErrors &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
              <span className='error-messages'>{priceErrors}</span>
            </div>
          }
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

          <MyButton name={'Update your listing'} />
        </form>
      </div>
    </div>
  )
}
