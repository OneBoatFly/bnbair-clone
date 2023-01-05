import React, { useEffect, useState } from 'react'

export default function MultiDescription({ formData, setFormData, hasSubmitted }) {

  const [descriptionErrors, setDescriptionErrors] = useState('');

  useEffect(() => {
    if (!formData.description.length) setDescriptionErrors('Description is required.');
    else if (formData.description.length > 500) setDescriptionErrors('Description must be less than 500 characters.');
    else setDescriptionErrors('');
  }, [formData.description])

  return (
    <div className='multi-create-description'>
      <div className='create-spot'>
        <div className='outline-wrapper description-wrapper'>
          <div className='create-spot-description'>
            <textarea id="description" placeholder='An awesone place' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} ></textarea>
          </div>
        </div>
      </div>
      {hasSubmitted && descriptionErrors &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{descriptionErrors}</span>
        </div>
      }
    </div>
  )
}
