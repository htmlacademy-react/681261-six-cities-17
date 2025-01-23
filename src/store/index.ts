import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api.ts';
import userSlice from './slices/user.ts';
import citySlice from './slices/city.ts';
import offerSlice from './slices/offer.ts';
import detailsSlice from './slices/details.ts';
import commentsSlice from './slices/comments.ts';
import favoritesSlice from './slices/favorites.ts';

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
