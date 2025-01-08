import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../constant.ts';
import { changeCity, setOffers, setOffersLoadingState } from './actions.ts';
import { Offer } from '../types.ts';

export interface State {
  activeCity: string;
  offers: Offer[];
  loadingState: {
    offers: boolean;
  };
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: [],
  loadingState: {
    offers: false
  }
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
    });
});
