import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types.ts';

export const changeCity = createAction<string>('changeCity');
export const loadOffers = createAction<Offer[]>('loadOffers');

