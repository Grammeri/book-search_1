import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BookCard from './components/BookCard/BookCard';
import { fetchBooks } from './redux/bookSlice';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { RootState } from './redux/store';
import { Link, Route, Routes } from 'react-router-dom';
import BookDetails from '../src/components/BookDetails/BookDetails';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: { thumbnail: string };
    categories?: string[];
    authors?: string[];
  };
};

function App() {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state: RootState) => state.books.books);
  const loading = useAppSelector((state: RootState) => state.books.loading);
  const error = useAppSelector((state: RootState) => state.books.error);

  const [query, setQuery] = useState('');
  const [paginationCount, setPaginationCount] = useState(30);

  useEffect(() => {
    if (query) {
      dispatch(fetchBooks({ query, startIndex: 0 }) as any);
    }
  }, [query, dispatch]);
  const handleLoadMore = () => {
    setPaginationCount(paginationCount + 30);
    dispatch(fetchBooks({ query, startIndex: paginationCount }) as any);
  };

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="book-count">
                {/* ... (код вывода количества книг) */}
              </div>
              <div className="book-list">
                {loading && <p>Loading...</p>}
                {error && (
                  <div>
                    <p>Error: {error}</p>
                    <button
                      onClick={() =>
                        dispatch(fetchBooks({ query, startIndex: 0 }) as any)
                      }
                    >
                      Retry
                    </button>
                  </div>
                )}
                {books.map((book: Book, index: number) => (
                  <Link to={`/book/${book.id}`} key={book.id}>
                    <BookCard
                      title={book.volumeInfo.title}
                      image={book.volumeInfo.imageLinks?.thumbnail || ''}
                      category={book.volumeInfo.categories?.[0] || 'Unknown'}
                      authors={book.volumeInfo.authors || []}
                    />
                  </Link>
                ))}
                {books.length > 0 && !loading && (
                  <button onClick={handleLoadMore}>Load more</button>
                )}
              </div>
            </>
          }
        />
        <Route path="/book/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
