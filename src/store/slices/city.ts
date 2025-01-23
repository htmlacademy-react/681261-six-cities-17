import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../../constant.ts';

type InitialState = {
  activeCity: string;
}

const initialState: InitialState = {
  activeCity: CITIES[0]
};

const city = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
  },
});

export const { changeCity } = city.actions;
export default city.reducer;
