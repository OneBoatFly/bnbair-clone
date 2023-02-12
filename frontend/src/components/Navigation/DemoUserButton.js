import React from 'react';
import './DemoUserButton.css';
import { handleMouseMove } from '../styles';

import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function DemoUserButton({ setIsLoaded }) {
    const dispatch = useDispatch();

    const credential = 'Yizhou';
    const password = 'password';

    const handleDemoUser = () => {
        dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                setIsLoaded(true);
                window.localStorage.setItem('isLoaded', true);
            });
    }

  return (
    <div className='demo-user-button-div'>
        <button onClick={handleDemoUser}>
            <span onMouseMove={handleMouseMove} className='demo-user-button-div-outer-span'><span className='demo-user-button-div-inner-span'></span></span>
            <span className='demo-user-button-div-lower-span'>Demo User</span>
        </button>
    </div>
  )
}
