import React from 'react';
import airbnbSuperBlack from '../../pictures/airbnb-super-black.png';
import './SpotDetailHostLoc.css';

export default function SpotDetailHostLoc({ spot }) {
  return (
    <>
        {spot?.Owner?.isSuperhost && 
            <div className='spot-detail-super-loc-div'>
                <span className='line-divider-dot'>·</span>
                <img className='airbnb-super-black' src={airbnbSuperBlack} alt=''/>
                <span style={{'fontWeight':'400'}}>Superhost</span>
            </div>
        }
        {spot &&
            <div className='spot-detail-super-loc-div'>
                <span className='line-divider-dot'>·</span>
                <a href='#spot-detail-map'>{spot.city}, {spot.state}, {spot.country}</a>
            </div>
        }
    </>
  )
}
