import React from 'react'
import { useState, useEffect } from 'react';

const Search = (props) => {
    const [searchCountry, setSearchCountry] = useState('');
    const handleChange = (e) => {
        setSearchCountry(e.target.value);
    }
    useEffect(() => {
        props.onSearch(searchCountry);
    }, [searchCountry]);

    return (
        <div className="flex justify-center items-center mb-4">
            <input 
                type="text" 
                placeholder="Search Country" 
                value={searchCountry} 
                onChange={handleChange} 
                className="bg-gray-100 text-center p-2 rounded w-1/3 border border-orange-600"
            />
        </div>
    )
}

export default Search
