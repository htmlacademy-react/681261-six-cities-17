import { createReducer } from '@reduxjs/toolkit';
import {CITIES, LoginStatus} from '../constant.ts';
import {
  changeCity,
  resetUserInfo,
  setAuthStatus, setLoadingState, setNearbyOffers, setComments,
  setOfferDetails,
  setOffers,
  setUserInfo, addComment
} from './actions.ts';
import {CommentItem, NearbyOffer, Offer, OfferDetails, UserInfo} from '../types.ts';
import {dropToken} from '../services/token.ts';

export interface State {
  activeCity: string;
  offers: Offer[];
  authorizationStatus: LoginStatus;
  loadingState: {
    offers: boolean;
    offerDetails: boolean;
    nearbyOffers: boolean;
    offerComments: boolean;
    sendingComment: boolean;
  };
  user: UserInfo | null;
  offerDetails: OfferDetails | null;
  nearbyOffers: NearbyOffer[];
  comments: CommentItem[];
}

const initialState: State = {
  authorizationStatus: LoginStatus.NotAuth,
  activeCity: CITIES[0],
  offers: [],
  loadingState: {
    offers: false,
    offerDetails: false,
    nearbyOffers: false,
    offerComments: false,
    sendingComment: false
  },
  user: null,
  offerDetails: null,
  nearbyOffers: [],
  comments: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadingState, (state, action) => {
      const { field, value } = action.payload;
      state.loadingState[field] = value;
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
    })
    .addCase(setOfferDetails, (state, action) => {
      state.offerDetails = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    });
});
