import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as spotsActions from '../../store/spots'

import { Modal } from '../../context/Modal';
import CreateSpot from '../Spots/CreateSpot';
import './Navigation.css';

export default function ProfileButton({ user, setIsLoaded }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showSpotFormModal, setShowSpotFormModal] = useState(false);

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
        dispatch(spotsActions.removeOwnerSpots());
        setIsLoaded(false);

        return (
            <Redirect to='/' />
        )
    };

  return (
    <div className="menu-all-wrapper">
        <button className="navBar-button" onClick={openMenu}>
            <div>
                <i className="fa-solid fa-user"></i>
            </div>
        </button>
        {showMenu && (
            <div className="navlinks" style={{background:'white', zIndex:'2'}}>
                <div className="menu-dropdown">
                    <span><b>{user.username}</b></span>
                    <span>{user.email}</span>
                </div>
                <div className="menu-dropdown creat-listing">
                    <button onClick={() => setShowSpotFormModal(true)}>Create a new listing</button>
                </div>                    
                <div className="menu-dropdown">
                    <NavLink to='/spots/current'>Listing</NavLink>
                </div>
                  <div className="menu-dropdown logout-button"><button onClick={logout}>Log Out</button></div>
            </div>
        )}      
        {showSpotFormModal && (
            <Modal onClose={() => setShowSpotFormModal(false)} >
                <CreateSpot setShowSpotFormModal={setShowSpotFormModal} />
            </Modal>
        )}  
    </div>
  )
}