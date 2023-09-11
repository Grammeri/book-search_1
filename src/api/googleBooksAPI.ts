import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (
  query: {
    startIndex?: number;
    query: string;
    orderBy?: string;
    category?: string;
  },
  orderBy: string = 'relevance',
  maxResults: number = 10,
  category?: string,
  startIndex: number = 0,
  download?: 'epub',
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks',
  langRestrict?: string,
  printType?: 'all' | 'books' | 'magazines',
  projection?: 'full' | 'lite',
) => {
  const params: any = {
    q: query.query,
    key: API_KEY,
    maxResults,
    orderBy: query.orderBy || orderBy,
    startIndex: query.startIndex || startIndex,
  };

  if (query.category && query.category !== 'all') {
    params.q += `+subject:${query.category}`;
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

    return response.data.items || [];
  } catch (error) {
    throw error;
  }
};
