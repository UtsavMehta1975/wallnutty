import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/index.js'
import { loginSuccess, logout as logoutAction, selectIsAdmin, selectUser } from '../store/authSlice.js'

export function useAuth(){
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const isAdmin = useAppSelector(selectIsAdmin)

	const login = useCallback((user, token)=>{
		dispatch(loginSuccess({ user, token }))
	},[dispatch])

	const logout = useCallback(()=>{
		dispatch(logoutAction())
	},[dispatch])

	return { user, isAdmin, login, logout }
}