
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodoStatus } from "@/types/todos";

interface TodoState {
    items: Todo[];
    searchQuery: string;
    statusFilter: TodoStatus;
    isLoading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    items: [],
    searchQuery: "",
    statusFilter: "all",
    isLoading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.items = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        addTodoOptimistic(state, action: PayloadAction<Todo>) {
            state.items.unshift(action.payload);
        },

        updateTodoOptimistic(
            state,
            action: PayloadAction<Partial<Todo> & { id: string }>
        ) {
            const idx = state.items.findIndex((t) => t.id === action.payload.id);
            if (idx !== -1) {
                state.items[idx] = { ...state.items[idx], ...action.payload };
            }
        },

        toggleTodoOptimistic(
            state,
            action: PayloadAction<{ id: string; completed: boolean }>
        ) {
            const todo = state.items.find((t) => t.id === action.payload.id);
            if (todo) todo.completed = action.payload.completed;
        },

        removeTodoOptimistic(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },

        confirmAddTodo(
            state,
            action: PayloadAction<{ tempId: string; todo: Todo }>
        ) {
            const idx = state.items.findIndex(
                (t) => t.id === action.payload.tempId
            );
            if (idx !== -1) state.items[idx] = action.payload.todo;
        },

        revertAddTodo(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },

        revertTodo(state, action: PayloadAction<Todo>) {
            const idx = state.items.findIndex((t) => t.id === action.payload.id);
            if (idx !== -1) state.items[idx] = action.payload;
        },

        revertRemoveTodo(state, action: PayloadAction<Todo>) {
            const exists = state.items.find((t) => t.id === action.payload.id);
            if (!exists) state.items.unshift(action.payload);
        },

        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setStatusFilter(state, action: PayloadAction<TodoStatus>) {
            state.statusFilter = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    setTodos,
    addTodoOptimistic,
    updateTodoOptimistic,
    toggleTodoOptimistic,
    removeTodoOptimistic,
    confirmAddTodo,
    revertAddTodo,
    revertTodo,
    revertRemoveTodo,
    setSearchQuery,
    setStatusFilter,
    setLoading,
    setError,
} = todoSlice.actions;

export default todoSlice.reducer;