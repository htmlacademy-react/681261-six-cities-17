import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../constant.ts';
import {changeCity, loadOffers} from './actions.ts';
import { Offer } from '../types.ts';

interface State {
  activeCity: string;
  offers: Offer[];
}

const initialState: State = {
  activeCity: CITIES[0],
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
