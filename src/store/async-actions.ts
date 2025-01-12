import {createAsyncThunk} from '@reduxjs/toolkit';
import {store} from './index.ts';
import {State} from './reducer.ts';
import {AxiosError, AxiosInstance} from 'axios';
import {
  setAuthStatus,
  setLoadingState, setNearbyOffers, setComments,
  setOfferDetails,
  setOffers,
  setUserInfo, addComment
} from './actions.ts';
import {API_ROUTES} from '../services/constant.ts';
import {CommentItem, CommentPostPayload, NearbyOffer, Offer, OfferDetails, UserInfo} from '../types.ts';
import {LoginStatus} from '../constant.ts';
import {UserLoginPayload} from './types.ts';
import {saveToken} from '../services/token.ts';

export const loadOffers = createAsyncThunk<void, undefined, {
  dispatch: typeof store.dispatch;
  state: State;
  extra: AxiosInstance;
}>('offers/loadOffers', async (_arg, {dispatch, extra: api}) => {
  dispatch(setLoadingState({ field: 'offers', value: true }));
  const { data } = await api.get<Offer[]>(API_ROUTES.Offers);
  dispatch(setOffers(data));
  dispatch(setLoadingState({ field: 'offers', value: false }));
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

export const fetchOfferDetails = createAsyncThunk<
  OfferDetails,
  string,
  {
    dispatch: typeof store.dispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/getOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingState({ field: 'offerDetails', value: true }));
      const { data } = await api.get<OfferDetails>(`${API_ROUTES.Offers}/${offerId}`);
      dispatch(setOfferDetails(data));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('Offer not found');
      }
      throw error;
    } finally {
      dispatch(setLoadingState({ field: 'offerDetails', value: false }));
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  NearbyOffer[],
  string,
  {
    dispatch: typeof store.dispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setLoadingState({ field: 'nearbyOffers', value: true }));
    const { data } = await api.get<NearbyOffer[]>(`${API_ROUTES.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data));
    dispatch(setLoadingState({ field: 'nearbyOffers', value: false }));
    return data;
  }
);

export const fetchOfferComments = createAsyncThunk<
  CommentItem[],
  string,
  {
    dispatch: typeof store.dispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'comments/OfferComments',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setLoadingState({ field: 'offerComments', value: true }));
    const { data } = await api.get<CommentItem[]>(`${API_ROUTES.Comments}/${offerId}`);
    dispatch(setComments(data));
    dispatch(setLoadingState({ field: 'offerComments', value: false }));
    return data;
  }
);

export const sendComment = createAsyncThunk<
  void,
  CommentPostPayload,
  {
    dispatch: typeof store.dispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/sendComment',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      dispatch(setLoadingState({ field: 'sendingComment', value: true }));
      const { data } = await api.post<CommentItem>(`${API_ROUTES.Comments}/${offerId}`, {comment, rating});
      dispatch(addComment(data));
      dispatch(setLoadingState({ field: 'sendingComment', value: false }));
    } catch (error) {
      throw error;
    }
  }
);

