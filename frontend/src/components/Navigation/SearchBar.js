import React, { useState } from 'react'
import './SearchBar.css';

import PriceQuery from './SearchForms/PriceQuery';
import { Modal } from '../../context/Modal';

export default function SearchBar({ query, setQuery }) {
    const [showDropDown, setShowDropDown] = useState(false);

    const handlePrice = (e) => {
        e.preventDefault();
        setShowDropDown(true)
    }

  return (
    <div className='search-bar-wrapper'>
        <form className='search-form'>
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
            <button className='search-form-submit'>
                  <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        {showDropDown && 
            <Modal onClose={() => setShowDropDown(false)}>
                <PriceQuery setQuery={setQuery} query={query} setShowDropDown={setShowDropDown} />
            </Modal>
        }
    </div>
  )
}
