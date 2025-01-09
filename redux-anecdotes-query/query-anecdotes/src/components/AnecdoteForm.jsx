/** @format */
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdotes } from '../../requests'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const dispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdotes,
		onSuccess: (newAnexdote) => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
			dispatch({
				type: 'setNotification',
				payload: `Anecdote "${newAnexdote.content}" was added to the database`,
			})
			setTimeout(() => {
				dispatch({ type: 'clearNotification' })
			}, 5000)
		},
		onError: (error) => {
			dispatch({
				type: 'setNotification',
				payload: error.response.data.error,
			})
			setTimeout(() => {
				dispatch({ type: 'clearNotification' })
			}, 5000)
		},
	})

	const getId = () => (100000 * Math.random()).toFixed(0)

	const onCreate = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
		event.target.anecdote.value = ''
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
