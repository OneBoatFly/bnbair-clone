import React from 'react';
import './SpotDetailRooms.css';

export default function SpotDetailRooms({spot}) {
  return (
      <div className='spot-detail-rooms-div'>
          {spot &&
            <>
                <span>{spot.guests} {spot.guests > 1 ? 'guests' : 'guest'}</span>
                <span className='line-divider-dot'>·</span>
                <span>{spot.bedrooms} {spot.bedrooms > 1 ? 'bedrooms' : 'bedroom'}</span>
                <span className='line-divider-dot'>·</span>
                <span>{spot.beds} {spot.beds > 1 ? 'beds' : 'bed'}</span>
                <span className='line-divider-dot'>·</span>
                <span>{spot.bathrooms} {spot.bathrooms > 1 ? 'bathrooms' : 'bathroom'}</span>
            </>
          }
      </div>
  )
}
