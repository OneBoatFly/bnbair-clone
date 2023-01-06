import React, { useEffect, useRef, useState } from 'react'
import { handleLabelSmall, handleLabelBig, handleDivBottomBorder, handleDivBottomBorderOut } from '../../styles';
import './MultiAddress.css';

const countryCodes = require('country-codes-list');

export default function MultiAddress({ formData, setFormData, hasSubmitted, addressErrors, setAddressErrors, geoError }) {
  const myCountryCodesObject = countryCodes.customList('countryCode', '{countryNameEn} - {countryCode}')
  const myCountryCodesArr = Object.values(myCountryCodesObject);

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

  useEffect(() => {
    const hasAddressErrors = {};

    if (!formData.address.length) hasAddressErrors.street = 'Street is required.';
    else if (formData.address.length > 255) hasAddressErrors.street = 'Street must be less than 255 characters.';
    else {
      delete hasAddressErrors.street;
      handleLabelSmall(streetLabel, streetInput);
    }

    if (!formData.city.length) hasAddressErrors.city = 'City is required.';
    else if (formData.city.length > 255) hasAddressErrors.city = 'City must be less than 255 characters.';
    else {
      delete hasAddressErrors.city;
      handleLabelSmall(cityLabel, cityInput);
    }

    if (!formData.province.length) hasAddressErrors.province = 'State is required.';
    else if (formData.province.length > 255) hasAddressErrors.province = 'State must be less than 255 characters.';
    else {
      delete hasAddressErrors.province;
      handleLabelSmall(provinceLabel, provinceInput);
    }

    // console.log(country, country.length > 255)
    if (!formData.country.length) hasAddressErrors.country = 'Country is required.';
    else if (formData.country.length > 255) hasAddressErrors.country = 'Country must be less than 255 characters.';
    else {
      delete hasAddressErrors.country;
      handleLabelSmall(countryLabel, countryInput);
    }

    if (Object.values(hasAddressErrors).length) {
      setAddressErrors(Object.values(hasAddressErrors));
    } else {
      setAddressErrors([]);
    }

  }, [formData.address, formData.city, formData.province, formData.country, setAddressErrors]);
  console.log(formData)

  if (!formData) return null;

  return (
    <div className='multi-create-address'>
      <div className='create-spot fullAddress-wrapper'>
        <div className='outline-wrapper street-wrapper' ref={streetDivRef}
          onFocus={() => handleDivBottomBorder(streetDivRef)} onBlur={() => handleDivBottomBorderOut(streetDivRef)}>
          <div className='create-spot-address' onFocus={() => handleLabelSmall(streetLabel)} onBlur={() => handleLabelBig(streetLabel, streetInput)}>
            <div className='label-div' ref={streetLabel}>
              <label htmlFor='address' >Street</label>
            </div>
            <div className='input-div' ref={streetInput} >
              <input type='text' id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value})} />
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
            <div className='label-div' ref={cityLabel}>
              <label htmlFor='city'>City</label>
            </div>
            <div className='input-div' ref={cityInput}>
              <input type='text' id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
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
            <div className='label-div' ref={provinceLabel}>
              <label htmlFor='province'>State</label>
            </div>
            <div className='input-div' ref={provinceInput}>
              <input type='text' id="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} />
            </div>
          </div>
        </div>

        <div className='outline-wrapper country-wrapper' ref={countryDivRef} onFocus={() => {
          handleDivBottomBorder(provinceDivRef);
        }} onBlur={() => {
          handleDivBottomBorderOut(provinceDivRef);
        }}>
          <div className='create-spot-country' onFocus={() => handleLabelSmall(countryLabel)} onBlur={() => handleLabelBig(countryLabel, countryInput)}>
            <div className='label-div' ref={countryLabel}>
              <label htmlFor='country'>Country / Region</label>
            </div>
            <div className='input-div multi-create-country-input-div' ref={countryInput}>
              <select 
                name='country'
                id='country'
                defaultValue={'United States of America - US' || 'Select'}
                value={formData.country}
                className='multi-form-country-select'
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                {myCountryCodesArr?.map(countryWCode => {
                  return (
                    <option key={countryWCode} value={countryWCode}>
                      {countryWCode}
                    </option>
                  )
                })}
              </select>
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
      {hasSubmitted && geoError.length > 0 &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{geoError}</span>
        </div>
      }
    </div>
  )
}
