/** @format */

import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const newAnecdote = (e) => {
		e.preventDefault()
		const content = e.target.anecdoteInput.value

		if (content != '') {
			console.log('creating ', content)
			dispatch(addAnecdote(content))
			dispatch(setNotification(`Created new anecdote titled "${content}"`, 5))
			e.target.anecdoteInput.value = ''
		} else {
			dispatch(setNotification(`Please enter anecdote`, 5))
		}
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div>
					<input name='anecdoteInput' />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
