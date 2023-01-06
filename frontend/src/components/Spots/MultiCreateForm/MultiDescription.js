import React, { useEffect } from 'react'

export default function MultiDescription({ formData, setFormData, hasSubmitted, descriptionErrors, setDescriptionErrors }) {


  useEffect(() => {
    if (!formData.description.length) setDescriptionErrors('Description is required.');
    else if (formData.description.length > 500) setDescriptionErrors('Description must be less than 500 characters.');
    else setDescriptionErrors('');
  }, [formData.description, setDescriptionErrors])

  // console.log('descriptionErrors', descriptionErrors)

  if (!formData) return null;

  return (
    <div className='multi-create-description'>
      <div className='create-spot'>
        <div className='outline-wrapper description-wrapper'>
          <div className='create-spot-description'>
            <textarea id="description" placeholder='An awesone place' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} ></textarea>
          </div>
        </div>
      </div>
      {hasSubmitted && descriptionErrors.length > 0 &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{descriptionErrors}</span>
        </div>
      }
    </div>
  )
}
