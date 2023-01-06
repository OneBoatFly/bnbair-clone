import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAmenities } from '../../../store/spots';
import './MultiAmenities.css';

export default function MultiAmenities({ formData, setFormData }) {
  const dispatch = useDispatch();
  const amenities = useSelector(state => state.spots.amenities);

  useEffect(() => {
    dispatch(getAmenities())
  }, [dispatch])

  const clickBasic = (field) => {
    const currentFormData = {...formData};
    if (currentFormData.amenityBasic[field]) {
      delete currentFormData.amenityBasic[field]
    } else {
      currentFormData.amenityBasic[field] = true
    }

    setFormData(currentFormData)
    // setFormData({
    //   ...formData,
    //   amenityBasic: {
    //     ...formData.amenityBasic,
    //     [field]: !formData.amenityBasic[field]
    //   }
    // })
  }

  const clickStandout = (field) => {
    const currentFormData = { ...formData };
    if (currentFormData.amenityStandout[field]) {
      delete currentFormData.amenityStandout[field]
    } else {
      currentFormData.amenityStandout[field] = true
    }

    setFormData(currentFormData)
  }

  const clickSafety = (field) => {
    const currentFormData = { ...formData };
    if (currentFormData.amenitySafety[field]) {
      delete currentFormData.amenitySafety[field]
    } else {
      currentFormData.amenitySafety[field] = true
    }

    setFormData(currentFormData)
  }

  if (!formData) return null;
  return (
    <div className='multi-create-rooms'>
      {amenities &&
        <>
          <div className='multi-create-rooms-section-div'>
            {amenities.amenityBasic?.map((amenity, idx) => {
              const divSelected = formData.amenityBasic[amenity.field];

              return (
                <div key={`${amenity.field}`} 
                  className={`multi-create-amenities-single-div ${divSelected ? 'amenity-selected' : ''}`} 
                  onClick={() => clickBasic(amenity.field)}>
                  <img src={amenity.url} alt='' />
                  <span className='amenityer-date'>{amenity.type}</span>
                </div>
              )
            })}
          </div>

          <span>Do you have any standout amenities?</span>
          <div className='multi-create-rooms-section-div'>
            {amenities.amenityStandout?.map((amenity, idx) => {
              const divSelected = formData.amenityStandout[amenity.field];

              return (
                <div key={`${amenity.field}`}
                  className={`multi-create-amenities-single-div ${divSelected ? 'amenity-selected' : ''}`}
                  onClick={() => clickStandout(amenity.field)}>
                  <img src={amenity.url} alt='' />
                  <span className='amenityer-date'>{amenity.type}</span>
                </div>
              )
            })}
          </div>

          <span>Do you have any of these safety items?</span>
          <div className='multi-create-rooms-section-div'>
            {amenities.amenitySafety?.map((amenity, idx) => {
              const divSelected = formData.amenitySafety[amenity.field];

              return (
                <div key={`${amenity.field}`}
                  className={`multi-create-amenities-single-div ${divSelected ? 'amenity-selected' : ''}`}
                  onClick={() => clickSafety(amenity.field)}>
                  <img src={amenity.url} alt='' />
                  <span className='amenityer-date'>{amenity.type}</span>
                </div>
              )
            })}
          </div>               
        </>
      }
    </div>
  )
}
