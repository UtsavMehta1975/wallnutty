import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: { id: 'demo', name: 'Demo Admin', email: 'admin@example.com', role: 'admin' },
	token: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action){
			state.user = action.payload.user
			state.token = action.payload.token || null
		},
		logout(state){
			state.user = null
			state.token = null
		},
		setUser(state, action){
			state.user = action.payload
		},
	},
})

export const { loginSuccess, logout, setUser } = authSlice.actions
export default authSlice.reducer

export const selectIsAdmin = (state) => state.auth.user?.role === 'admin'
export const selectUser = (state) => state.auth.user