import React from 'react';
import './SortFilter.module.css';

type SortFilterProps = {
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
};

const SortFilter: React.FC<SortFilterProps> = ({
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <select
      className="sort-filter"
      value={selectedOption}
      onChange={(e) => onOptionChange(e.target.value)}
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
