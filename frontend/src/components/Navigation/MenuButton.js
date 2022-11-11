import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

import './Navigation.css';

export default function MenuButton() {
    const [showMenu, setShowMenu] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSingUpModal, setShowSignUpModal] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // console.log(e.target)
            // console.log(e.target.classList)
            if (!e.target.classList.contains('menu-dropdown')) setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="menu-all-wrapper">
            <button className="navBar-button" onClick={openMenu}>
                <div>
                    <i className="fa-solid fa-bars"></i>
                </div>
                {/* <div><span>Menu</span></div> */}
            </button>
            {showMenu && (
                <div className="navlinks">
                    <div className="menu-dropdown">
                        <button onClick={() => setShowSignInModal(true)}>Log In</button>
                    </div>
                    <div className="menu-dropdown">
                        <button onClick={() => setShowSignUpModal(true)}>Sign up</button>
                        {/* <NavLink to="/signup">Sign Up</NavLink> */}
                    </div>
                </div>
            )}
            {showSignInModal && (
                <Modal onClose={() => setShowSignInModal(false)} >
                    <LoginFormPage showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal}/>
                </Modal>
            )}
            {showSingUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)} >
                    <SignupFormPage showSingUpModal={showSingUpModal} setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </div>
    )
}