import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './Navigation.css';

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

  return (
    <div className="menu-all-wrapper">
        <button className="navBar-button" onClick={openMenu}>
            <div>
                <i className="fa-solid fa-user"></i>
            </div>
        </button>
        {showMenu && (
            <div className="navlinks" style={{background:'white', zIndex:'1'}}>
                <div className="menu-dropdown">
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <button onClick={logout}>My Spots</button>
                </div>
                <div className="menu-dropdown logout-button"><button onClick={logout}>Log Out</button></div>
            </div>
        )}        
    </div>
  )
}