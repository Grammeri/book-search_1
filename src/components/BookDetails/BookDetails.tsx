import React from 'react';
import './BookDetails.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/reduxHooks';
import { RootState } from '../../../src/redux/store';
//import { fetchBookDetails } from '../../../src/redux/bookSlice';

type Params = {
  bookId: string;
};

const BookDetails: React.FC = () => {
  const { bookId } = useParams<Params>();
  const dispatch = useAppDispatch();

  // Здесь предполагается, что у вас есть селекторы для получения деталей книги, статуса загрузки и возможных ошибок
  const bookDetails = useAppSelector(
    (state: RootState) => state.books.bookDetails,
  );
  const loading = useAppSelector(
    (state: RootState) => state.books.loadingDetails,
  );
  const error = useAppSelector((state: RootState) => state.books.errorDetails);

  /*  useEffect(() => {

    if (bookId != null) {
      dispatch(fetchBookDetails(bookId) as any);
    }
  }, [bookId, dispatch]);*/

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bookDetails) return null;

  return (
    <div className="book-details">
      <img src={bookDetails.image} alt={bookDetails.title} />
      <div>
        <h2>{bookDetails.title}</h2>
        {bookDetails.categories ? (
          <p>{bookDetails.categories.join(', ')}</p>
        ) : (
          <p>No categories available</p>
        )}
        {bookDetails.authors ? (
          <p>{bookDetails.authors.join(', ')}</p>
        ) : (
          <p>No authors available</p>
        )}
        <p>{bookDetails.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
