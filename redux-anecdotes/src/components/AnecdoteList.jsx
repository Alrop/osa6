/** @format */

import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		return state.anecdotes

			.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(state.filters.toLowerCase())
			)
			.sort((a, b) => b.votes - a.votes)
	})

	const dispatch = useDispatch()

	const vote = (id, content) => {
		console.log('vote', id, content)
		dispatch(addVote(id))
		dispatch(setNotification(`Voted for "${content}"`, 5))
	}
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						Votes: {anecdote.votes}{' '}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>
							Add vote
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
