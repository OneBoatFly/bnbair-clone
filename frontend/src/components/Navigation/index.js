import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import DemoUserButton from './DemoUserButton';
import './Navigation.css';

import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
import Icon from './Icon';
import SearchBar from './SearchBar';

export default function Navigation({ setPage, isLoaded, setIsLoaded, setQuery, query, setCenter, center, userCenter }) {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();
    const [showSearch, setShowSearch] = useState(true);

    useEffect(() => {
        if (!location) return;

        if (location.pathname !== '/') setShowSearch(false);
        else setShowSearch(true);

    }, [location])

    const handleIconOnClick = () => {
        setQuery({})
        setCenter(userCenter)
    }

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
                <NavLink exact to='/' onClick={handleIconOnClick} ><Icon setPage={setPage} /></NavLink>
            </div>
            <div className='navigation-sub-wrapper center'>
                {showSearch && 
                    <SearchBar setQuery={setQuery} query={query} setCenter={setCenter} center={center} />
                }
            </div>
            <div className='navigation-sub-wrapper side2'>
                {sessionLinks}
            </div>
        </div>
    )
}
