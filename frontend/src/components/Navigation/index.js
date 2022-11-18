import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import DemoUserButton from './DemoUserButton';
import './Navigation.css';

// import LoginFormModal from '../LoginFormModal'; // delete this? doesn't look like needed. Modal is in MenuButton
import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
import Icon from './Icon';
import SearchBar from './SearchBar';

// import * as spotsReducerActions from '../../store/spots';

export default function Navigation({ isLoaded, setIsLoaded, setQuery, query, showDropDown, setShowDropDown }) {
    const sessionUser = useSelector(state => state.session.user);

    const handleRefresh = () => {
        return (
            <Redirect to='/'></Redirect>
        )
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (<ProfileButton user={sessionUser} setIsLoaded={setIsLoaded} isLoaded={isLoaded} />);
    } else {
        sessionLinks = (<>
            <DemoUserButton setIsLoaded={setIsLoaded} />
            <MenuButton setIsLoaded={setIsLoaded} />
        </>);
    }

    return (
        <div className='navigation-all-wrapper'>
            <div className='navigation-sub-wrapper side1'>
                <NavLink exact to="/" onClick={handleRefresh}><Icon /></NavLink>
            </div>
            <div className='navigation-sub-wrapper center'>
                <SearchBar setQuery={setQuery} showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
            </div>
            <div className='navigation-sub-wrapper side2'>
                {sessionLinks}
            </div>
        </div>
    )
}
