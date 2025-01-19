export type UserLoginPayload = {
  email: string;
  password: string;
}

export type ChangeFavoriteStatusPayload = {
  offerId: string;
  status: 1 | 0;
}
