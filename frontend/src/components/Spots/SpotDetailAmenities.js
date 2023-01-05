import React, { useState } from 'react';
import './SpotDetailAmenities.css';

export default function SpotDetailAmenities({ spot }) {

  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const spotAmenities = spot.Amenities;

  return (
    <>
      <div className='spot-amenities-wrapper'>
        {
          spotAmenities?.map((amenity, idx) => {
            if (idx < 5) {
              return (
                <div key={`${amenity}-${idx}`} className='single-amenities-wrapper'>
                  <img src={amenity.url} alt='' />
                  <span className='amenityer-date'>{amenity.type}</span>
                </div>
              )
            } else {
              return (
                showAllAmenities &&
                <div key={`${amenity}-${idx}`} className='single-amenities-wrapper'>
                  <img src={amenity.url} alt='' />
                  <span className='amenityer-date'>{amenity.type}</span>
                </div>
              )
            }
          })
        }
      </div>
      {
        spotAmenities?.length > 5 &&
        <button onClick={() => setShowAllAmenities((curr) => !curr)} className='modify-buttons single-button'>
          <span>{showAllAmenities ? 'Hide' : 'Show'} all {spotAmenities.length} Amenities</span>
        </button>
      }
    </>
  )
}
