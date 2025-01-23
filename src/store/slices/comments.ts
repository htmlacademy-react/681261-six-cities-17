import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CommentItem, CommentPostPayload } from '../../types';

export const fetchOfferComments = createAsyncThunk<CommentItem[], string, { extra: AxiosInstance }>(
  'comments/fetchOfferComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<CommentItem[]>(`/comments/${offerId}`);
    return data;
  }
);

export const sendComment = createAsyncThunk<CommentItem, CommentPostPayload, { extra: AxiosInstance }>(
  'comments/sendComment',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<CommentItem>(`/comments/${offerId}`, { comment, rating });
    return data;
  }
);

const comments = createSlice({
  name: 'comments',
  initialState: {
    comments: [] as CommentItem[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferComments.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch comments';
        state.loading = false;
      })
      .addCase(sendComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(sendComment.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to send comment';
        state.loading = false;
      });
  },
});

export default comments.reducer;
