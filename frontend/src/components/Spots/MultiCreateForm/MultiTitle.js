import React, { useEffect, useState } from 'react'

export default function MultiTitle({formData, setFormData}) {

  const [titleErrors, setTitleErrors] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!formData.name.length) setTitleErrors('Title is required.');
    else if (formData.name.length > 50) setTitleErrors('Title must be less than 50 characters.');
    else setTitleErrors('');
  }, [formData.name])

  return (
    <div className='multi-create-title'>
      <div className='create-spot '>
        <div className='outline-wrapper name-wrapper'>
          <div className='create-spot-name'>
            <input type='text' placeholder="An Aawesome Place" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
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
