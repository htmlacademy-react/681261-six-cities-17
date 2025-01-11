import {createAsyncThunk} from '@reduxjs/toolkit';
import {store} from './index.ts';
import {State} from './reducer.ts';
import {AxiosInstance} from 'axios';
import {setAuthStatus, setOffers, setOffersLoadingState, setUserInfo} from './actions.ts';
import {API_ROUTES} from '../services/constant.ts';
import {Offer, UserInfo} from '../types.ts';
import {LoginStatus} from '../constant.ts';
import {UserLoginPayload} from './types.ts';
import {saveToken} from '../services/token.ts';

export const loadOffers = createAsyncThunk<void, undefined, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('offers/loadOffers', async (_arg, {dispatch, extra: api}) => {
  dispatch(setOffersLoadingState(true));
  const { data } = await api.get<Offer[]>(API_ROUTES.GetOfferList);
  dispatch(setOffers(data));
  dispatch(setOffersLoadingState(false));
});

export const login = createAsyncThunk<UserInfo, undefined, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkStatus', async (_arg, {dispatch, extra: api}) => {
  const { data } = await api.get<UserInfo>(API_ROUTES.Login);
  try {
    dispatch(setUserInfo(data));
    dispatch(setAuthStatus(LoginStatus.Auth));
  } catch (error) {
    dispatch(setAuthStatus(LoginStatus.NotAuth));
  }
  return data;
});

export const loginAction = createAsyncThunk<void, UserLoginPayload, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login', async ({ email, password }, {dispatch, extra: api}) => {
  try {
    const { data } = await api.post<UserInfo>(API_ROUTES.Login, {email, password});
    dispatch(setAuthStatus(LoginStatus.Auth));
    dispatch(setUserInfo(data));
    saveToken(data.token);
  } catch (error) {
    dispatch(setAuthStatus(LoginStatus.NotAuth));
    throw error;
  }
});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout', async (_arg, {dispatch, extra: api}) => {
  await api.delete<UserInfo>(API_ROUTES.Logout);
  dispatch(setAuthStatus(LoginStatus.NotAuth));
});
