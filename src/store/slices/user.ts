import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { LoginStatus } from '../../constant';
import { UserInfo } from '../../types';
import { saveToken, dropToken } from '../../services/token';
import { UserLoginPayload } from '../types.ts';

export const loginAction = createAsyncThunk<UserInfo, UserLoginPayload, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserInfo>('/login', { email, password });
      saveToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'user/logout',
  async (_, { extra: api }) => {
    await api.delete('/logout');
    dropToken();
  }
);

export const login = createAsyncThunk<UserInfo, void, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<UserInfo>('/login');
    return data;
  }
);

type UserState = {
  authorizationStatus: LoginStatus;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  authorizationStatus: LoginStatus.NotAuth,
  user: null,
  loading: false,
  error: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserInfo(state) {
      state.user = null;
      state.authorizationStatus = LoginStatus.NotAuth;
      dropToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.authorizationStatus = LoginStatus.Auth;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.authorizationStatus = LoginStatus.NotAuth;
        state.error = action.error.message || 'Failed to authenticate';
        state.loading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.authorizationStatus = LoginStatus.Auth;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = LoginStatus.NotAuth;
        state.error = action.error.message || 'Login failed';
        state.loading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.NotAuth;
        state.user = null;
      });
  },
});

export const { resetUserInfo } = user.actions;
export default user.reducer;
