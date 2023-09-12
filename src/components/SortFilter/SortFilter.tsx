import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/reduxHooks';
import styles from './SortFilter.module.css';
import { fetchBooks, setSelectedSort } from '../../../src/redux/bookSlice';
import { RootState } from '../../../src/redux/store';

const SortFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentQuery = useAppSelector((state: RootState) => state.books.query);
  const selectedOption = useAppSelector(
    (state: RootState) => state.books.selectedSort,
  );

  const options = ['relevance', 'newest'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrderBy = e.target.value;
    dispatch(setSelectedSort(newOrderBy));
    dispatch(fetchBooks({ query: currentQuery, orderBy: newOrderBy }));
  };

  return (
    <select
      className={styles.sortFilter}
      value={selectedOption}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SortFilter;
