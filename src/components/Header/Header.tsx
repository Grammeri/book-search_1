import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import SortFilter from '../SortFilter/SortFilter';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/reduxHooks';
import { RootState } from '../../../src/redux/store';
import { fetchBooks } from '../../../src/redux/bookSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalBooks = useAppSelector(
    (state: RootState) => state.books.totalBooks,
  );

  const books = useAppSelector((state: RootState) => state.books.books);
  const loading = useAppSelector((state: RootState) => state.books.loading);

  const [query] = useState('');

  const [paginationCount, setPaginationCount] = useState(30);

  useEffect(() => {
    if (query) {
      dispatch(fetchBooks({ query, startIndex: 0 }) as any);
    }
  }, [query, dispatch]);
  const handleLoadMore = () => {
    dispatch(
      fetchBooks({ query, startIndex: paginationCount, maxResults: 30 }) as any,
    );
    setPaginationCount(paginationCount + 30);
  };

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
      <div className={styles.bottomData}>
        <div className={styles.bookCount}>Total Books: {totalBooks}</div>
        <div>
          {books.length > 0 && !loading && (
            <div className={styles.loadMore} onClick={handleLoadMore}>
              Load more
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
