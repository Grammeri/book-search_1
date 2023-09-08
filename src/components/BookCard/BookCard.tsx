import React from 'react';
import './BookCard.module.css';

type BookCardProps = {
  title: string;
  image: string;
  category: string;
  authors: string[];
};

const BookCard: React.FC<BookCardProps> = ({
  title,
  image,
  category,
  authors,
}) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>{category}</p>
        <p>{authors.join(', ')}</p>
      </div>
    </div>
  );
};

export default BookCard;
