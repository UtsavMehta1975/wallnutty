import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/index.js'
import { selectIsAdmin } from '../../store/authSlice.js'

export const RequireAdmin = ({ children }) => {
	const isAdmin = useAppSelector(selectIsAdmin)
	const location = useLocation()
	if (!isAdmin) {
		return <Navigate to="/" state={{ from: location }} replace />
	}
	return children
}