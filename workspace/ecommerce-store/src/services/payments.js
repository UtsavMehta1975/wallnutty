import { api } from './api.js'

export const Payments = {
	createIntent: ({ amount, currency = 'usd', metadata = {} }) =>
		api.post('/payments/create-intent', { amount, currency, metadata }).then(r=>r.data),
}