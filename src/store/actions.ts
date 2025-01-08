import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types.ts';

export const changeCity = createAction<string>('city/changeCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setOffersLoadingState = createAction<boolean>('load/setOffersLoadingState');

