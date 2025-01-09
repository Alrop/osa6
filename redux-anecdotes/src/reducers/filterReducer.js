import { createSlice } from "@reduxjs/toolkit"



const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        handleFilter(state, action) { console.log("log from handleFilter: ", state, action); return action.payload }

    }
})




// const filterReducer = (state = initialState, action) => {

//     console.log('state now: ', action)
//     console.log('action', action)

//     switch (action.type) {
//         case "ADD_VOTE": {
//             const id = action.payload.id
//             const targetAnecdote = state.find(anecdote => anecdote.id === id)
//             const updateAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 }
//             return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote)
//         }
//         case "ADD_ANECDOTE": {
//             return [...state, action.payload]
//         }
//         default:
//             return state
//     }

// }

// export const filter = (value) => {
//     console.log('state now: ', action)
//     console.log('action', action)
//     // return {
//     //     type: "FILTER",
//     //     payload: { value }
//     // }
// }


export const { handleFilter } = filterSlice.actions
export default filterSlice.reducer