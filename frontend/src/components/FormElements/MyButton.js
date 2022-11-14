import React from 'react';
import { handleMouseMove } from '../styles';

import './MyButton.css';

export default function MyButton({name}) {
  return (
    <div className='button-div'>
        <button>
            <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
            <span className='lower-span'>{name}</span>
        </button>
    </div>
  )
}
