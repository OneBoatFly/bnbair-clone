import React, { useEffect, useState, useRef } from 'react'
import './SearchBar.css';

import MyButton from '../FormElements/MyButton';
import PriceQuery from './SearchForms/PriceQuery';
import { Modal } from '../../context/Modal';
import SearchForms from './SearchForms/SearchForms';

export default function SearchBar({ setQuery, showDropDown, setShowDropDown }) {
    const dropDownFormRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        console.log('openMenu clicked', e.target)
        console.log(e.currentTarget)
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
    const [minLat, setMinLat] = useState(-90);
    const [maxLat, setMaxLat] = useState(90);
    const [minLng, setMinLng] = useState(-180);
    const [maxLng, setMaxLng] = useState(180);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        console.log('submit search form clicked')

        if (Object.values(errors).length) {
            console.log('errors', errors)
            return;
        } else {
            setQuery(query => {
                const newQuery = { ...query }
                newQuery.minPrice = minPrice;
                newQuery.maxPrice = maxPrice;
                newQuery.minLat = minLat;
                newQuery.maxLat = maxLat;
                newQuery.minLng = minLng;
                newQuery.maxLng = maxLng;                

                return newQuery;
            });
            setShowMenu(false);
        }
    }

  return (
    <div className='search-bar-wrapper' ref={dropDownFormRef} onClick={(e) => openMenu(e)}>
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
                        <button>Any price</button>
                    </div>
                </div>
                <button className='search-form-submit'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            {showMenu && 
                  <SearchForms hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} minLat={minLat} setMinLat={setMinLat} maxLat={maxLat} setMaxLat={setMaxLat} minLng={minLng} setMinLng={setMinLng} maxLng={maxLng} setMaxLng={setMaxLng} />
            }
        </form>
    </div>
  )
}
