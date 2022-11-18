import React from 'react';
import './ShowAllPhotos.css';

export default function ShowAllPhotos({ spotImages, setShowAllImages }) {
  return (
    <div className='show-all-photos-div'>
        <div className='all-photo-grid'>
            <i className="fa-solid fa-chevron-left all-photos" onClick={() => setShowAllImages(false)}></i>
        </div>
        {spotImages.length > 0 ? <div className='all-photos-wrapper'>
            <div className='all-photos-sub'>
                {spotImages.map((img, idx) => {
                    const big = idx % 3 === 0 ? 'single-image-div-big' : 'single-image-div-small'
                    return (
                        <div key={idx} className={big}>
                            <img src={`${img.url}`} alt='room' />
                        </div>
                    )
                })}

            </div>
        </div> : <div>No image</div>}
    </div>
  )
}
