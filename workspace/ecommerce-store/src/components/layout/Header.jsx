import { Fragment, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, HeartIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/index.js'
import { setTheme } from '../../store/uiSlice.js'

export const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const theme = useAppSelector(s => s.ui.theme)
	const cartCount = useAppSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0))

	return (
		<header className="sticky top-0 z-40 bg-surface/75 backdrop-blur border-b border-slate-200/60 dark:border-slate-700/60">
			<div className="container-responsive">
				<div className="flex items-center justify-between py-4 gap-4">
					<div className="flex items-center gap-3">
						<button className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMobileOpen(true)} aria-label="Open menu">
							<Bars3Icon className="h-6 w-6" />
						</button>
						<Link to="/" className="inline-flex items-center gap-2">
							<span className="h-8 w-8 rounded-lg bg-primary inline-block"/>
							<span className="font-heading text-lg font-bold tracking-tight">ShopX</span>
						</Link>
					</div>

					<div className="hidden lg:flex items-center gap-6">
						<NavLink to="/catalog" className={({isActive}) => `text-sm font-medium hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>Shop</NavLink>
						<NavLink to="/account" className={({isActive}) => `text-sm font-medium hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>Account</NavLink>
						<NavLink to="/about" className={({isActive}) => `text-sm font-medium hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>About</NavLink>
					</div>

					<div className="flex items-center gap-2 sm:gap-3">
						<div className="relative hidden sm:block">
							<input aria-label="Search products" placeholder="Search products" className="w-56 md:w-72 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" onKeyDown={(e)=>{ if(e.key==='Enter'){ navigate(`/catalog?q=${encodeURIComponent(e.currentTarget.value)}`)}}} />
						</div>
						<button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Wishlist">
							<HeartIcon className="h-6 w-6" />
						</button>
						<button className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" onClick={()=>navigate('/cart')} aria-label="Cart">
							<ShoppingCartIcon className="h-6 w-6" />
							{cartCount>0 && <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-white text-xs grid place-items-center">{cartCount}</span>}
						</button>
						<button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" onClick={()=>dispatch(setTheme(theme==='dark'?'light':'dark'))} aria-label="Toggle theme">
							{theme==='dark'? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			<Transition show={mobileOpen} as={Fragment}>
				<Dialog onClose={()=>setMobileOpen(false)} className="relative z-50">
					<Transition.Child as={Fragment} enter="ease-out duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/40" />
					</Transition.Child>
					<div className="fixed inset-0 flex">
						<Transition.Child as={Fragment} enter="transform transition ease-in-out duration-200" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-200" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
							<Dialog.Panel className="w-80 max-w-[80%] bg-surface dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-700/60 p-6 space-y-4">
								<div className="flex items-center justify-between">
									<Link to="/" className="inline-flex items-center gap-2" onClick={()=>setMobileOpen(false)}>
										<span className="h-8 w-8 rounded-lg bg-primary inline-block"/>
										<span className="font-heading text-lg font-bold tracking-tight">ShopX</span>
									</Link>
									<button className="p-2" onClick={()=>setMobileOpen(false)} aria-label="Close menu"><XMarkIcon className="h-6 w-6"/></button>
								</div>
								<nav className="grid gap-2">
									<NavLink to="/catalog" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Shop</NavLink>
									<NavLink to="/account" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Account</NavLink>
									<NavLink to="/about" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">About</NavLink>
								</nav>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</header>
	)
}