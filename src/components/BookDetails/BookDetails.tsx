import React from 'react';
import './BookDetails.module.css';

type BookDetailsProps = {
  title: string;
  image: string;
  categories: string[];
  authors: string[];
  description: string;
};

const BookDetails: React.FC<BookDetailsProps> = ({
  title,
  image,
  categories,
  authors,
  description,
}) => {
  return (
    <div className="book-details">
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>{categories.join(', ')}</p>
        <p>{authors.join(', ')}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
