import React, { useEffect, useState } from 'react';
import './MultiTitle.css';
import { csrfFetch } from '../../../store/csrf';

export default function MultiTitle({ formData, setFormData, hasSubmitted, titleErrors, setTitleErrors }) {
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
      type: 'title'
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
        setFormData({ ...formData, name: data })
        setAILoading(false)
      })
      .catch((error) => {
        // console.log('error', error)
        setAIError('An Error occurred. Please try again.')
        setAILoading(false)
      })
  }
  
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
      <div className='create-spot'>
        <div className='ai-button-wrapper'>
          <button className='main-create-button ai-help' onClick={AIClick}>Auto-Generate a Title</button>
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
