import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    // doc says reducers should function as single-line switch cases?
    reducers: {
        handleNotification(state, action) { return (action.payload) },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action) { return ("") },
    }
})

export const setNotification = (text, timer) => {
    console.log("notification for ", text)

    return dispatch => {
        dispatch(handleNotification(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timer * 1000)
    }



}


export const { handleNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer