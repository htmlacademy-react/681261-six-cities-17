import { RootState } from '../index.ts';

export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
