import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      // TODO: Dispatch the search action using searchTerm
      console.log('Searching for', searchTerm);
    }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for books..."
      />
      <button onClick={() => handleSearch(searchTerm)}>Search</button>
    </div>
  );
};

export default SearchBar;
