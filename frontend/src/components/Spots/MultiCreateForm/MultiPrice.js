import React, { useEffect, useState } from 'react'

export default function MultiPrice({ formData, setFormData, hasSubmitted }) {

  const [priceErrors, setPriceErrors] = useState('');

  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete')
    if (!valid) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (formData.price <= 0 || !formData.price) setPriceErrors('Valid price is required.');
    else setPriceErrors('');
  }, [formData.price])

  if (!formData) return null;
  
  return (
    <div className='multi-create-price'>
      <div className='create-spot'>
        <div className='outline-wrapper price-wrapper'>
          <div className='create-spot-price' style={{ display: 'flex' }}>
            {/* <label htmlFor='price'>Price</label> */}
            <span>$</span><input type='text' id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} onKeyDown={handleKeyDown} />
          </div>
        </div>
      </div>
      {/* {console.log('price', priceErrors)} */}
      {hasSubmitted && priceErrors &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{priceErrors}</span>
        </div>
      }
    </div>
  )
}
