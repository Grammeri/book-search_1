import React, { useState } from 'react';

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import SortFilter from './components/SortFilter/SortFilter';
import BookCard from './components/BookCard/BookCard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');

  const categories = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
  ];
  const sortOptions = ['relevance', 'newest'];

  // Dummy data for demonstration purposes
  const books = [
    {
      title: "Harry Potter and the Sorcerer's Stone",
      image: 'path_to_image.jpg',
      category: 'fiction',
      authors: ['J.K. Rowling'],
    },
    // ... More books for demonstration
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Search for books</h1>
        <SearchBar />
        <div className="filters">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <SortFilter
            options={sortOptions}
            selectedOption={selectedSort}
            onOptionChange={setSelectedSort}
          />
        </div>
      </header>

      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </div>
    </div>
  );
}

export default App;
