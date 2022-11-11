import React from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

import ProfileButton from './ProfileButton';

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(sessionActions.logout());
    }

  return (
    <div className='navigation-all-wrapper'>
        <div>
            {sessionUser && <ProfileButton />}
            <ul>
                <li>
                    <button>
                        <NavLink to='/'>Home</NavLink>
                    </button>
                </li>
                {sessionUser && <li><button onClick={handleLogout}>Logout</button></li>}
                {!sessionUser && <li><button><NavLink to='/login'>Login</NavLink></button></li>}
                {!sessionUser && <li><button><NavLink to='/signup'>Signup</NavLink></button></li>}
            </ul>
        </div>
    </div>
  )
}
