/** @format */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteFilter from './components/AnecdoteFilter.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: () =>
			axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
	})
	//   console.log(JSON.parse(JSON.stringify(result)))
	if (result.isLoading) {
		return <div>loading data...</div>
	}
	const anecdotes = result.data
	console.log(anecdotes)

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteFilter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
