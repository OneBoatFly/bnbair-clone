import React, { useEffect, useState } from 'react'
import { csrfFetch } from '../../../store/csrf';

export default function MultiDescription({ formData, setFormData, hasSubmitted, descriptionErrors, setDescriptionErrors }) {
  const [AILoading, setAILoading] = useState(false);
  const [AIError, setAIError] = useState('');

  const AIClick = async () => {
    // console.log('AI Button')
    setAILoading(true)
    setAIError('')

    const query = {
      city: formData.city,
      state: formData.province,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      beds: formData.beds,
      amenityBasic: formData.amenityBasic,
      amenityStandout: formData.amenityStandout,
      amenitySafety: formData.amenitySafety,
      type: 'description'
    }
    // console.log(query)

    const options = {
      method: 'POST',
      body: JSON.stringify(query)
    };

    csrfFetch('/api/spotai', options)
      .then(async (response) => {
        // console.log(response)
        let data = await response.json()
        setFormData({ ...formData, description: data })
        setAILoading(false)
      })
      .catch((error) => {
        // console.log('error', error)
        setAIError('An Error occurred. Please try again.')
        setAILoading(false)
      })
  }

  useEffect(() => {
    if (formData.description === 'Unpublished') {
      setFormData({ ...formData, description: '' })
    }
  }, [])

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
        <div className='ai-button-wrapper'>
          <button className='main-create-button ai-help' onClick={AIClick}>Auto-Generate a Description</button>
          {AILoading &&
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
          {AIError.length > 0 &&
            <div className='error-messages-wrapper'>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
              <span className='error-messages'>{AIError}</span>
            </div>
          }
        </div>        
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
