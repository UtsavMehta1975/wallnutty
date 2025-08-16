import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
	withCredentials: true,
})

api.interceptors.request.use(cfg => {
	return cfg
})

api.interceptors.response.use(
	res => res,
	err => {
		throw err
	}
)

export const Products = {
	list: (params) => api.get('/products', { params }).then(r=>r.data),
	get: (id) => api.get(`/products/${id}`).then(r=>r.data),
}

export const Cart = {
	sync: (payload) => api.post('/cart/sync', payload).then(r=>r.data),
}