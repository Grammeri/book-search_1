import axios from 'axios';
import { SearchParams } from '../../src/interfaces/interfaces';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

/*interface SearchParams {
  startIndex?: number;
  query: string;
  orderBy?: string;
  category?: string;
  maxResults?: number;
  download?: 'epub';
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks';
  langRestrict?: string;
  printType?: 'all' | 'books' | 'magazines';
  projection?: 'full' | 'lite';
}*/

export const searchBooks = async ({
  query,
  orderBy = 'relevance',
  startIndex = 0,
  category,
  maxResults = 30,
  download,
  filter,
  langRestrict,
  printType,
  projection,
}: SearchParams) => {
  const params: any = {
    q: query,
    key: API_KEY,
    maxResults,
    orderBy,
    startIndex,
  };

  if (category && category !== 'all') {
    params.q += `+subject:${category}`;
  }
  if (download) params.download = download;
  if (filter) params.filter = filter;
  if (langRestrict) params.langRestrict = langRestrict;
  if (printType) params.printType = printType;
  if (projection) params.projection = projection;

  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params,
    });

    return {
      items: response.data.items || [],
      totalItems: response.data.totalItems || 0,
    };
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

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
