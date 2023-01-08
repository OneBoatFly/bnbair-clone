import React from 'react';
import './MultiRooms.css';

export default function MultiRooms({ formData, setFormData }) {

  console.log('formData', formData)
  if (!formData) return null;
  return (
    <div className='multi-create-rooms'>
      <div className='multi-create-rooms-single-div'>
        <span>Guests</span>
        <div className='multi-create-rooms-toggle-div'>
          <i className={`fa-solid fa-minus multi-create-toggle-icon ${formData.guests === 1 && 'toggle-disabled'}`} 
            onClick={() => {
              if (formData.guests <= 1) return;
              setFormData({ ...formData, guests: formData.guests - 1 })
          }}/>
          <span className="multi-create-rooms-number">{formData.guests}</span>
          <i className={`fa-solid fa-plus multi-create-toggle-icon ${formData.guests === 16 && 'toggle-disabled'}`} 
            onClick={() => {
              if (formData.guests >= 16) return;
              setFormData({ ...formData, guests: formData.guests + 1 })
          }}/>
        </div>
      </div>

      <div className='multi-create-rooms-single-div'>
        <span>Bedrooms</span>
        <div className='multi-create-rooms-toggle-div'>
          <i className={`fa-solid fa-minus multi-create-toggle-icon ${formData.bedrooms === 1 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.bedrooms <= 1) return;
              setFormData({ ...formData, bedrooms: formData.bedrooms - 1 })
            }} />
          <span className="multi-create-rooms-number">{formData.bedrooms}</span>
          <i className={`fa-solid fa-plus multi-create-toggle-icon ${formData.bedrooms === 50 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.bedrooms >= 50) return;
              setFormData({ ...formData, bedrooms: formData.bedrooms + 1 })
            }} />
        </div>
      </div>

      <div className='multi-create-rooms-single-div'>
        <span>Beds</span>
        <div className='multi-create-rooms-toggle-div'>
          <i className={`fa-solid fa-minus multi-create-toggle-icon ${formData.beds === 1 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.beds <= 1) return;
              setFormData({ ...formData, beds: formData.beds - 1 })
            }} />
          <span className="multi-create-rooms-number">{formData.beds}</span>
          <i className={`fa-solid fa-plus multi-create-toggle-icon ${formData.beds === 16 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.beds >= 16) return;
              setFormData({ ...formData, beds: formData.beds + 1 })
            }} />
        </div>
      </div>

      <div className='multi-create-rooms-single-div'>
        <span>Bathrooms</span>
        <div className='multi-create-rooms-toggle-div'>
          <i className={`fa-solid fa-minus multi-create-toggle-icon ${formData.bathrooms === 0.5 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.bathrooms <= 0.5) return;
              setFormData({ ...formData, bathrooms: formData.bathrooms - 0.5 })
            }} />
          <span className="multi-create-rooms-number">{formData.bathrooms}</span>
          <i className={`fa-solid fa-plus multi-create-toggle-icon ${formData.bathrooms === 50 && 'toggle-disabled'}`}
            onClick={() => {
              if (formData.bathrooms >= 50) return;
              setFormData({ ...formData, bathrooms: formData.bathrooms + 0.5 })
            }} />
        </div>
      </div>      
    </div>
  )
}
