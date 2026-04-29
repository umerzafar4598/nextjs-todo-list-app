
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Todo } from "@/types/todos";

const selectTodoState = (state: RootState) => state.todos;

export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectSearchQuery = (state: RootState) => state.todos.searchQuery;
export const selectStatusFilter = (state: RootState) =>
    state.todos.statusFilter;
export const selectIsLoading = (state: RootState) => state.todos.isLoading;
export const selectError = (state: RootState) => state.todos.error;


export function getTodoStatus(todo: Todo): "completed" | "overdue" | "pending" {
    if (todo.completed) return "completed";
    if (new Date(todo.deadline) < new Date()) return "overdue";
    return "pending";
}


export const selectFilteredTodos = createSelector(
    selectAllTodos,
    selectSearchQuery,
    selectStatusFilter,
    (todos, query, filter) => {
        let result = todos;

        // Text search
        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    t.description?.toLowerCase().includes(q)
            );
        }

        // Status filter
        if (filter !== "all") {
            result = result.filter((t) => getTodoStatus(t) === filter);
        }

        return result;
    }
);


export const selectTodoCounts = createSelector(selectAllTodos, (todos) => {
    const counts = { all: todos.length, completed: 0, pending: 0, overdue: 0 };
    todos.forEach((t) => {
        const status = getTodoStatus(t);
        counts[status]++;
    });
    return counts;
});