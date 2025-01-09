/** @format */

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, createAnecdotes, updatedAnecdotes } from '../requests'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
	const queryClient = useQueryClient()
	const dispatch = useNotificationDispatch()

	const updateVoteMutation = useMutation({
		mutationFn: updatedAnecdotes,
		onSuccess: (toUpdate) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			const updated = anecdotes.map((anecdote) =>
				anecdote.id !== toUpdate.id ? anecdote : toUpdate
			)
			queryClient.setQueryData(['anecdotes'], updated)
			dispatch({
				type: 'setNotification',
				payload: `Succesfully voted for "${toUpdate.content}"`,
			})
			setTimeout(() => {
				dispatch({ type: 'clearNotification' })
			}, 5000)
		},
	})

	const handleVote = (anecdote) => {
		console.log('voted for ', anecdote)
		updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
	}

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdotes,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes']), anecdotes.concat(newAnecdote)
		},
	})

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: false,
	})

	switch (result.status) {
		case 'pending':
			return <div>loading data...</div>
		case 'error':
			return <div>There was an error with contacting server</div>
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
