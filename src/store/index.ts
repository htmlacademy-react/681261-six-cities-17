import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api.ts';
import userSlice from './slices/user-slice.ts';
import citySlice from './slices/city-slice.ts';
import offerSlice from './slices/offer-slice.ts';
import detailsSlice from './slices/details-slice.ts';
import commentsSlice from './slices/comments-slice.ts';
import favoritesSlice from './slices/favorites-slice.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const api = createApi();

export const store = configureStore({
  reducer: {
    user: userSlice,
    city: citySlice,
    offers: offerSlice,
    details: detailsSlice,
    comments: commentsSlice,
    favorites: favoritesSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});
