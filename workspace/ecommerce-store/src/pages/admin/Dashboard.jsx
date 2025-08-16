export default function AdminDashboard(){
	return (
		<div className="container-responsive py-8">
			<h1 className="section-title">Admin Dashboard</h1>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="card-surface p-4"><div className="text-xs text-slate-500">Revenue</div><div className="mt-1 text-2xl font-bold">$54,320</div></div>
				<div className="card-surface p-4"><div className="text-xs text-slate-500">Orders</div><div className="mt-1 text-2xl font-bold">1,284</div></div>
				<div className="card-surface p-4"><div className="text-xs text-slate-500">Users</div><div className="mt-1 text-2xl font-bold">8,921</div></div>
				<div className="card-surface p-4"><div className="text-xs text-slate-500">Low Stock</div><div className="mt-1 text-2xl font-bold">12</div></div>
			</div>
			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2 card-surface h-72 grid place-items-center text-slate-500">[Sales graph 30-day]</div>
				<div className="card-surface h-72 grid place-items-center text-slate-500">[Low stock alerts]</div>
			</div>
			<div className="mt-6 card-surface h-72 grid place-items-center text-slate-500">[Recent orders table]</div>
		</div>
	)
}