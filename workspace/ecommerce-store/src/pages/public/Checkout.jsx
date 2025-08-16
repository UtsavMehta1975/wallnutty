import { Routes, Route, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '../../components/ui/Button.jsx'
import { useAppSelector } from '../../store/index.js'
import dayjs from 'dayjs'

const shippingSchema = yup.object({
	fullName: yup.string().required(),
	address1: yup.string().required(),
	city: yup.string().required(),
	zip: yup.string().required(),
	country: yup.string().required(),
	shippingMethod: yup.string().required(),
})

function Shipping(){
	const navigate = useNavigate()
	const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(shippingSchema), defaultValues:{ shippingMethod:'standard' }})
	return (
		<form className="container-responsive py-8 max-w-3xl" onSubmit={handleSubmit(()=>navigate('payment'))}>
			<h1 className="section-title">Checkout - Shipping</h1>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				<input placeholder="Full name" {...register('fullName')} className="rounded-md border px-3 py-2" aria-invalid={!!errors.fullName}/>
				<input placeholder="Address line 1" {...register('address1')} className="rounded-md border px-3 py-2" aria-invalid={!!errors.address1}/>
				<input placeholder="City" {...register('city')} className="rounded-md border px-3 py-2" aria-invalid={!!errors.city}/>
				<input placeholder="ZIP" {...register('zip')} className="rounded-md border px-3 py-2" aria-invalid={!!errors.zip}/>
				<input placeholder="Country" {...register('country')} className="rounded-md border px-3 py-2" aria-invalid={!!errors.country}/>
			</div>
			<div className="mt-6">
				<div className="text-sm font-medium">Shipping Method</div>
				<div className="mt-3 grid gap-3">
					<label className="flex items-center gap-3 rounded-md border p-3"><input type="radio" value="standard" {...register('shippingMethod')} /> Standard (3-5 days)</label>
					<label className="flex items-center gap-3 rounded-md border p-3"><input type="radio" value="express" {...register('shippingMethod')} /> Express (1-2 days)</label>
				</div>
			</div>
			<div className="mt-6 flex justify-end"><Button type="submit">Continue to payment</Button></div>
		</form>
	)
}

function Payment(){
	const navigate = useNavigate()
	return (
		<div className="container-responsive py-8 max-w-3xl">
			<h1 className="section-title">Checkout - Payment</h1>
			<div className="mt-6 card-surface p-6">
				<div className="text-sm text-slate-600 dark:text-slate-300">Credit card (mock)</div>
				<div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
					<input placeholder="Cardholder name" className="rounded-md border px-3 py-2" />
					<input placeholder="Card number" inputMode="numeric" className="rounded-md border px-3 py-2" />
					<input placeholder="MM/YY" className="rounded-md border px-3 py-2" />
					<input placeholder="CVC" className="rounded-md border px-3 py-2" />
				</div>
				<div className="mt-4 flex justify-end"><Button onClick={()=>navigate('confirm')}>Pay now</Button></div>
			</div>
			<div className="mt-6 card-surface p-6">
				<div className="text-sm text-slate-600 dark:text-slate-300">Saved methods</div>
				<div className="mt-3 grid gap-3">
					<label className="flex items-center gap-3 rounded-md border p-3"><input type="radio" name="saved"/> •••• 4242 - Visa</label>
					<label className="flex items-center gap-3 rounded-md border p-3"><input type="radio" name="saved"/> •••• 1881 - MasterCard</label>
				</div>
			</div>
		</div>
	)
}

function Confirm(){
	const totals = useAppSelector(s => ({ subtotal: s.cart.items.reduce((sum, i)=> sum + (i.discountedPrice ?? i.price) * i.qty, 0) }))
	return (
		<div className="container-responsive py-8 max-w-3xl">
			<h1 className="section-title">Order Confirmed</h1>
			<div className="mt-6 card-surface p-6">
				<div className="text-sm text-slate-600 dark:text-slate-300">Thank you! Your order has been placed.</div>
				<div className="mt-2 text-sm">Estimated delivery: {dayjs().add(4,'day').format('MMM D')} - {dayjs().add(6,'day').format('MMM D')}</div>
				<div className="mt-2 text-sm">Order total: ${totals.subtotal.toFixed(2)}</div>
				<div className="mt-4"><a className="text-primary" href="/">Continue shopping</a></div>
			</div>
		</div>
	)
}

export default function Checkout(){
	return (
		<Routes>
			<Route index element={<Shipping />} />
			<Route path="payment" element={<Payment />} />
			<Route path="payment/confirm" element={<Confirm />} />
		</Routes>
	)
}