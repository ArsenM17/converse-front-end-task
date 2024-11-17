import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';

const store = configureStore({
	reducer: {
		notes: noteReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;