import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './SignupFormPage.css';
import { handleMouseMove, handleDivTopBorder, handleDivTopBorderOut } from '../styles';

export default function SignupFormPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState(''); // this is not in backend yet.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('handleSubmit fired')
        setErrors([]);
        dispatch(sessionActions.signup({ 
            firstName,
            lastName,
            username,
            email,
            password 
        })).catch(async (res) => {
                const data = await res.json();
                console.log('data returned: ', data)
                console.log('data.errors', data.errors)
            if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }

    // console.log('errors', errors)

    // css related //
    const firstNameDiv = useRef(null);
    const userNameDiv = useRef(null);
    const passwordDiv = useRef(null);
    // css related //

    if (sessionUser) return (
        <Redirect to='/' />
    )

    return (
        <div className='signup-all-wrapper'>
            <div className='signup-all'>
                <form onSubmit={handleSubmit}>
                    <div className='signup fullName-wrapper'>
                        <div className='signup firstName' ref={firstNameDiv} onFocus={() => handleDivTopBorder(firstNameDiv)} onBlur={() => handleDivTopBorderOut(firstNameDiv)}>
                            <div className='signup radius-wrapper'>
                                <label htmlFor='firstName'>First name</label>
                                <input type='text' id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                        </div>
                        <div className='signup lastName' onFocus={() => handleDivTopBorder(firstNameDiv)} onBlur={() => handleDivTopBorderOut(firstNameDiv)}>
                            <div className='signup radius-wrapper'>
                                <label htmlFor='lastName'>Last name</label>
                                <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <span className='signup-comments'>Make sure it matches the name on your government ID.</span>
                        </div>
                    </div>
                    <div className='signup birthday-wrapper'>
                        <div className='signup birthday'>
                            <label htmlFor='birthday'>Birthday</label>
                            <input type='date' id='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                        </div>
                        <div>
                            <span className='signup-comments'>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</span>
                        </div>                      
                    </div>
                    <div className='signup email-username-wrapper'>
                        <div className='signup username' ref={userNameDiv} onFocus={() => handleDivTopBorder(userNameDiv)} onBlur={() => handleDivTopBorderOut(userNameDiv)}>
                            <div className='signup radius-wrapper'>
                                <label htmlFor='username'>Username</label>
                                <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>                        
                        <div className='signup email' onFocus={() => handleDivTopBorder(userNameDiv)} onBlur={() => handleDivTopBorderOut(userNameDiv)}>
                            <div className='signup radius-wrapper'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <span className='signup-comments'>We'll email you trip confirmations and receipts.</span>
                        </div>                                               
                    </div>
                    <div className='signup password-wrapper'>
                        <div className='signup password' ref={passwordDiv} onFocus={() => handleDivTopBorder(passwordDiv)} onBlur={() => handleDivTopBorderOut(passwordDiv)} >
                            <div className='signup radius-wrapper'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='signup passwordConfirm' onFocus={() => handleDivTopBorder(passwordDiv)} onBlur={() => handleDivTopBorderOut(passwordDiv)} >
                            <div className='signup radius-wrapper'>
                                <label htmlFor='passwordConfirm'>Confirm Password</label>
                                <input type='password' id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                            </div>
                        </div>                        
                    </div>                    
                    {errors.length > 0 && <div className='signup errors'>
                        <ul>
                            {/* {console.log('****** errors ******', errors)} */}
                            {/* { for (const [key, value] of Object.entries(errors)) {
                                console.log(`${key}: ${value}`)
                            }} */}
                            {errors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>}
                    <div className='signup conditions-wrapper'>
                        <span className='signup-comments'>By selecting <span style={{ fontWeight: '800', color:'black' }}>Agree and continue</span>, I agree to Airbnb’s Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.</span>
                    </div>                    
                    <div className='signup button-div' >
                        <button>
                            <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
                            <span className='signup-span'>Agree and signup</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
