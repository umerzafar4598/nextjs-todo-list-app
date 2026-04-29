import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;