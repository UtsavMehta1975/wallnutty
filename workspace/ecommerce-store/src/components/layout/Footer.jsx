import { Link } from 'react-router-dom'

export const Footer = () => {
	return (
		<footer className="mt-16 border-t border-slate-200/60 dark:border-slate-700/60">
			<div className="container-responsive py-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center gap-2">
							<span className="h-8 w-8 rounded-lg bg-primary inline-block"/>
							<span className="font-heading text-lg font-bold tracking-tight">ShopX</span>
						</div>
						<p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Premium products, delightful experience.</p>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Company</h4>
						<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
							<li><Link to="/about" className="hover:text-primary">About</Link></li>
							<li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
							<li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Support</h4>
						<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
							<li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
							<li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
							<li><Link to="/returns" className="hover:text-primary">Returns</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Stay Updated</h4>
						<form className="flex gap-2" onSubmit={(e)=>e.preventDefault()} aria-label="Newsletter signup">
							<input type="email" required placeholder="Your email" className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
							<button className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:opacity-90">Subscribe</button>
						</form>
					</div>
				</div>
				<div className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} ShopX. All rights reserved.</div>
			</div>
		</footer>
	)
}