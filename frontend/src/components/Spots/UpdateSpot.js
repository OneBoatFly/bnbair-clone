import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

import './CreateSpot.css';
import MyButton from '../FormElements/MyButton';

export default function UpdateSpot({ setShowSpotFormModal, spot }) {
  const [address, setAddress] = useState(spot.address);
  const [aptNum, setAptNum] = useState(spot.aptNum);
  const [city, setCity] = useState(spot.city);
  const [province, setProvince] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);

  const [errors, setErrors] = useState([]);
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
    if (!address.length) setAddressErrors(curr => {
      curr.push('Street is required.')
      return curr
    });
    else {
      const idx = addressErrors.indexOf('Street is required.');
      setAddressErrors(curr => {
        curr.splice(idx, 1);
        return curr;
      });
    }

    if (!city.length) setAddressErrors(curr => {
      curr.push('City is required.');
      return curr;
    });
    else {
      const idx = addressErrors.indexOf('City is required.');
      setAddressErrors(curr => {
        curr.splice(idx, 1);
        return curr;
      });
    }

    if (!province.length) setAddressErrors(curr => {
      curr.push('State is required.');
      return curr;
    });
    else {
      const idx = addressErrors.indexOf('State is required.');
      setAddressErrors(curr => {
        curr.splice(idx, 1);
        return curr;
      });
    }

    if (!country.length) setAddressErrors(curr => {
      curr.push('Country is required.');
      return curr;
    });
    else {
      const idx = addressErrors.indexOf('Country is required.');
      setAddressErrors(curr => {
        curr.splice(idx, 1);
        return curr;
      });
    }

    if (!name.length) setTitleErrors('Title is required.');
    else setTitleErrors('');

    if (!description.length) setDescriptionErrors('Description is required.');
    else setDescriptionErrors('');

    if (price <= 0 || !price) setPriceErrors('Valid price is required.');
    else setPriceErrors('');

    // console.log(description)
    // console.log('description error', descriptionErrors)
    if (addressErrors.length || titleErrors || descriptionErrors || priceErrors) {
      setErrors(() => [...addressErrors, titleErrors, descriptionErrors, priceErrors]);
    } else {
      setErrors([]);
    }

  }, [address, city, province, country, name, description, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    console.log('update handleSubmit fired')
    // setErrors([]);

    if (errors.length) {
      console.log('update has errors, returned,', errors)
      return;
    }

    dispatch(spotsActions.updateOneSpot({
      address, city, state: province, country, name, description, price, lat: spot.lat, lng: spot.lng
    }, spot.id))
      .then((spot) => {
        console.log('update in dispatch success - checking spot', spot)
        setHasSubmitted(false);
        setNewSpot(spot);
        setSuccess(true);
        setShowSpotFormModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        console.log('update data returned: ', data)
        console.log('update data.errors', data.errors)
        if (data && data.errors) {
          setAddressErrors((errors) => {
            if (data.errors.address) errors.push(data.errors.address);
            if (data.errors.city) errors.push(data.errors.city);
            if (data.errors.state) errors.push(data.errors.state);
            if (data.errors.country) errors.push(data.errors.country);
            return errors;
          });

          setTitleErrors(data.errors.name);
          setDescriptionErrors(data.errors.description);
          setPriceErrors(data.errors.price);

          if (data.errors.lat || data.errors.lng) setValidationErrors(err => data.errors);
        }
      });
  }

  
  // css related //
  // const firstNameDiv = useRef(null);
  // const userNameDiv = useRef(null);
  // const passwordDiv = useRef(null);
  // css related //
  if (success) return (
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
              <div className='create-spot-address'>
                  <label htmlFor='address'>Street</label>
                  <input type='text' id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className='outline-wrapper'>
              <div className='create-spot-aptNum'>
                <label htmlFor='aptNum'>Apt, suite, etc. (Optional)</label>
                <input type='text' id="aptNum" value={aptNum} onChange={(e) => setAptNum(e.target.value)} />
              </div>
            </div>            
            <div className='outline-wrapper'>
                <div className='create-spot-city'>
                  <label htmlFor='city'>City</label>
                  <input type='text' id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
            </div>
            <div className='outline-wrapper'>
              <div className='create-spot-province'>
                <label htmlFor='province'>State</label>
                <input type='text' id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
              </div>
            </div>
            <div className='outline-wrapper'>
              <div className='create-spot-country'>
                <label htmlFor='country'>Country</label>
                <input type='text' id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
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
                <label htmlFor='price'>Price</label>
                <input type='number' id="price" value={price} onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setPrice(value);                  
                }} />
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

          <MyButton name={'Publish your listing'} />
        </form>
      </div>
    </div>
  )
}
