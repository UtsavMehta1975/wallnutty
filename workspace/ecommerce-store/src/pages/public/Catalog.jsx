import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../../components/product/ProductCard.jsx'
import { Button } from '../../components/ui/Button.jsx'

const mockProducts = Array.from({length:48}).map((_,i)=>({
	id: i+1,
	name: `Pro Gadget ${i+1}`,
	price: 99 + (i%7)*10,
	discountedPrice: i%3===0 ? 79 + (i%7)*10 : undefined,
	images: [`https://picsum.photos/seed/cp${i}/600/400`],
	rating: (3.5 + (i%3)*0.5).toFixed(1),
	stock: i%5===0 ? 0 : (10 + i),
	category: ['Audio','Wearables','Smart Home','Gaming'][i%4],
}))

const pageSize = 12

export default function Catalog(){
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [sort, setSort] = useState('newest')
	const [filters, setFilters] = useState({ categories: new Set(), rating: 0, price:[0,300] })

	useEffect(()=>{ const t=setTimeout(()=>setLoading(false), 500); return ()=>clearTimeout(t)},[])

	const filtered = useMemo(()=>{
		let data = [...mockProducts]
		if (filters.categories.size) data = data.filter(p => filters.categories.has(p.category))
		if (filters.rating) data = data.filter(p => Number(p.rating) >= filters.rating)
		data = data.filter(p => (p.discountedPrice ?? p.price) >= filters.price[0] && (p.discountedPrice ?? p.price) <= filters.price[1])
		switch (sort) {
			case 'price_asc': data.sort((a,b)=> (a.discountedPrice??a.price)-(b.discountedPrice??b.price)); break
			case 'price_desc': data.sort((a,b)=> (b.discountedPrice??b.price)-(a.discountedPrice??a.price)); break
			case 'popularity': data.sort((a,b)=> Number(b.rating)-Number(a.rating)); break
			default: break // newest simulated by default order
		}
		return data
	},[sort, filters])

	const totalPages = Math.ceil(filtered.length / pageSize)
	const pageItems = loading ? Array.from({length:pageSize}) : filtered.slice((page-1)*pageSize, page*pageSize)

	return (
		<div className="container-responsive py-8">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<aside className="card-surface p-4 h-fit lg:sticky lg:top-24">
					<h4 className="font-semibold">Filters</h4>
					<div className="mt-4">
						<div className="text-sm font-medium">Categories</div>
						<div className="mt-2 grid grid-cols-2 gap-2 text-sm">
							{['Audio','Wearables','Smart Home','Gaming'].map(c => (
								<label key={c} className="flex items-center gap-2">
									<input type="checkbox" onChange={(e)=>{
										const next = new Set(filters.categories)
										e.target.checked ? next.add(c) : next.delete(c)
										setFilters(f=>({...f, categories: next }))
									}} />
									<span>{c}</span>
								</label>
							))}
						</div>
					</div>
					<div className="mt-4">
						<div className="text-sm font-medium">Rating</div>
						<div className="mt-2 flex gap-2 text-sm">
							{[4,4.5,5].map(r => (
								<button key={r} className={`px-2 py-1 rounded border ${filters.rating===r? 'bg-primary text-white border-primary':'border-slate-300 dark:border-slate-700'}`} onClick={()=>setFilters(f=>({...f, rating: f.rating===r? 0 : r }))}>
									≥ {r}★
								</button>
							))}
						</div>
					</div>
					<div className="mt-4">
						<div className="text-sm font-medium">Price</div>
						<div className="mt-2 flex items-center gap-2">
							<input type="number" min={0} max={1000} value={filters.price[0]} onChange={(e)=>setFilters(f=>({...f, price:[Number(e.target.value), f.price[1]]}))} className="w-20 rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-sm"/>
							<span className="text-slate-500">—</span>
							<input type="number" min={0} max={1000} value={filters.price[1]} onChange={(e)=>setFilters(f=>({...f, price:[f.price[0], Number(e.target.value)]}))} className="w-20 rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-sm"/>
						</div>
					</div>
					<div className="mt-6">
						<Button variant="outline" size="sm" onClick={()=>{ setFilters({ categories:new Set(), rating:0, price:[0,300]}); setPage(1) }}>Reset</Button>
					</div>
				</aside>

				<section className="lg:col-span-3">
					<div className="flex items-center justify-between">
						<h1 className="section-title">Catalog</h1>
						<select value={sort} onChange={(e)=> setSort(e.target.value)} className="rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
							<option value="newest">Newest</option>
							<option value="price_asc">Price: Low to High</option>
							<option value="price_desc">Price: High to Low</option>
							<option value="popularity">Popularity</option>
						</select>
					</div>

					<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
						{pageItems.map((p,idx)=> (
							<div key={idx} className={loading? 'h-72 skeleton' : ''}>
								{!loading && <ProductCard product={p} />}
							</div>
						))}
					</div>

					<div className="mt-6 flex justify-center gap-2">
						<Button variant="outline" size="sm" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</Button>
						{Array.from({length: totalPages}).map((_,i)=> (
							<button key={i} className={`h-9 min-w-9 px-3 rounded-md text-sm border ${page===i+1? 'bg-primary text-white border-primary':'border-slate-300 dark:border-slate-700'}`} onClick={()=>setPage(i+1)}>{i+1}</button>
						))}
						<Button variant="outline" size="sm" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</Button>
					</div>
				</section>
			</div>
		</div>
	)
}