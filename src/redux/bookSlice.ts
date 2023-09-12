import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookDetails, searchBooks } from '../api/googleBooksAPI';
import axios from 'axios';
import { RootState } from '../../src/redux/store';

interface BookState {
  selectedSort: string;
  query: string;
  books: any[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  bookDetails?: any;
  loadingDetails: boolean;
  errorDetails?: string | null;
  totalBooks: number;
  startIndex: number;
}

const initialState: BookState = {
  loadingDetails: false,
  books: [],
  bookDetails: null,
  loading: false,
  error: null,
  selectedCategory: '',
  query: '',
  selectedSort: 'relevance',
  totalBooks: 0,
  errorDetails: null,
  startIndex: 0,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (
    {
      query,
      orderBy = 'relevance',
      category = 'all',
      startIndex = 0,
      maxResults = 30,
    }: {
      query: string;
      orderBy?: string;
      category?: string;
      startIndex?: number;
      maxResults?: number;
    },
    thunkAPI,
  ) => {
    try {
      const state: BookState = (thunkAPI.getState() as RootState).books;
      if (!query && state.query) {
        query = state.query;
      }

      if (!startIndex) {
        startIndex = state.startIndex;
      }

      const books = await searchBooks({
        query: query,
        orderBy: orderBy,
        category: category,
        startIndex: startIndex,
      });
      return { ...books, query: query, startIndex: startIndex + maxResults };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: 'Unknown error' });
    }
  },
);

export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (bookId: string) => {
    try {
      const bookDetails = await getBookDetails(bookId);
      return bookDetails;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Unknown error');
      }
      throw error;
    }
  },
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBooks.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: any[];
            totalItems: number;
            query: string;
            startIndex: number;
          }>,
        ) => {
          state.books = action.payload.items;
          state.totalBooks = action.payload.totalItems;
          state.loading = false;
          state.query = action.payload.query;
          state.startIndex = action.payload.startIndex;
        },
      )
      .addCase(fetchBooks.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unknown error';
      })
      // Reducers for fetchBookDetails
      .addCase(fetchBookDetails.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(
        fetchBookDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.bookDetails = action.payload;
          state.loadingDetails = false;
        },
      )
      .addCase(fetchBookDetails.rejected, (state, action: any) => {
        state.loadingDetails = false;
        state.errorDetails = action.error.message;
      });
  },
});

export const { setSelectedCategory, setSelectedSort } = booksSlice.actions;

export default booksSlice.reducer;
