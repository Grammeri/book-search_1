import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
  books: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStarted: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<any[]>) => {
      state.books = action.payload;
      state.loading = false;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBooksStarted, fetchBooksSuccess, fetchBooksFailure } =
  booksSlice.actions;

export default booksSlice.reducer;
