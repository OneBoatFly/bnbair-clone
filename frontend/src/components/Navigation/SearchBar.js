import React, { useState } from 'react'

export default function SearchBar() {

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const [query, setQuery] = useState('');
    

    const handleSearch = (e) => {
        e.preventDefault();

        
    }

  return (
    <div>SearchBar</div>
  )
}
