import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../store/session';

import './LoginFormPage.css';
import { handleMouseMove, handleDivBottomBorder, handleDivBottomBorderOut } from '../styles';

export default function LoginFormPage({ setShowSignInModal, setIsLoaded }) {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        const hasErrors = {};
        if (!credential.length) hasErrors.credential = 'Username or email is required.';
        else delete hasErrors.credential;

        if (!password.length) hasErrors.password = 'Password is required.';
        else delete hasErrors.password;

        if (Object.values(hasErrors).length) {
            setErrors(Object.values(hasErrors));
        } else {
            setErrors([]);
        }

        return () => {
            setErrors([]);
        }
    }, [credential, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (errors.length) return;
        
        dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                setHasSubmitted(false);
                setIsLoaded(true);
                window.localStorage.setItem('isLoaded', true);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const credentialRef = useRef(null);

    if (sessionUser) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className='login-all-wrapper'>
            <div className='login-sub-wrapper'>
                <div className='login exit-button-wrapper'>
                    <div className='login exit-button-div' onClick={() => setShowSignInModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className='login-all'>
                    <div className='login welcome'>
                        <h3>Welcome to Airbnb</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='login inputs'>
                            <div className='login credential' ref={credentialRef} onFocus={() => handleDivBottomBorder(credentialRef)} onBlur={() => handleDivBottomBorderOut(credentialRef)}>
                                <div className='signup radius-wrapper'>
                                    <label htmlFor='credential'>Username or email</label>
                                    <input type='text' id="credential" value={credential} onChange={(e) => setCredential(e.target.value)} />
                                </div>
                            </div>
                            <div className='login password' onFocus={() => handleDivBottomBorder(credentialRef)} onBlur={() => handleDivBottomBorderOut(credentialRef)}>
                                <div className='signup radius-wrapper'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='login errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                            {/* {console.log('component ---', errors)} */}
                            {
                                hasSubmitted && (
                                    errors?.map((err, i) => (
                                        <div key={i} className='error-messages-wrapper'>
                                            <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                            <span className='error-messages'>{err}</span>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        <div className='login button-div' >
                            <button>
                                <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
                                <span className='login-span'>Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
