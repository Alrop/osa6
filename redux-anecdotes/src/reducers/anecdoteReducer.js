import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"



// preAxios
// const anecdoteSlice = createSlice({
//   name: "anecdotes",
//   initialState,
//   reducers: {
//     addAnecdote(state, action) {
//       console.log("log from addAnecdote: ", current(state), action)
//       state.push(action.payload)
//     },
//     addVotes(state, action) {
//       console.log("log from addVote: ", action.payload)
//       const id = action.payload
//       const targetAnecdote = state.find(anecdote => anecdote.id === id)
//       const updateAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote)

//     }

//   }
// })

// postAxios
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      console.log("log from addVote: ", action.payload)
      const id = action.payload.id
      const votedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    },
    appendAnecdote(state, action) {
      // console.log("log from addAnecdote: ", current(state), action)
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
  }

})


export const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions


export const addVote = id => {
  console.log("check vote ", id)
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(newVote))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export default anecdoteSlice.reducer 