import React, { useEffect, useState, useRef } from 'react'
import './SearchBar.css';
import SearchForms from './SearchForms/SearchForms';

export default function SearchBar({ setQuery, query, setCenter, center }) {
    const dropDownFormRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // console.log('in closememu', e.target)
            // console.log('in closememu', e.currentTarget)
            // console.log('dropDownRef', dropDownFormRef.current)
            // console.log('whereQueryResultRef', whereQueryResultRef.current)
            if (dropDownFormRef.current && !dropDownFormRef.current.contains(e.target) && !e.target.className.includes('where-query-drop-down')) {
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
        // console.log('submit search form clicked')
        // console.log('errors', errors)

        if (Object.values(errors).length) {
            // console.log('errors', errors)
            return;
        } else {
            setQuery(query => {
                const newQuery = {}
                newQuery.minPrice = minPrice;
                newQuery.maxPrice = maxPrice;
                newQuery.minLat = minLat;
                newQuery.maxLat = maxLat;
                newQuery.minLng = minLng;
                newQuery.maxLng = maxLng;                

                return newQuery;
            });
            setShowMenu(false);
            setMinPrice(10);
            setMaxPrice(300);
            setMinLat(-90);
            setMaxLat(90);
            setMinLng(-180);
            setMaxLng(180);
            setHasSubmitted(false);     
        }
    }

    const handleClick = (e) => {
        openMenu(e);
    }

    // console.log('SearchBar - query', query)

  return (
    <div className='search-bar-wrapper' ref={dropDownFormRef} onClick={(e) => handleClick(e)}>
        <form className='search-form' onSubmit={handleSearch}>
            <div className='search-form-nav'>
                <div className='search-element-div-wrapper'>
                    <div className='search-element-div'>
                        <button>Search </button>
                    </div>
                    <div className='search-element-div middle search-bar-mobile-remove'>
                        <button>Any where</button>
                    </div>
                    <div className='search-element-div search-bar-mobile-remove'>
                        <button>Any price</button>
                    </div>
                </div>
                <button className='search-form-submit'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            {showMenu && 
                  <SearchForms hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} minLat={minLat} setMinLat={setMinLat} maxLat={maxLat} setMaxLat={setMaxLat} minLng={minLng} setMinLng={setMinLng} maxLng={maxLng} setMaxLng={setMaxLng} setCenter={setCenter} center={center} />
            }
        </form>
    </div>
  )
}
