import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/index.js'
import { removeFromCart, setQuantity, applyPromoCode, selectCartTotals } from '../../store/cartSlice.js'
import { Button } from '../../components/ui/Button.jsx'
import { Link } from 'react-router-dom'

export default function Cart(){
	const dispatch = useAppDispatch()
	const items = useAppSelector(s => s.cart.items)
	const promo = useAppSelector(s => s.cart.promoCode)
	const totals = useAppSelector(selectCartTotals)

	return (
		<div className="container-responsive py-8">
			<h1 className="section-title">Shopping Cart</h1>
			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
				<section className="lg:col-span-2 card-surface">
					{items.length===0 ? (
						<div className="p-8 text-center text-slate-500">Your cart is empty. <Link to="/catalog" className="text-primary">Continue shopping</Link></div>
					) : (
						<ul className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
							{items.map((i)=> (
								<li key={`${i.id}-${JSON.stringify(i.variant||{})}`} className="p-4 flex gap-4">
									<img src={i.image || i.images?.[0] || `https://picsum.photos/seed/c${i.id}/160/160`} alt={i.name} className="h-24 w-24 rounded-md object-cover" />
									<div className="flex-1">
										<div className="flex items-start justify-between gap-2">
											<div>
												<div className="font-medium">{i.name}</div>
												{i.variant && <div className="text-xs text-slate-500">{Object.entries(i.variant).map(([k,v])=>`${k}: ${v}`).join(', ')}</div>}
											</div>
											<div className="font-semibold text-accent">${(i.discountedPrice ?? i.price).toFixed(2)}</div>
										</div>
										<div className="mt-3 flex items-center gap-2">
											<button className="h-8 w-8 rounded-md border" onClick={()=>dispatch(setQuantity({ id: i.id, variant: i.variant, qty: i.qty-1 }))} aria-label="Decrease">-</button>
											<input value={i.qty} readOnly className="h-8 w-12 text-center rounded-md border bg-transparent" />
											<button className="h-8 w-8 rounded-md border" onClick={()=>dispatch(setQuantity({ id: i.id, variant: i.variant, qty: i.qty+1 }))} aria-label="Increase">+</button>
											<button className="ml-auto text-sm text-rose-600" onClick={()=>dispatch(removeFromCart({ id: i.id, variant: i.variant }))}>Remove</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>

				<aside className="card-surface p-5 h-fit">
					<h4 className="font-semibold">Order Summary</h4>
					<div className="mt-4 space-y-2 text-sm">
						<div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
						<div className="flex justify-between"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
						<div className="flex justify-between"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
						<div className="flex justify-between font-semibold text-lg pt-2 border-t border-slate-200/60 dark:border-slate-700/60"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
					</div>
					<form className="mt-4 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
						<input value={promo} onChange={(e)=>dispatch(applyPromoCode(e.target.value))} placeholder="Promo code" className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
						<Button variant="outline">Apply</Button>
					</form>
					<Button className="w-full mt-4" size="lg" as={Link} to="/checkout">Continue to checkout</Button>
				</aside>
			</div>
		</div>
	)
}