import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import { Button } from '../../components/ui/Button.jsx'
import { useAppDispatch } from '../../store/index.js'
import { addToCart } from '../../store/cartSlice.js'

const mock = (id) => ({
	id,
	name: 'Premium Headphones X',
	description: 'Studio-grade sound, ANC, 40h battery.',
	price: 249,
	discountedPrice: 199,
	images: [1,2,3,4].map(i=>`https://picsum.photos/seed/pd${i}/800/600`),
	rating: 4.6,
	reviews: 132,
	colors: ['black','silver','navy'],
	sizes: ['S','M','L'],
	stock: 12,
})

export default function Product(){
	const { id } = useParams()
	const product = useMemo(()=>mock(id),[id])
	const [active, setActive] = useState(0)
	const [lightbox, setLightbox] = useState(false)
	const [color, setColor] = useState(product.colors[0])
	const [size, setSize] = useState(product.sizes[0])
	const dispatch = useAppDispatch()

	return (
		<div className="container-responsive py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
				<div>
					<div className="relative card-surface overflow-hidden group">
						<img src={product.images[active]} alt={product.name} className="w-full aspect-[4/3] object-cover transition duration-300 group-hover:scale-105" />
						<button className="absolute right-3 bottom-3 p-2 rounded-md bg-white/90 dark:bg-slate-900/70" onClick={()=>setLightbox(true)} aria-label="Open fullscreen">
							<MagnifyingGlassPlusIcon className="h-6 w-6" />
						</button>
					</div>
					<div className="mt-3 flex gap-3 overflow-x-auto">
						{product.images.map((src,idx)=> (
							<button key={src} onClick={()=>setActive(idx)} className={`h-20 w-28 shrink-0 rounded-md overflow-hidden border ${idx===active?'border-primary':'border-transparent'}`}>
								<img src={src} alt="Thumb" className="h-full w-full object-cover" />
							</button>
						))}
					</div>
				</div>

				<div>
					<h1 className="font-heading text-2xl md:text-3xl font-extrabold">{product.name}</h1>
					<div className="mt-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
						<div>★ {product.rating} ({product.reviews} reviews)</div>
						{product.stock>0 ? <span className="text-green-600">In stock</span> : <span className="text-rose-600">Out of stock</span>}
					</div>
					<div className="mt-3 flex items-baseline gap-2">
						<span className="text-2xl font-bold text-accent">${product.discountedPrice}</span>
						<span className="text-slate-500 line-through">${product.price}</span>
					</div>

					<div className="mt-6">
						<div className="text-sm font-medium">Color</div>
						<div className="mt-2 flex gap-2">
							{product.colors.map(c => (
								<button key={c} onClick={()=>setColor(c)} aria-label={c} className={`h-9 w-9 rounded-full border-2 ${color===c? 'border-primary':'border-transparent'}`} style={{ backgroundColor: c }} />
							))}
						</div>
					</div>

					<div className="mt-6">
						<div className="text-sm font-medium">Size</div>
						<div className="mt-2 flex gap-2">
							{product.sizes.map(s => (
								<button key={s} onClick={()=>setSize(s)} className={`h-9 min-w-9 px-3 rounded-md text-sm border ${size===s? 'bg-primary text-white border-primary':'border-slate-300 dark:border-slate-700'}`}>{s}</button>
							))}
						</div>
					</div>

					<div className="mt-6 flex gap-3">
						<Button size="lg" onClick={()=>dispatch(addToCart({ ...product, variant:{ color, size } }))}>Add to cart</Button>
						<Button size="lg" variant="outline">Wishlist</Button>
					</div>

					<div className="mt-8 card-surface">
						<details className="p-5" open>
							<summary className="cursor-pointer font-semibold">Product details</summary>
							<p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{product.description}</p>
						</details>
						<details className="p-5 border-t border-slate-200/60 dark:border-slate-700/60">
							<summary className="cursor-pointer font-semibold">Specifications</summary>
							<ul className="mt-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
								<li>Bluetooth 5.3</li>
								<li>Active Noise Cancellation</li>
								<li>40 hours battery</li>
							</ul>
						</details>
					</div>

					<div className="mt-8">
						<h3 className="section-title">Frequently bought together</h3>
						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{[1,2].map(i=> (
								<div key={i} className="h-28 card-surface grid place-items-center text-sm text-slate-500">Bundle item {i}</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<Dialog open={lightbox} onClose={()=>setLightbox(false)} className="relative z-50">
				<div className="fixed inset-0 bg-black/80" aria-hidden="true" />
				<div className="fixed inset-0 p-6 grid place-items-center">
					<img src={product.images[active]} alt="Fullscreen" className="max-h-[90vh] rounded-lg" />
				</div>
			</Dialog>
		</div>
	)
}