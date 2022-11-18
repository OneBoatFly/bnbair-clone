import {useState, useEffect} from 'react';
import './PriceQuery.css';
// import MyButton from '../../FormElements/MyButton';


export default function PriceQuery({ setQuery, hasSubmitted, setHasSubmitted, errors, setErrors, minPrice, setMinPrice, maxPrice, setMaxPrice}) {
    // const [minPrice, setMinPrice] = useState(10);
    // const [maxPrice, setMaxPrice] = useState(300);
  let priceErrors = {};
  if (errors) priceErrors = { minPrice: errors.minPrice, maxPrice: errors.maxPrice};
  const priceErrorsArr = Object.values(priceErrors);

    useEffect(() => {
      const hasErrors = {};
      if (minPrice < 0) hasErrors.minPrice = 'Minimum price must be greater than or equal to 0.';
      else delete hasErrors.minPrice;

      if (maxPrice < 0) hasErrors.maxPrice = 'Maximum price must be greater than or equal to 0.';
      else delete hasErrors.maxPrice;

      if (minPrice > maxPrice) hasErrors.minMax = 'Minimum price must be less than or equal to Maximum price.';
      else delete hasErrors.minMax;
      
      if (Object.values(hasErrors).length > 0) {
        setErrors((e) => {
          const newError = {...e}
          if (hasErrors.minPrice) newError.minPrice = hasErrors.minPrice;
          if (hasErrors.maxPrice) newError.maxPrice = hasErrors.maxPrice;
        })
      }

    }, [minPrice, maxPrice])
    // console.log('minPrice: ', minPrice)

  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete')
    if (!valid) {
      e.preventDefault();
    }
  }

  return (
    <div className='price-query-wrapper'>
        <div className='price-search-wrapper'>
          <div className='price-wrapper'>
            <label htmlFor='minPrice'>
              <div>min price</div>
              <div>
                <span>$</span>
                <input type="text" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} onKeyDown={handleKeyDown}></input>
              </div>
            </label>
          </div>
          <div className='price-wrapper middle'> - </div>
          <div className='price-wrapper'>
            <label htmlFor='maxPrice'>
              <div>max price</div>
              <div>
                <span>$</span>
                <input type="text" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} onKeyDown={handleKeyDown}></input>
              </div>
            </label>
          </div>
        {hasSubmitted && priceErrorsArr.map((err, idx) => {
            return (
              <div key={idx} className='error-messages-wrapper'>
                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                <span className='error-messages'>{err}</span>
              </div>
            )
          })}
        </div>

    </div>
  )
}
