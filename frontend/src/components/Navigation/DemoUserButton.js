import React, { useState } from 'react';
import './DemoUserButton.css';
import { handleMouseMove } from '../styles';

import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function DemoUserButton({ setIsLoaded }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    const credential = 'DemoUser';
    const password = 'password';

    const handleDemoUser = () => {
        console.log('clicked');

        dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                setIsLoaded(true);
                window.localStorage.setItem('isLoaded', true);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

  return (
    <div className='demo-user-button-div'>
        <button onClick={handleDemoUser}>
            <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
            <span className='lower-span'>Demo User</span>
        </button>
    </div>
  )
}
