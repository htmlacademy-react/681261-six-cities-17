export type UserLoginPayload = {
  email: string;
  password: string;
}

export enum FAVORITE_STATUS {
  ADD = 1,
  REMOVE = 0,
}

export type ChangeFavoriteStatusPayload = {
  offerId: string;
  status: FAVORITE_STATUS;
}
