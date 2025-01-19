import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {OfferDetails, NearbyOffer, Offer} from '../../types';

export const fetchOfferDetails = createAsyncThunk<OfferDetails, string, { extra: AxiosInstance }>(
  'details/fetchOfferDetails',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferDetails>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<NearbyOffer[], string, { extra: AxiosInstance }>(
  'details/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<NearbyOffer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    offerDetails: null as OfferDetails | null,
    nearbyOffers: [] as NearbyOffer[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    updateFavoriteInDetails(state, action: PayloadAction<Offer>) {
      if (state.offerDetails?.id === action.payload.id) {
        state.offerDetails.isFavorite = action.payload.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.offerDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferDetails.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch offer details';
        state.loading = false;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.loading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch nearby offers';
        state.loading = false;
      });
  },
});

export default detailsSlice.reducer;
export const { updateFavoriteInDetails } = detailsSlice.actions;
