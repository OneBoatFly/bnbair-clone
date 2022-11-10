import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

// import './signupFormPage.css';

export default function SignupFormPage() {
    const handleMouseMove = (e) => {
        const butt = e.target
        const rect = butt.getBoundingClientRect(); // has to bound on the element the background position is set with xy

        const x = (e.clientX - rect.left) * 100 / butt.clientWidth;
        const y = (e.clientY - rect.top) * 100 / butt.clientHeight;
        butt.style.setProperty('--mouse-x', x);
        butt.style.setProperty('--mouse-y', y);
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [birthday, setBirthday] = useState(''); this is not in backend yet.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('handleSubmit fired')
        setErrors([]);
        // dispatch(sessionActions.signup({ credential, password }))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         // console.log('data returned: ', data)
        //         // console.log('data.errors', data.errors)
        //         if (data && data.errors) setErrors(data.errors);
        //     });
    }

    // console.log('errors', errors)

    // if (sessionUser) return (
    //     <Redirect to='/' />
    // )

    return (
        <div className='signup-all-wrapper'>
            <div className='signup-all'>
                <form onSubmit={handleSubmit}>
                    <div className='signup fullName-wrapper'>
                        <div className='signup firstName'>
                            <label htmlFor='firstName'>First name</label>
                            <input type='text' id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='signup lastName'>
                            <label htmlFor='lastName'>Last name</label>
                            <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <span>Make sure it matches the name on your government ID.</span>
                        </div>
                    </div>
                    <div className='signup email-wrapper'>
                        <div className='signup email'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>                        
                    </div>
                    <div className='signup password-wrapper'>
                        <div className='signup password'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='signup passwordConfirm'>
                            <label htmlFor='passwordConfirm'>Confirm Password</label>
                            <input type='password' id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </div>                        
                    </div>                    
                    <div className='signup errors'>
                        <ul>
                            {errors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                    <div className='signup button-div' >
                        <button>
                            <span onMouseMove={handleMouseMove} id='outer-span'><span id='inner-span'></span></span>
                            <span id='signup-span'>Agree and signup</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
