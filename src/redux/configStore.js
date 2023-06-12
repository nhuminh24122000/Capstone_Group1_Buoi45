import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/User';

export const store = configureStore({
	reducer: {
		UserReducer,
	},
});
