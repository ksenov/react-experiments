import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loadTasksOnce } from '../services/firebase'

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
    const items = await loadTasksOnce()
    return items
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {items: [], status: 'idle', error: null},
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
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchTasks.pending, (state) => { state.status = 'loading' })
        .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        })
        .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        })
    }
})

export const {taskAdded, taskToggled, taskDeleted, taskUpdated, tasksSet} = tasksSlice.actions
export default tasksSlice.reducer