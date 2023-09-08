import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (query: string, maxResults: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: query,
        key: API_KEY,
        maxResults,
      },
    });
    return response.data.items || [];
  } catch (error) {
    throw error;
  }
};
