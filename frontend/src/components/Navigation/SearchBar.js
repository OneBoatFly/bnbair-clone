import React, { useEffect, useState, useRef } from 'react'
import './SearchBar.css';

import MyButton from '../FormElements/MyButton';
import PriceQuery from './SearchForms/PriceQuery';
import { Modal } from '../../context/Modal';

export default function SearchBar({ setQuery, showDropDown, setShowDropDown }) {
    const dropDownFormRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (dropDownFormRef.current && !dropDownFormRef.current.contains(e.target)) {
                // console.log('here')
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(300);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        // console.log(e.target)

        if (Object.values(errors).length) {
            // console.log('errors', errors)
            return;
        } else {
            setQuery(query => {
                const newQuery = { ...query }
                newQuery.minPrice = minPrice;
                newQuery.maxPrice = maxPrice;
                // console.log(newQuery)

                return newQuery;
            });
            setShowMenu(false);
        }
    }

    // onClick={openMenu}

  return (
    <div className='search-bar-wrapper' ref={dropDownFormRef} >
          <form className='search-form' onSubmit={handleSearch}>
            <div className='search-form-nav'>
                <div className='search-element-div-wrapper'>
                    <div className='search-element-div'>
                        <button>Feature</button>
                    </div>
                    <div className='search-element-div middle'>
                        <button>To</button>
                    </div>
                    <div className='search-element-div'>
                        <button>Come</button>
                    </div>
                </div>
                <button className='search-form-submit' disabled>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            {showMenu && 
                <div className='search-drop-down'>
                    <PriceQuery hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                    <MyButton name="Search" ></MyButton>
                </div>
            }
        </form>
    </div>
  )
}
