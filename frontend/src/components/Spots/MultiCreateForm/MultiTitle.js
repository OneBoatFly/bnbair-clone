import React, { useEffect } from 'react';
import './MultiTitle.css';

export default function MultiTitle({ formData, setFormData, hasSubmitted, titleErrors, setTitleErrors }) {
  useEffect(() => {
    if (formData.name === 'Unpublished') {
      setFormData({ ...formData, name:''})
    }
  }, [])

  useEffect(() => {
    if (!formData.name.length) setTitleErrors('Title is required.');
    else if (formData.name.length > 32) setTitleErrors('Title must be less than 32 characters.');
    else setTitleErrors('');
  }, [formData.name, setTitleErrors])

  if (!formData) return null;

  return (
    <div className='multi-create-title'>
      <div className='create-spot '>
        <div className='outline-wrapper name-wrapper multi-create-title-spot-name'>
          <div className='create-spot-name'>
            <textarea placeholder="An Aawesome Place" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
        </div>
      </div>
      {hasSubmitted && titleErrors &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{titleErrors}</span>
        </div>
      }
    </div>
  )
}
