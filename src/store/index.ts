import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import { createApi } from '../services/api.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});
