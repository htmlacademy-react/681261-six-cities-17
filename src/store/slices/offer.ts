import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types';
import { SortOption } from '../../constant';

export const loadOffers = createAsyncThunk<Offer[], void, { extra: AxiosInstance }>(
  'offers/loadOffers',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [] as Offer[],
    currentSort: SortOption.Popular as SortOption,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    updateFavoriteInOffersList(state, action: PayloadAction<Offer>) {
      const index = state.offers.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      }
    },
    setCurrentSort(state, action: PayloadAction<SortOption>) {
      state.currentSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loading = false;
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
});

export default offersSlice.reducer;
export const { updateFavoriteInOffersList, setCurrentSort } = offersSlice.actions;
