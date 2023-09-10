import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CategoryFilter.module.css';
import { fetchBooks, setSelectedCategory } from '../../../src/redux/bookSlice';
import { AppDispatch, RootState } from '../../../src/redux/store';

const CategoryFilter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
  ];
  const selectedCategory = useSelector(
    (state: RootState) => state.books.selectedCategory,
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    dispatch(setSelectedCategory(category));
    dispatch(
      fetchBooks({
        query: 'someDefaultQuery',
        category: category === 'all' ? undefined : category,
      }),
    );
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
