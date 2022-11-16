import React from 'react';
import { handleMouseMove } from '../styles';

import './MyButton.css';

export default function MyButton({ name, disabled }) {
  // console.log('MyButton disabled?', disabled)
  return (
    <div className='button-div'>
      <button disabled={disabled}>
            <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
            <span className='lower-span'>{name}</span>
        </button>
    </div>
  )
}
