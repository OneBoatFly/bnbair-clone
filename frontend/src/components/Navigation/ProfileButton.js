import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as spotsActions from '../../store/spots'

import { Modal } from '../../context/Modal';
import CreateSpot from '../Spots/CreateSpot';
import './Navigation.css';

export default function ProfileButton({ user, setIsLoaded, setPage }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showSpotFormModal, setShowSpotFormModal] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const showDropDownMenuRef = useRef(null);
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (showDropDownMenuRef.current && !showDropDownMenuRef.current.contains(e.target)) setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(spotsActions.removeOwnerSpots());
        setIsLoaded(false);
        window.localStorage.setItem('isLoaded', false);
        return (
            <Redirect to='/' />
        )
    };

  return (
    <div className="menu-all-wrapper">
        <button className="navBar-button" onClick={openMenu}>
            <div style={{display:'flex', flexDirection:'row', verticalAlign:'center', justifyContent:'space-between', width:'70%'}}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-user"></i>
            </div>
        </button>
        {showMenu && (
            <div className="navlinks" style={{background:'white', zIndex:'2'}} ref={showDropDownMenuRef}>
                <div className="profile-wrapper">
                    <div className="profile-wrapper-sub">
                        <span><b>{user.username}</b></span>
                        <span>{user.email}</span>
                    </div>
                </div>

                <div className="menu-dropdown">
                    <div className="menu-dropdown-sub">
                        <button className="create-listing-button" onClick={() => setShowSpotFormModal(true)}>Create a new listing</button>
                    </div>                    
                    <div className="menu-dropdown-sub">
                        <NavLink to='/spots/current'>Listings</NavLink>
                    </div>
                    <div className="menu-dropdown-sub">
                        <NavLink to='/reviews/current'>My reviews</NavLink>
                    </div>
                </div>

                <div className="logout-button-wrapper">
                    <div className="logout-button-sub" onClick={logout}>
                        <button>Log Out</button>
                    </div>
                </div>
            </div>
        )}      
        {showSpotFormModal && (
            <Modal onClose={() => setShowSpotFormModal(false)} >
                <CreateSpot setShowSpotFormModal={setShowSpotFormModal} setPage={setPage}/>
            </Modal>
        )}  
    </div>
  )
}