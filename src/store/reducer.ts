import { createReducer } from '@reduxjs/toolkit';
import {CITIES, LoginStatus} from '../constant.ts';
import {changeCity, resetUserInfo, setAuthStatus, setOffers, setOffersLoadingState, setUserInfo} from './actions.ts';
import {Offer, UserInfo} from '../types.ts';
import {dropToken} from '../services/token.ts';

export interface State {
  activeCity: string;
  offers: Offer[];
  authorizationStatus: LoginStatus;
  loadingState: {
    offers: boolean;
  };
  user?: UserInfo | null;
}

const initialState: State = {
  authorizationStatus: LoginStatus.NotAuth,
  activeCity: CITIES[0],
  offers: [],
  loadingState: {
    offers: false
  },
  user: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingState, (state, action) => {
      state.loadingState.offers = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    })
    .addCase(resetUserInfo, (state) => {
      state.user = null;
      dropToken();
    });
});
