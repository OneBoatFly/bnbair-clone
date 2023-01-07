import React from 'react';
import { useSelector} from 'react-redux';
import './MultiAmenities.css';

export default function MultiAmenities({ formData, setFormData }) {
  const amenities = useSelector(state => state.spots.amenities);

  const clickBasic = (field) => {
    const currentFormData = {...formData};
    if (currentFormData.amenityBasic[field]) {
      delete currentFormData.amenityBasic[field]
    } else {
      currentFormData.amenityBasic[field] = true
    }

    setFormData(currentFormData)
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
              let divSelected = false;
              if (formData.amenityBasic) divSelected = formData.amenityBasic[amenity.field];

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
              let divSelected = false;
              if (formData.amenityStandout) divSelected = formData.amenityStandout[amenity.field];

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
              let divSelected = false;
              if (formData.amenitySafety) divSelected = formData.amenitySafety[amenity.field];

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
