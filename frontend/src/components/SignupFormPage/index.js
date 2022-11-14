import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './SignupFormPage.css';
import { handleMouseMove, handleDivTopBorder, handleDivTopBorderOut } from '../styles';

export default function SignupFormPage({ setShowSignUpModal, setIsLoaded }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState(''); // this is not in backend yet.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const hasErrors = {};
        if (!firstName.length) hasErrors.firstName = 'First name is required.';
        else delete hasErrors.firstName;

        if (!lastName.length) hasErrors.lastName = 'Last name is required.';
        else delete hasErrors.lastName;

        // 2022-11-23 string
        if (!birthday.length) hasErrors.birthday = 'Select your birth date to continue.';
        else delete hasErrors.birthday;

        const today = new Date();
        const birthdayDate = new Date(birthday);
        let age = today.getFullYear() - birthdayDate.getFullYear();
        let m = today.getMonth() - birthdayDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
            age--;
        }

        if (age < 21) hasErrors.age = "You must be 18 or older to use Airbnb. Other people won’t see your birthday.";
        else delete hasErrors.age;

        if (!username.length) hasErrors.username = 'Username is required.';
        else if (username.length < 4) hasErrors.username = 'Please provide a username with at least 4 characters.';
        else delete hasErrors.username;
        
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.length || !email.match(emailRegex)) hasErrors.email = 'Enter a valid email.';
        else delete hasErrors.email;

        if (!password.length) hasErrors.password = 'Password is required.';
        else if (password.length < 6) hasErrors.password = 'Password must be 6 characters or more.';
        else delete hasErrors.password;
        
        if (!passwordConfirm.length) hasErrors.passwordConfirm = 'Password confirmation is required.';
        else delete hasErrors.passwordConfirm;

        if (password !== passwordConfirm) hasErrors.diffPass = 'Password does not match.';
        else delete hasErrors.diffPass;

        if (Object.values(hasErrors).length) {
            setErrorsObj(hasErrors);
            setErrors(Object.values(hasErrors));
        } else {
            setErrorsObj({});
            setErrors([]);
        }

    }, [firstName, lastName, birthday, username, email, password, passwordConfirm])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        // console.log('handleSubmit fired')
        // setErrors([]);

        if (errors.length) return;

        dispatch(sessionActions.signup({ 
            firstName,
            lastName,
            username,
            email,
            password 
        }))
        .then(() => {
            setHasSubmitted(false);
            setIsLoaded(true);
        })
        .catch(async (res) => {
            const data = await res.json();
            // console.log('data returned: ', data)
            // console.log('data.errors', data.errors)
            if (data && data.errors) {
                setErrorsObj(data.errors);
                setErrors(Object.values(data.errors));
            }
        });
    }

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
            <div className='signup exit-button-wrapper'>
                <div className='login exit-button-div' onClick={() => setShowSignUpModal(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>            
            <div className='signup-all'>
                <div className='singup welcome'>
                    <h3>Welcome to Airbnb</h3>
                </div>
                {/* {console.log('from component - hasSubmit', hasSubmitted)}
                {console.log('from component - errors', errors)}
                {console.log('from component - errorsObj', errorsObj)}                 */}
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
                            {hasSubmitted && errorsObj?.firstName && 
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.firstName}</span>
                                </div>                            
                            }
                            {hasSubmitted && errorsObj?.lastName && !errorsObj?.firstName &&
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.lastName}</span>
                                </div>
                            }                            
                            {!errorsObj?.firstName && !errorsObj?.lastName &&
                                <span className='signup-comments'>Make sure it matches the name on your government ID.</span>
                            }
                        </div>
                    </div>
                    <div className='signup birthday-wrapper'>
                        <div className='signup birthday'>
                            <label htmlFor='birthday'>Birthday</label>
                            <input type='date' id='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                        </div>
                        <div>
                            {hasSubmitted && errorsObj?.birthday &&
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.birthday}</span>
                                </div>
                            }
                            {hasSubmitted && errorsObj?.age && !errorsObj?.birthday &&
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.age}</span>
                                </div>
                            }                            
                            {!errorsObj?.birthday && !errorsObj?.age &&
                                <span className='signup-comments'>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</span>
                            }
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
                            {hasSubmitted && errorsObj?.username &&
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.username}</span>
                                </div>
                            }
                            {hasSubmitted && errorsObj?.email && !errorsObj?.username &&
                                <div className='error-messages-wrapper'>
                                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                    <span className='error-messages'>{errorsObj.email}</span>
                                </div>
                            }
                            {!errorsObj?.username && !errorsObj?.email &&
                                <span className='signup-comments'>We'll email you trip confirmations and receipts.</span>
                            }
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
                        {hasSubmitted && errorsObj?.password &&
                            <div className='error-messages-wrapper'>
                                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                <span className='error-messages'>{errorsObj.password}</span>
                            </div>
                        }
                        {hasSubmitted && errorsObj?.passwordConfirm && !errorsObj?.password &&
                            <div className='error-messages-wrapper'>
                                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                <span className='error-messages'>{errorsObj.passwordConfirm}</span>
                            </div>
                        }         
                        {hasSubmitted && errorsObj?.diffPass && !errorsObj?.password && !errorsObj?.passwordConfirm &&
                            <div className='error-messages-wrapper'>
                                <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                                <span className='error-messages'>{errorsObj.diffPass}</span>
                            </div>
                        }                                       
                    </div>          

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


// {
//     errors.length > 0 &&
//     <div className='signup errors'>
//         <ul>
//             {/* {console.log('****** errors ******', errors)} */}
//             {/* { for (const [key, value] of Object.entries(errors)) {
//                                     console.log(`${key}: ${value}`)
//                                 }} */}
//             {errors.map((err, i) => <li key={i}>{err}</li>)}
//         </ul>
//     </div>
// }