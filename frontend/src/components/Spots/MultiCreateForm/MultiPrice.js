import React, { useEffect } from 'react';
import "./MultiPrice.css";

export default function MultiPrice({ formData, setFormData, hasSubmitted, priceErrors, setPriceErrors }) {

  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete')
    if (!valid) {
      e.preventDefault();
    }
  }

  const handlePrice = (e) => {
    let numPrice = e.target.value.replace(/\$+/g, '');
    let newPrice = `$${numPrice}`;
    setFormData({ ...formData, price: newPrice, realPrice: parseInt(numPrice) || 0 });
  }

  useEffect(() => {
    if (formData.realPrice < 10 || !formData.realPrice || formData.realPrice >= 10000) setPriceErrors("Please enter a base price between $10 and $10,000.");
    else setPriceErrors('');
  }, [formData.realPrice, setPriceErrors])

  if (!formData) return null;

  return (
    <div className='multi-create-price'>
      <div className='create-spot'>
        <i className={`fa-solid fa-minus ${formData.realPrice <= 10 && 'toggle-disabled'} multt-create-price-toggle`}
          onClick={() => {
            if (formData.realPrice <= 10) return;
            setFormData({ ...formData, realPrice: parseInt(formData.realPrice) - 5, price: `$${parseInt(formData.realPrice) - 5}` })
          }} />

        <div className='outline-wrapper price-wrapper'>
          <div className='create-spot-price' style={{ display: 'flex' }}>
            <input type='text' id="price" value={formData.price} onChange={(e) => handlePrice(e)} onKeyDown={handleKeyDown} />
          </div>
        </div>

        <i className={`fa-solid fa-plus ${formData.realPrice >= 10000 && 'toggle-disabled'} multt-create-price-toggle`}
          onClick={() => {
            if (formData.realPrice >= 10000) return;
            setFormData({ ...formData, realPrice: parseInt(formData.realPrice) + 5, price: `$${parseInt(formData.realPrice) + 5}` })
          }} />
      </div>
      <span className='multi-create-price-span'>per night</span>

      {priceErrors.length > 0 &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{priceErrors}</span>
        </div>
      }
    </div>
  )
}
