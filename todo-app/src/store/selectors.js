import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = state => state.tasks.items
export const makeSelectVisibleTasks = (filter, search = '', sortBy = 'date') => 
    createSelector([selectTasks], (items) => {
        const q = search.trim().toLowerCase()
        let filtered = items.filter(t => {
            const byFilter = filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true
            const byText = q ? t.text.toLowerCase().includes(q) : true
            return byFilter && byText
        })
        if (sortBy === 'status') {
            filtered = [...filtered].sort((a,b) => Number(a.completed) - Number(b.completed))
        } else {
            filtered = [...filtered].sort((a,b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        }
        return filtered
    })
    
export const selectActiveCount = createSelector([selectTasks], items => items.filter(t => !t.completed).length)