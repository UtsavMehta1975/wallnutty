import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	items: [], // {id, name, price, discountedPrice, image, qty, variant}
	promoCode: '',
}

const findIndex = (items, id, variant) => items.findIndex(i => i.id === id && JSON.stringify(i.variant||{}) === JSON.stringify(variant||{}))

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const { id, variant } = action.payload
			const idx = findIndex(state.items, id, variant)
			if (idx >= 0) {
				state.items[idx].qty += 1
			} else {
				state.items.push({ ...action.payload, qty: 1 })
			}
		},
		removeFromCart(state, action) {
			const { id, variant } = action.payload
			state.items = state.items.filter(i => !(i.id === id && JSON.stringify(i.variant||{}) === JSON.stringify(variant||{})))
		},
		setQuantity(state, action) {
			const { id, variant, qty } = action.payload
			const idx = findIndex(state.items, id, variant)
			if (idx >= 0) {
				state.items[idx].qty = Math.max(1, qty)
			}
		},
		clearCart(state) {
			state.items = []
			state.promoCode = ''
		},
		applyPromoCode(state, action) {
			state.promoCode = action.payload
		},
	},
})

export const { addToCart, removeFromCart, setQuantity, clearCart, applyPromoCode } = cartSlice.actions
export default cartSlice.reducer

export const selectCartTotals = (state) => {
	const subtotal = state.cart.items.reduce((sum, i) => sum + (i.discountedPrice ?? i.price) * i.qty, 0)
	const discount = 0 // placeholder; apply based on promoCode API result later
	const shipping = subtotal > 100 ? 0 : 7.5
	const tax = subtotal * 0.07
	const total = subtotal - discount + shipping + tax
	return { subtotal, discount, shipping, tax, total }
}