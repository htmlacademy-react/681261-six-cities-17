import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from './index.ts';
import { State } from './reducer.ts';
import { AxiosInstance } from 'axios';
import { setOffers, setOffersLoadingState } from './actions.ts';
import { API_ROUTES } from '../services/constant.ts';
import { Offer } from '../types.ts';

export const loadOffers = createAsyncThunk<void, undefined, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('loadOffers', async (_arg, {dispatch, extra: api}) => {
  dispatch(setOffersLoadingState(true));
  const { data } = await api.get<Offer[]>(API_ROUTES.GetOfferList);
  dispatch(setOffers(data));
  dispatch(setOffersLoadingState(false));
});
