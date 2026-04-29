"use client";

import { useOptimistic, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllTodos } from "@/store/selectors/todoSelectors";
import {
    addTodoOptimistic,
    confirmAddTodo,
    revertAddTodo,
    updateTodoOptimistic,
    revertTodo,
    toggleTodoOptimistic,
    removeTodoOptimistic,
    revertRemoveTodo,
    setError,
} from "@/store/slices/todoSlice";
import {
    createTodoAction,
    updateTodoAction,
    toggleTodoAction,
    deleteTodoAction,
} from "@/actions/todosAction";
import type { CreateTodoInput, UpdateTodoInput, Todo } from "@/types/todos";

export function useTodos() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectAllTodos);
    const [isPending, startTransition] = useTransition();

    // useOptimistic gives us an instant, transition-aware overlay list.
    // Redux is the durable client state; useOptimistic handles the
    // in-flight visual feedback layer on top.
    const [optimisticTodos, addOptimisticUpdate] = useOptimistic(
        todos,
        (
            current: Todo[],
            action:
                | { type: "add"; todo: Todo }
                | { type: "toggle"; id: string; completed: boolean }
                | { type: "update"; todo: Partial<Todo> & { id: string } }
                | { type: "remove"; id: string }
        ) => {
            switch (action.type) {
                case "add":
                    return [action.todo, ...current];
                case "toggle":
                    return current.map((t) =>
                        t.id === action.id ? { ...t, completed: action.completed } : t
                    );
                case "update":
                    return current.map((t) =>
                        t.id === action.todo.id ? { ...t, ...action.todo } : t
                    );
                case "remove":
                    return current.filter((t) => t.id !== action.id);
            }
        }
    );

    // ── CREATE ────────────────────────────────────────────────────────────────
    const createTodo = (input: CreateTodoInput) => {
        const tempId = `temp-${Date.now()}`;
        const tempTodo: Todo = {
            id: tempId,
            title: input.title,
            description: input.description || null,
            deadline: input.deadline, // always a string — required in schema
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: "optimistic",
        };

        startTransition(async () => {
            // 1. Optimistic: UI layer (useOptimistic) + Redux
            addOptimisticUpdate({ type: "add", todo: tempTodo });
            dispatch(addTodoOptimistic(tempTodo));

            // 2. Hit the server
            const result = await createTodoAction(input);

            // 3. Reconcile
            if (result.success) {
                dispatch(confirmAddTodo({ tempId, todo: result.data }));
            } else {
                dispatch(revertAddTodo(tempId));
                dispatch(setError(result.error));
            }
        });
    };

    // ── UPDATE ────────────────────────────────────────────────────────────────
    const updateTodo = (input: UpdateTodoInput) => {
        const previous = todos.find((t) => t.id === input.id);
        if (!previous) return;

        startTransition(async () => {
            addOptimisticUpdate({ type: "update", todo: input });
            dispatch(updateTodoOptimistic(input));

            const result = await updateTodoAction(input);

            if (result.success) {
                dispatch(updateTodoOptimistic(result.data));
            } else {
                dispatch(revertTodo(previous));
                dispatch(setError(result.error));
            }
        });
    };

    // ── TOGGLE ────────────────────────────────────────────────────────────────
    const toggleTodo = (id: string, completed: boolean) => {
        const previous = todos.find((t) => t.id === id);
        if (!previous) return;

        startTransition(async () => {
            addOptimisticUpdate({ type: "toggle", id, completed });
            dispatch(toggleTodoOptimistic({ id, completed }));

            const result = await toggleTodoAction(id, completed);

            if (result.success) {
                dispatch(toggleTodoOptimistic({ id, completed: result.data.completed }));
            } else {
                dispatch(revertTodo(previous));
                dispatch(setError(result.error));
            }
        });
    };

    // ── DELETE ────────────────────────────────────────────────────────────────
    const deleteTodo = (id: string) => {
        const previous = todos.find((t) => t.id === id);
        if (!previous) return;

        startTransition(async () => {
            addOptimisticUpdate({ type: "remove", id });
            dispatch(removeTodoOptimistic(id));

            const result = await deleteTodoAction(id);

            if (!result.success) {
                dispatch(revertRemoveTodo(previous));
                dispatch(setError(result.error));
            }
        });
    };

    return {
        todos: optimisticTodos,   // always use this in UI (has optimistic layer)
        isPending,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
    };
}