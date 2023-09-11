import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../../src/hooks/reduxHooks';

import styles from './SearchBar.module.css';
import { fetchBooks } from '../../../src/redux/bookSlice';
import { AppDispatch } from '../../../src/redux/store';

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      dispatch(fetchBooks({ query: searchTerm }));
    }, 300),
    [dispatch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="Search for books..."
      />
    </div>
  );
};

export default SearchBar;
