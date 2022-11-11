import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from "react-redux";

// import LoginFormModal from '../LoginFormModal'; // delete this? doesn't look like needed. Modal is in MenuButton
import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
import Icon from './Icon';

export default function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                {/* <LoginFormModal /> */}
                <MenuButton></MenuButton>
            </>
        );
    }

    return (
        <div className='navigation-all-wrapper'>
            <div className='navigation-sub-wrapper side1'>
                <NavLink exact to="/"><Icon /></NavLink>
            </div>
            <div className='navigation-sub-wrapper center'>
                <span>Placeholder for search form</span>
            </div>
            <div className='navigation-sub-wrapper side2'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
}
