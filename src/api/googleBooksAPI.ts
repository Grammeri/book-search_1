import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (
  query: string,
  orderBy: string = 'relevance',
  maxResults?: string,
  category?: number,
) => {
  const params = {
    q: query,
    key: API_KEY,
    maxResults,
    orderBy,
  };

  if (category) {
    params.q += `+subject:${category}`;
  }

  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params,
    });

    return response.data.items || [];
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes/${bookId}`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
