import { motion } from 'framer-motion'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '../../store/index.js'
import { addToCart } from '../../store/cartSlice.js'
import toast from 'react-hot-toast'
import styles from '../ui/Badge.module.css'

export const ProductCard = ({ product }) => {
	const dispatch = useAppDispatch()
	const isDiscounted = product.discountedPrice && product.discountedPrice < product.price
	const outOfStock = product.stock === 0

	return (
		<motion.div whileHover={{ y: -4 }} className="group card-surface overflow-hidden">
			<div className="relative">
				<img src={product.images?.[0]} alt={product.name} className="w-full h-60 object-cover" loading="lazy" />
				{isDiscounted && (
					<span className={`${styles.badge} ${styles['badge--pill']} absolute left-3 top-3`}>-{Math.round(100 - (product.discountedPrice / product.price) * 100)}%</span>
				)}
				{outOfStock && (
					<span className="absolute inset-x-0 bottom-0 bg-rose-600 text-white text-center text-xs py-1">Out of stock</span>
				)}
				<button aria-label="Wishlist" className="absolute left-3 bottom-3 grid place-items-center h-9 w-9 rounded-full bg-white/90 dark:bg-slate-900/70 shadow hover:scale-105 transition">
					<HeartIcon className="h-5 w-5 text-rose-500" />
				</button>
				<button disabled={outOfStock} onClick={()=>{ dispatch(addToCart(product)); toast.success('Added to cart'); }} aria-label="Add to cart" className="absolute right-3 bottom-3 grid place-items-center h-10 w-10 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed">
					<ShoppingCartIcon className="h-5 w-5" />
				</button>
			</div>
			<div className="p-4">
				<h3 className="font-semibold truncate">{product.name}</h3>
				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-baseline gap-2">
						<span className="text-lg font-bold text-accent">${product.discountedPrice ?? product.price}</span>
						{isDiscounted && <span className="text-sm text-slate-500 line-through">${product.price}</span>}
					</div>
					{product.rating && (
						<div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">★ {product.rating}</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}