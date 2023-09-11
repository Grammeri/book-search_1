import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { /*getBookDetails, */ searchBooks } from '../api/googleBooksAPI';
import axios from 'axios';

interface BookState {
  selectedSort: string;
  query: string;
  books: any[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  bookDetails?: any;
  loadingDetails: boolean;
  errorDetails?: string;
  totalBooks: number;
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
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (
    {
      query,
      orderBy = 'relevance',
      category = 'all',
      startIndex = 0,
    }: {
      query: string;
      orderBy?: string;
      category?: string;
      startIndex?: number;
    },
    thunkAPI,
  ) => {
    try {
      const books = await searchBooks({
        query: query,
        orderBy: orderBy,
        category: category,
        startIndex: startIndex,
      });
      return books;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Используем rejectWithValue, чтобы передать данные об ошибке
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: 'Unknown error' });
    }
  },
);

/*export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (bookId: string, thunkAPI) => {
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
);*/

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
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unknown error';
      });

    /*      // обработчики для fetchBookDetails
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBookDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.bookDetails = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchBookDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });*/
  },
});

export const { setSelectedCategory, setSelectedSort } = booksSlice.actions;

export default booksSlice.reducer;
