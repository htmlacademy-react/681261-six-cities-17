import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorites, Offer } from '../../types.ts';
import { API_ROUTES } from '../../services/constant.ts';
import { AxiosInstance } from 'axios';
import { ChangeFavoriteStatusPayload } from '../types.ts';

type InitialState = {
  favorites: Favorites;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  favorites: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<Favorites, void, { extra: AxiosInstance }>(
  'favorites/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Favorites>(API_ROUTES.Favorite);
    return data;
  }
);

export const changeFavoriteStatus = createAsyncThunk<Offer, ChangeFavoriteStatusPayload, { extra: AxiosInstance }>(
  'favorites/changeFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(`${API_ROUTES.Favorite}/${offerId}/${status}`);
    return data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    updateFavoriteInFavorites(state, action: PayloadAction<Offer>) {
      const index = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.favorites[index] = action.payload;
      }

      if (action.payload.isFavorite) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch favorites list';
        state.loading = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const index = state.favorites.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.favorites[index] = action.payload;
        }
      });
  },
});

export default favoritesSlice.reducer;
export const { updateFavoriteInFavorites } = favoritesSlice.actions;
