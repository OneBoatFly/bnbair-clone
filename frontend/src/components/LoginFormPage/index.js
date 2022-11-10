import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './LoginFormPage.css';

export default function LoginFormPage() {
    const handleMouseMove = (e) => {
        const butt = e.target
        const rect = butt.getBoundingClientRect(); // has to bound on the element the background position is set with xy

        const x = (e.clientX - rect.left) * 100 / butt.clientWidth;
        const y = (e.clientY - rect.top) * 100 / butt.clientHeight;
        butt.style.setProperty('--mouse-x', x);
        butt.style.setProperty('--mouse-y', y);
    }

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('handleSubmit fired')
        setErrors([]);
        dispatch(sessionActions.login({credential, password}))
            .catch(async (res) => {
                const data = await res.json();
                // console.log('data returned: ', data)
                // console.log('data.errors', data.errors)
                if (data && data.errors) setErrors(data.errors);
            });
    }

    // console.log('errors', errors)

    if (sessionUser) return (
        <Redirect to='/' />
    )

    return (
        <div className='login-all-wrapper'>
            <div className='login-all'>
                <div className='login welcome'>
                    <h3>Welcome to Airbnb</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='login inputs'>
                        <div className='login credential'>
                            <label htmlFor='credential'>Username or Email</label>
                            <input type='text' id="credential" value={credential} onChange={(e) => setCredential(e.target.value)} />
                        </div>
                        <div className='login password'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='login errors'>
                        <ul>
                            {errors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                    <div className='login button-div' >
                        <button>
                            <span onMouseMove={handleMouseMove} id='outer-span'><span id='inner-span'></span></span>                            
                            <span id='login-span'>Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
