import { useEffect, useRef } from 'react'
import { useAppSelector } from '../store/index.js'
import { Cart } from '../services/api.js'

export function useCartSync(){
	const cart = useAppSelector(s => s.cart)
	const t = useRef()
	useEffect(()=>{
		clearTimeout(t.current)
		t.current = setTimeout(()=>{
			Cart.sync(cart).catch(()=>{})
		}, 800)
		return ()=>clearTimeout(t.current)
	}, [cart])
}