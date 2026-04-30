// store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import type { Todo } from "@/types/todos";

// makeStore accepts optional preloaded todos so the store is born with data —
// no useEffect hydration needed, no first-render timing gap.
export function makeStore(preloadedTodos: Todo[] = []) {
    return configureStore({
        reducer: {
            todos: todoReducer,
        },
        preloadedState: {
            todos: {
                items: preloadedTodos,
                searchQuery: "",
                statusFilter: "all" as const,
                isLoading: false,
                error: null,
            },
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActionPaths: [
                        "payload.deadline",
                        "payload.createdAt",
                        "payload.updatedAt",
                        "payload.todo.deadline",
                        "payload.todo.createdAt",
                        "payload.todo.updatedAt",
                    ],
                    ignoredPaths: ["todos.items"],
                },
            }),
    });
}

// Derive types from the factory so they stay in sync
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];