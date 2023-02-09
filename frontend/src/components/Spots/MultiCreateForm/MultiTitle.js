import React, { useEffect, useState } from 'react';
import './MultiTitle.css';
import { csrfFetch } from '../../../store/csrf';

export default function MultiTitle({ formData, setFormData, hasSubmitted, titleErrors, setTitleErrors }) {
  const [AILoading, setAILoading] = useState(false);

  const AIClick = async () => {
    console.log('AI Button')
    setAILoading(true)

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
    console.log(query)

    const options = {
      method: 'POST',
      body: JSON.stringify(query)
    };

    const response = await csrfFetch('/api/spotai', options);

    if (response.ok) {
      let data = await response.json()
      console.log(data) // "\n\nCozy Woodinville Home: 1BR, WiFi, Kitchen+"
      console.log(data.result)
      setFormData({ ...formData, name: data.result.slice(2) })
    } else{
      console.log('error')
      console.log(response)
    }

    setAILoading(false)
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
        <div>
          <button className='main-create-button ai-help' onClick={AIClick}>Auto-Generate a Title</button>
          {AILoading && <span>Loading...</span>}
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
