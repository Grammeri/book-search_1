import React, { useEffect } from 'react';
import './BookDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/reduxHooks';
import { RootState } from '../../../src/redux/store';
import { fetchBookDetails } from '../../../src/redux/bookSlice';
import LinearProgress from '@material-ui/core/LinearProgress';

type Params = {
  bookId: string;
};

const BookDetails: React.FC = () => {
  const { bookId } = useParams<Params>();
  const dispatch = useAppDispatch();
  const bookDetails = useAppSelector(
    (state: RootState) => state.books.bookDetails,
  );
  const loading = useAppSelector(
    (state: RootState) => state.books.loadingDetails,
  );
  const error = useAppSelector((state: RootState) => state.books.errorDetails);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (bookId != null) {
      dispatch(fetchBookDetails(bookId) as any);
    }
  }, [bookId, dispatch]);

  if (loading) return <LinearProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!bookDetails) return null;

  return (
    <div className="book-details">
      <img
        src={bookDetails.volumeInfo.imageLinks?.thumbnail}
        alt={bookDetails.volumeInfo.title}
      />
      <div>
        <h2>{bookDetails.volumeInfo.title}</h2>
        {bookDetails.volumeInfo.categories ? (
          <p>{bookDetails.volumeInfo.categories.join(', ')}</p>
        ) : (
          <p>No categories available</p>
        )}
        {bookDetails.volumeInfo.authors ? (
          <p>{bookDetails.volumeInfo.authors.join(', ')}</p>
        ) : (
          <p>No authors available</p>
        )}
        <p>{bookDetails.volumeInfo.description}</p>
      </div>
      <button onClick={handleGoBack}>← Go back</button>
    </div>
  );
};

export default BookDetails;
