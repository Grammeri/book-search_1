import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../../src/hooks/reduxHooks';

import styles from './SearchBar.module.css';
import { fetchBooks } from '../../../src/redux/bookSlice';
import { AppDispatch } from '../../../src/redux/store';

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedDispatch = debounce((searchTerm: string) => {
    dispatch(fetchBooks({ query: searchTerm }));
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleButtonClick = () => {
    debouncedDispatch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedDispatch(searchTerm);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className={styles.searchInput}
        placeholder="Search for books..."
      />
      <button onClick={handleButtonClick} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
