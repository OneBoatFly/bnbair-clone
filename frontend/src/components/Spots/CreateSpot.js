import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

import './CreateSpot.css';
import { handleLabelSmall, handleLabelBig } from '../styles';
import MyButton from '../FormElements/MyButton';


export default function CreateSpot({ setShowSpotFormModal }) {
  const [address, setAddress] = useState('');
  const [aptNum, setAptNum] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(4500);
  const [previewImage, setPreviewImage] = useState('');
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  // const [errors, setErrors] = useState([]);
  const [addressErrors, setAddressErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState('');
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [priceErrors, setPriceErrors] = useState('');
  const [imageUrlErrors, setImageUrlErrors] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [newSpot, setNewSpot] = useState({});

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    const hasAddressErrors = {};

    if (!address.length) hasAddressErrors.street = 'Street is required.';
    else if (address.length > 255) hasAddressErrors.street = 'Street must be less than 255 characters.';
    else {
      delete hasAddressErrors.street;
      handleLabelSmall(streetLabel, streetInput);
    }

    if (!city.length) hasAddressErrors.city = 'City is required.';
    else if (city.length > 255) hasAddressErrors.city = 'City must be less than 255 characters.';
    else {
      delete hasAddressErrors.city;
      handleLabelSmall(cityLabel, cityInput);
    }

    if (!province.length) hasAddressErrors.province = 'State is required.';
    else if (province.length > 255) hasAddressErrors.province = 'State must be less than 255 characters.';
    else {
      delete hasAddressErrors.province;
      handleLabelSmall(provinceLabel, provinceInput);
    }

    // console.log(country, country.length > 255)
    if (!country.length) hasAddressErrors.country = 'Country is required.';
    else if (country.length > 255) hasAddressErrors.country = 'Country must be less than 255 characters.';
    else {
      delete hasAddressErrors.country;
      handleLabelSmall(countryLabel, countryInput);
    }

    if (!name.length) setTitleErrors('Title is required.');
    else if (name.length > 50) setTitleErrors('Title must be less than 50 characters.');
    else setTitleErrors('');

    if (!description.length) setDescriptionErrors('Description is required.');
    else if (description.length > 500) setDescriptionErrors('Description must be less than 500 characters.');
    else setDescriptionErrors('');

    if (price <= 0 || !price) setPriceErrors('Valid price is required.');
    else setPriceErrors('');

    if (!previewImage.length || !validator.isURL(previewImage) ) setImageUrlErrors('A valid preview image url is required');
    else setImageUrlErrors('');

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

    if (!addressErrors.length && !titleErrors.length && !descriptionErrors.length && !priceErrors.length && !imageUrlErrors.length) {
      console.log('!! no errors')
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }

  }, [address, city, province, country, name, description, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    console.log('handleSubmit fired')

    if (addressErrors.length || titleErrors.length || descriptionErrors.length || priceErrors.length || imageUrlErrors) {
      console.log('has errors, returned,')
      console.log('addressErrors', addressErrors);
      console.log('titleErrors', titleErrors);
      console.log('descriptionErrors', descriptionErrors);
      console.log('priceErrors', priceErrors);
      console.log('imageUrlErrors', imageUrlErrors);
      return;
    }

    dispatch(spotsActions.createOneSpot({
      address, city, state: province, country, name, description, price, lat: 37.7645358, lng: -122.4730327
    }, previewImage))
      .then((spot) => {
        console.log('in dispatch success - checking spot', spot)
        setHasSubmitted(false);
        setNewSpot(spot);
        setShowSpotFormModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        console.log('data returned: ', data)
        console.log('data.errors', data.errors)
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
  // css related //

  // check valid price //
  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab')
    if (!valid) {
      e.preventDefault();
    }
  }

  if (newSpot.id) return (
    <Redirect to={`/spots/${newSpot.id}`}/>
  )

  if (!sessionUser) return (
    <Redirect to='/' />
  )

  return (
    <div className='create-spot-wrapper'>
      <div className='create-spot exit-button-wrapper'>
        <div className='login exit-button-div' onClick={() => setShowSpotFormModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className='create-spot-sub-wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='create-spot-headers'>
            <h3>Confirm your address</h3>
          </div>          
          <div className='create-spot fullAddress-wrapper'>
            <div className='outline-wrapper'>
              <div className='create-spot-address' onFocus={() => handleLabelSmall(streetLabel)} onBlur={() => handleLabelBig(streetLabel, streetInput)}>
                <div className='label-div' ref={streetLabel}>
                  <label htmlFor='address' >Street</label>
                </div>
                <div className='input-div' ref={streetInput} >
                  <input type='text' id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
            </div>
            {/* <div className='outline-wrapper'>
              <div className='create-spot-aptNum' onFocus={() => handleLabelSmall(aptLabel)} onBlur={() => handleLabelBig(aptLabel, aptInput)}>
                <div className='label-div' ref={aptLabel}>
                  <label htmlFor='aptNum'>Apt, suite, etc. (Optional)</label>
                </div>
                <div className='input-div' ref={aptInput}>
                  <input type='text' id="aptNum" value={aptNum} onChange={(e) => setAptNum(e.target.value)} />
                </div>
              </div>
            </div>             */}
            <div className='outline-wrapper'>
              <div className='create-spot-city' onFocus={() => handleLabelSmall(cityLabel)} onBlur={() => handleLabelBig(cityLabel, cityInput)}>
                <div className='label-div' ref={cityLabel}>
                  <label htmlFor='city'>City</label>
                </div>
                <div className='input-div' ref={cityInput}>
                  <input type='text' id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>
            </div>
            <div className='outline-wrapper'>
              <div className='create-spot-province' onFocus={() => handleLabelSmall(provinceLabel)} onBlur={() => handleLabelBig(provinceLabel, provinceInput)}>
                <div className='label-div' ref={provinceLabel}>
                  <label htmlFor='province'>State</label>
                </div>
                <div className='input-div' ref={provinceInput}>
                  <input type='text' id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
                </div>
              </div>
            </div>
            <div className='outline-wrapper'>
              <div className='create-spot-country' onFocus={() => handleLabelSmall(countryLabel)} onBlur={() => handleLabelBig(countryLabel, countryInput)}>
                <div className='label-div' ref={countryLabel}>
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
          <div className='create-spot name-wrapper'>
            <div className='outline-wrapper'>
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
          <div className='create-spot description-wrapper'>
            <div className='outline-wrapper'>
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
          <div className='create-spot price-wrapper'>
            <div className='outline-wrapper'>
              <div className='create-spot-price'>
                {/* <label htmlFor='price'>Price</label> */}
                <input type='text' id="price" value={price} onChange={(e) => setPrice(e.target.value)} onKeyDown={handleKeyDown} />
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

          <div className='create-spot-headers'>
            <h3>Set a preview image</h3>
          </div>
          <div className='create-spot previewImage-wrapper'>
            <div className='outline-wrapper'>
              <div className='create-spot-previewImage'>
                {/* <label htmlFor='previewImage'>previewImage</label> */}
                <input type='text' id="previewImage" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
              </div>
            </div>
          </div>
          {/* {console.log('price', priceErrors)} */}
          {hasSubmitted && imageUrlErrors &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
              <span className='error-messages'>{imageUrlErrors}</span>
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

          <MyButton name={'Publish your listing'} />
        </form>
      </div>
    </div>
  )
}
