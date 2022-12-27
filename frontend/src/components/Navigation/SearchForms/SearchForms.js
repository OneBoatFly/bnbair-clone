import React from 'react'
import MyButton from '../../FormElements/MyButton'
import PriceQuery from './PriceQuery'
import WhereQuery from './WhereQuery'
import './SearchForms.css'
import { useSelector } from 'react-redux'

export default function SearchForms({ hasSubmitted, setHasSubmitted, errors, setErrors, minPrice, setMinPrice, maxPrice, setMaxPrice, minLat, setMinLat, maxLat, setMaxLat, minLng, setMinLng, maxLng, setMaxLng }) {
  const key = useSelector((state) => state.maps.key);

  if (!key) {
    return null;
  }

  return (
    <div className='search-drop-down'>
      <WhereQuery apiKey={key} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minLat={minLat} setMinLat={setMinLat} maxLat={maxLat} setMaxLat={setMaxLat} minLng={minLng} setMinLng={setMinLng} maxLng={maxLng} setMaxLng={setMaxLng} />
      <PriceQuery hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      <MyButton name="Search" ></MyButton>
    </div>
  )
}
