import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import uiReducer from './uiSlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'

const persistedCart = (() => {
	try {
		const raw = localStorage.getItem('cart');
		return raw ? JSON.parse(raw) : undefined;
	} catch {
		return undefined;
	}
})();

const preloadedState = {
	cart: persistedCart || undefined,
};

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		cart: cartReducer,
		auth: authReducer,
	},
	preloadedState,
})

store.subscribe(() => {
	try {
		localStorage.setItem('cart', JSON.stringify(store.getState().cart));
	} catch {}
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector