import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
