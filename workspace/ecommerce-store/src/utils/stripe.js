import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = import.meta.env.VITE_STRIPE_PK
	? loadStripe(import.meta.env.VITE_STRIPE_PK)
	: null