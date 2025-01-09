/** @format */

import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
	console.log(action)
	switch (action.type) {
		case 'setNotification':
			console.log('got to setNotification')
			console.log('state: ', state, 'action: ', action)
			return action.payload
		case 'clearNotification':
			console.log('got to clear notif')
			console.log('state: ', state, 'action: ', action)
			return ''

		default:
			return state
	}
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	console.log(notificationAndDispatch)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		''
	)
	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{
				// eslint-disable-next-line react/prop-types
				props.children
			}
		</NotificationContext.Provider>
	)
}

export default NotificationContextProvider
