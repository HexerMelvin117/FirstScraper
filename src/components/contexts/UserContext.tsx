import React, { createContext, useReducer } from 'react';

interface User {
	id: string,
	email: string,
	token: string
	isAuthenticated: boolean
}

interface Action {
	type: string,
	payload: any
}

let initialState: User = {
	id: "",
	email: "",
	token: "",
	isAuthenticated: false
}

export const Store = createContext<User | any>(initialState)
const reducer = (state: User, action: Action): User => {
	switch (action.type) {
		case 'LOG_IN':
			return {...state, id: action.payload.user.user_id, email: action.payload.user.user_email, 
							token: action.payload.token, isAuthenticated: true}
		case 'LOG_OUT':
			return {...state, id: "", email: "", token: "", isAuthenticated: false}
		default:
			return state
	}
}

const UserProvider = (props: any): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<Store.Provider value={{state, dispatch}}>
			{props.children}
		</Store.Provider>
	)
}

export default UserProvider

