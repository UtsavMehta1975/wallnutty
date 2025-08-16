import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	theme: typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light',
	isGlobalLoading: false,
	modal: { isOpen: false, view: null, data: null },
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload
			if (state.theme === 'dark') {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
			localStorage.setItem('theme', state.theme)
		},
		openModal(state, action) {
			state.modal = { isOpen: true, ...action.payload }
		},
		closeModal(state) {
			state.modal = { isOpen: false, view: null, data: null }
		},
		setGlobalLoading(state, action) {
			state.isGlobalLoading = Boolean(action.payload)
		},
	},
})

export const { setTheme, openModal, closeModal, setGlobalLoading } = uiSlice.actions
export default uiSlice.reducer