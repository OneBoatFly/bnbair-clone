import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import './Navigation.css';

// import LoginFormModal from '../LoginFormModal'; // delete this? doesn't look like needed. Modal is in MenuButton
import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
import Icon from './Icon';
import SearchBar from './SearchBar';

import * as spotsReducerActions from '../../store/spots';

export default function Navigation({ isLoaded, setIsLoaded, setQuery }) {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const handleRefresh = () => {
        // console.log('clicked')
        dispatch(spotsReducerActions.getAllSpotsWithQuery({page: 1}));
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} setIsLoaded={setIsLoaded} isLoaded={isLoaded} />
        );
    } else {
        sessionLinks = (
            <>
                <MenuButton setIsLoaded={setIsLoaded} ></MenuButton>
            </>
        );
    }

    return (
        <div className='navigation-all-wrapper'>
            <div className='navigation-sub-wrapper side1'>
                <div ></div>
                <NavLink exact to="/" onClick={handleRefresh}><Icon /></NavLink>
            </div>
            <div className='navigation-sub-wrapper center'>
                <SearchBar setQuery={setQuery} />
            </div>
            <div className='navigation-sub-wrapper side2'>
                {sessionLinks}
            </div>
        </div>
    )
}
