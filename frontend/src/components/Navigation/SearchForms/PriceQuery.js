import {useState, useEffect} from 'react';
import './PriceQuery.css';
import MyButton from '../../FormElements/MyButton';
import * as spotsReducerActions from '../../../store/spots';
import { useDispatch } from 'react-redux';

export default function PriceQuery({ query, setQuery, setShowDropDown }) {
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(1200);
    const [errors, setErrors] = useState([]);

    const hasErrors = {};
    useEffect(() => {
      if (minPrice < 0) hasErrors.minPrice = 'Minimum price must be greater than or equal to 0.';
      else delete hasErrors.minPrice;

      if (maxPrice < 0) hasErrors.maxPrice = 'Maximum price must be greater than or equal to 0.';
      else delete hasErrors.maxPrice;

      if (minPrice > maxPrice) hasErrors.minMax = 'Minimum price must be less than or equal to Maximum price.';
      else delete hasErrors.minMax;
      
    }, [minPrice, maxPrice])
    // console.log('minPrice: ', minPrice)

  const handleKeyDown = (e) => {
    // console.log(e.key, typeof e.key, e.key === 'Backspace', /[0-9]/.test(e.key), (e.key === 'Backspace') || /0-9/.test(e.key))
    const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab')
    if (!valid) {
      e.preventDefault();
    }
  }

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(e.target)

    if (Object.values(hasErrors).length) {
      // console.log('hasErrors', hasErrors)
      setErrors(Object.values(hasErrors));
      return;
    } else {
      // console.log('setQuery')
      setQuery(query => {
        const newQuery = {...query}
        newQuery.minPrice = minPrice;
        newQuery.maxPrice = maxPrice;
        // console.log(newQuery)
        return newQuery;
      });

      dispatch(spotsReducerActions.getAllSpotsWithQuery(query))
        .then(() => {
          console.log('gets here')
          setShowDropDown(false);
        })
    }
  }

  return (
    <div className='price-query-wrapper'>
      <form className='price-query-sub-wrapper' onSubmit={handleSearch}>
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
        <MyButton name="Search" ></MyButton>
      </form>
    </div>
  )
}
