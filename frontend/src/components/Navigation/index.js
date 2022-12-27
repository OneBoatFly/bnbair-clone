import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import DemoUserButton from './DemoUserButton';
import './Navigation.css';

import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
import Icon from './Icon';
import SearchBar from './SearchBar';

export default function Navigation({ setPage, isLoaded, setIsLoaded, setQuery, showDropDown, setShowDropDown }) {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();
    const [showSearch, setShowSearch] = useState(true);

    useEffect(() => {
        if (!location) return;

        if (location.pathname !== '/') setShowSearch(false);
        else setShowSearch(true);

    }, [location])

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (<ProfileButton user={sessionUser} setIsLoaded={setIsLoaded} isLoaded={isLoaded} setPage={setPage} />);
    } else {
        sessionLinks = (<>
            <DemoUserButton setIsLoaded={setIsLoaded} />
            <MenuButton setIsLoaded={setIsLoaded} />
        </>);
    }

    return (
        <div className='navigation-all-wrapper'>
            <div className='navigation-sub-wrapper side1'>
                <NavLink exact to='/' ><Icon setPage={setPage} /></NavLink>
            </div>
            <div className='navigation-sub-wrapper center'>
                {showSearch && 
                    <SearchBar setQuery={setQuery} showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
                }
            </div>
            <div className='navigation-sub-wrapper side2'>
                {sessionLinks}
            </div>
        </div>
    )
}
