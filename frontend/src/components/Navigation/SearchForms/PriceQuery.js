import React, {useState, useEffect} from 'react';
import './PriceQuery.css';


export default function PriceQuery({ hasSubmitted, errors, setErrors, minPrice, setMinPrice, maxPrice, setMaxPrice}) {
  const [priceErrors, setPriceErrors] = useState({})

    useEffect(() => {
      const hasErrors = {};
      if (minPrice < 0 || maxPrice < 0) hasErrors.prices = 'Prices must be greater than or equal to 0.';
      else delete hasErrors.prices;

      if (maxPrice > 0 && minPrice > maxPrice) hasErrors.minMax = 'Minimum price must be less than or equal to Maximum price.';
      else delete hasErrors.minMax;
      
      console.log(hasErrors, minPrice, maxPrice)
      setErrors(hasErrors)
      setPriceErrors(hasErrors)

    }, [minPrice, maxPrice])

  const handleKeyDown = (e) => {
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete')
    if (!valid) {
      e.preventDefault();
    }
  }

  console.log('price --------- errors', errors)

  return (
    <div className='price-query-wrapper'>
      <div className='price-search-wrapper'>
        <div className='price-query-input-wrapper'>
          <label htmlFor='minPrice'>
            <div>min price</div>
            <div className='minMax-price-div'>
              <span>$</span>
              <input type="text" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} onKeyDown={handleKeyDown}></input>
            </div>
          </label>
        </div>
        <div className='price-query-dash'> – </div>
        <div className='price-query-input-wrapper'>
          <label htmlFor='maxPrice'>
            <div>max price</div>
            <div className='minMax-price-div'>
              <span>$</span>
              <input type="text" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} onKeyDown={handleKeyDown}></input>
            </div>
          </label>
        </div>       
      </div>
      {hasSubmitted && priceErrors.prices &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{errors.prices}</span>
        </div>
      }
      {hasSubmitted && priceErrors.minMax &&
        <div className='error-messages-wrapper'>
          <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
          <span className='error-messages'>{errors.minMax}</span>
        </div>
      } 
    </div>
  )
}
