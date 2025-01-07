import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import {useDispatch} from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({ reducer });
export const useAppDispatch = () => useDispatch<AppDispatch>();
