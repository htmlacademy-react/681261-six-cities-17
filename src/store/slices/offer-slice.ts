import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types';

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
    loading: false,
    error: null as string | null,
  },
  reducers: {},
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
