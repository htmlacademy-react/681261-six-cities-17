import { RootState } from '../index.ts';

export const getFavorites = (state: RootState) => state.favorites.favorites;
