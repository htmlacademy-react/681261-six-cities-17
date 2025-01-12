import { createAction } from '@reduxjs/toolkit';
import {CommentItem, NearbyOffer, Offer, OfferDetails, UserInfo} from '../types.ts';
import { LoginStatus } from '../constant.ts';
import {RootState} from './index.ts';

export const changeCity = createAction<string>('city/changeCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setAuthStatus = createAction<LoginStatus>('user/setAuthStatus');
export const setUserInfo = createAction<UserInfo>('user/setUserData');
export const resetUserInfo = createAction('user/resetUserInfo');
export const setOfferDetails = createAction<OfferDetails>('offers/setOfferDetails');
export const setLoadingState = createAction<{ field: keyof RootState['loadingState']; value: boolean }>('setLoadingState');
export const setNearbyOffers = createAction<NearbyOffer[]>('offers/setNearbyOffers');
export const setComments = createAction<CommentItem[]>('comments/setComments');
export const addComment = createAction<CommentItem>('comments/addComment');

