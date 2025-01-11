import { createAction } from '@reduxjs/toolkit';
import {Offer, UserInfo} from '../types.ts';
import { LoginStatus } from '../constant.ts';

export const changeCity = createAction<string>('city/changeCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setOffersLoadingState = createAction<boolean>('load/setOffersLoadingState');
export const setAuthStatus = createAction<LoginStatus>('user/setAuthStatus');
export const setUserInfo = createAction<UserInfo>('user/setUserData');
export const resetUserInfo = createAction('user/resetUserInfo');
