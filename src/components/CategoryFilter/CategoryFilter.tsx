import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/reduxHooks';

import styles from './CategoryFilter.module.css';
import { fetchBooks, setSelectedCategory } from '../../../src/redux/bookSlice';
import { AppDispatch, RootState } from '../../../src/redux/store';

const CategoryFilter: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const categories = [
    'All',
    'Art',
    'Biography',
    'Computers',
    'History',
    'Medical',
    'Poetry',
  ];

  const selectedCategory = useAppSelector(
    (state: RootState) => state.books.selectedCategory,
  );

  const currentQuery = useAppSelector((state: RootState) => state.books.query);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    dispatch(setSelectedCategory(category));

    if (currentQuery && currentQuery.trim() !== '') {
      dispatch(
        fetchBooks({
          query: currentQuery,
          category: category !== 'All' ? category : undefined,
        }),
      );
    }
  };

  return (
    <select
      className={styles.categoryFilter}
      value={selectedCategory}
      onChange={handleCategoryChange}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
