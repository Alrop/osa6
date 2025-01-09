/** @format */
import { useDispatch } from 'react-redux'
import { handleFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
	const dispatch = useDispatch()

	const handleChange = (e) => {
		e.preventDefault()
		dispatch(handleFilter(e.target.value))
	}
	const style = {
		marginBottom: 10,
	}
	return (
		<div style={style}>
			{}
			Filter: {<input name='filterInput' onChange={handleChange} />}
			{}
		</div>
	)
}

export default AnecdoteFilter
