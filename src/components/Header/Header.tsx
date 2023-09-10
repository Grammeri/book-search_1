import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import SortFilter from '../SortFilter/SortFilter';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <h1 className={styles.appTitle}>Search for books</h1>
      <SearchBar />
      <div className={styles.filters}>
        <h3>Categories</h3>
        <CategoryFilter />
        <h3>Sorting by</h3>
        <SortFilter />
      </div>
    </header>
  );
};

export default Header;
