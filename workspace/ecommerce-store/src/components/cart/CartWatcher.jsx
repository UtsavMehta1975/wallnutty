import { useCartSync } from '../../hooks/useCartSync.js'

export const CartWatcher = () => {
	useCartSync()
	return null
}