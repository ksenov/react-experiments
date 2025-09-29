import { createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {items: []},
    reducers: {
        taskAdded: (state, action) => {
            state.items.unshift(action.payload)
        },
        taskToggled: (state, action) => {
            const t = state.items.find(x => x.id === action.payload)
            if (t) t.completed = !t.completed
        },
        taskDeleted: (state, action) => {
            state.items = state.items.filter(x => x.id !== action.payload)
        },
        taskUpdated: (state, action) => {
            const {id, changes} = action.payload
            const t = state.items.find(x => x.id === id)
            if (t) Object.assign(t, changes)
        },
        tasksSet: (state, action) => {state.items = action.payload}
    }
})

export const {taskAdded, taskToggled, taskDeleted, taskUpdated, tasksSet} = tasksSlice.actions
export default tasksSlice.reducer