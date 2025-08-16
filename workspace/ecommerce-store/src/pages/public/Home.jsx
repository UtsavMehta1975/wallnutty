import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import { ProductCard } from '../../components/product/ProductCard.jsx'
import { Button } from '../../components/ui/Button.jsx'

const mockProducts = Array.from({length:8}).map((_,i)=>({
	id: i+1,
	name: `Premium Headphones ${i+1}`,
	price: 199 + i*10,
	discountedPrice: 179 + i*10,
	images: [`https://picsum.photos/seed/p${i}/600/400`],
	rating: (4 + (i%2)*0.5).toFixed(1),
	stock: i%5===0 ? 0 : 10,
}))

const categories = [
	{ name: 'Audio', image: 'https://picsum.photos/seed/c1/600/400' },
	{ name: 'Wearables', image: 'https://picsum.photos/seed/c2/600/400' },
	{ name: 'Smart Home', image: 'https://picsum.photos/seed/c3/600/400' },
	{ name: 'Gaming', image: 'https://picsum.photos/seed/c4/600/400' },
]

export default function Home() {
	const [loading, setLoading] = useState(true)
	useEffect(()=>{ const t=setTimeout(()=>setLoading(false), 600); return ()=>clearTimeout(t)},[])

	return (
		<div>
			<section className="container-responsive pt-6 md:pt-10">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 card-surface overflow-hidden">
						<Swiper modules={[Autoplay, Navigation, Pagination]} navigation pagination={{ clickable:true }} autoplay={{delay:3500}} className="h-full">
							{[1,2,3].map(i=> (
								<SwiperSlide key={i}>
									<div className="relative h-72 md:h-96">
										<img src={`https://picsum.photos/seed/h${i}/1200/600`} alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
										<div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
										<div className="relative h-full p-8 md:p-12 flex flex-col justify-end text-white">
											<h2 className="font-heading text-3xl md:text-4xl font-extrabold">Elevate Your Sound</h2>
											<p className="mt-2 max-w-xl text-sm md:text-base text-white/90">Experience premium audio with noise-cancellation and all-day comfort.</p>
											<div className="mt-4">
												<Button size="lg" variant="primary">Shop Now</Button>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="card-surface p-6 flex flex-col justify-center">
						<h3 className="section-title">Join our newsletter</h3>
						<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Get product news and exclusive offers.</p>
						<form className="mt-4 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
							<input type="email" required placeholder="you@example.com" className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
							<Button>Subscribe</Button>
						</form>
					</div>
				</div>
			</section>

			<section className="container-responsive mt-10">
				<h3 className="section-title">Shop by Category</h3>
				<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
					{categories.map((c)=> (
						<motion.div key={c.name} whileHover={{ y: -4 }} className="relative overflow-hidden rounded-xl h-36 md:h-44">
							<img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
							<div className="absolute inset-0 bg-black/30" />
							<div className="relative h-full p-4 flex items=end text-white font-semibold">{c.name}</div>
						</motion.div>
					))}
				</div>
			</section>

			<section className="container-responsive mt-12">
				<div className="flex items-center justify-between">
					<h3 className="section-title">Featured</h3>
					<a href="/catalog" className="text-sm text-primary">View all</a>
				</div>
				<div className="mt-4">
					<Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable:true }} breakpoints={{ 0:{ slidesPerView:1.1, spaceBetween:12 }, 640:{ slidesPerView:2.1, spaceBetween:16 }, 1024:{ slidesPerView:3.1, spaceBetween:20 } }}>
						{(loading ? Array.from({length:8}) : mockProducts).map((p,idx)=> (
							<SwiperSlide key={idx}>
								<div className={loading? 'h-72 skeleton rounded-xl' : ''}>
									{!loading && <ProductCard product={p} />}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			<section className="container-responsive mt-14">
				<h3 className="section-title">What customers say</h3>
				<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
					{[1,2,3].map(i=> (
						<div key={i} className="card-surface p-6">
							<div className="flex items-center gap-3">
								<img src={`https://i.pravatar.cc/80?img=${i+3}`} alt="Avatar" className="h-10 w-10 rounded-full" />
								<div>
									<div className="font-medium">Alex Parker</div>
									<div className="text-xs text-slate-500">Verified Buyer</div>
								</div>
							</div>
							<p className="mt-3 text-sm text-slate-700 dark:text-slate-300">Amazing quality and fast shipping. Highly recommend!</p>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}