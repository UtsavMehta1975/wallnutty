export default function Account(){
	return (
		<div className="container-responsive py-8">
			<h1 className="section-title">Your Account</h1>
			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 card-surface h-[20rem] grid place-items-center text-slate-500">[Order history table with status tracking]</div>
				<div className="card-surface h-[20rem] grid place-items-center text-slate-500">[Address book management]</div>
				<div className="lg:col-span-2 card-surface h-[20rem] grid place-items-center text-slate-500">[Wishlist with move-to-cart]</div>
				<div className="card-surface h-[20rem] grid place-items-center text-slate-500">[Account settings form]</div>
			</div>
		</div>
	)
}