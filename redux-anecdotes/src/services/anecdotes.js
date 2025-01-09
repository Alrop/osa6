import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = async (content) => {

  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const toUpdate = response.data
  console.log(toUpdate)
  const updatedAnecdote = { ...toUpdate, votes: toUpdate.votes + 1 }
  console.log(updatedAnecdote)
  const request = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return request.data
}

export default { getAll, createAnecdote, updateVote, }