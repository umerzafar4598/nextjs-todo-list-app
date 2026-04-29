"use client";

// components/todos/TodoList.tsx

import { useAppSelector } from "@/store/hooks";
import {
    selectFilteredTodos,
    selectIsLoading,
    selectSearchQuery,
    selectStatusFilter,
} from "@/store/selectors/todoSelectors";
import { useTodos } from "@/hooks/useTodos";
import { TodoCard } from "./TodoCard";

export function TodoList() {
    const isLoading = useAppSelector(selectIsLoading);
    const searchQuery = useAppSelector(selectSearchQuery);
    const statusFilter = useAppSelector(selectStatusFilter);
    const filteredFromStore = useAppSelector(selectFilteredTodos);

    // useTodos exposes the optimistic list — we need to apply the same
    // filter/search on top of the optimistic todos (which may differ from store)
    const { todos: optimisticTodos } = useTodos();

    // Apply filter + search on the optimistic list (mirrors the selector logic)
    const visibleTodos = optimisticTodos.filter((todo) => {
        // Status
        const getStatus = (t: typeof todo) => {
            if (t.completed) return "completed";
            if (new Date(t.deadline) < new Date()) return "overdue";
            return "pending";
        };
        if (statusFilter !== "all" && getStatus(todo) !== statusFilter) {
            return false;
        }
        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return (
                todo.title.toLowerCase().includes(q) ||
                todo.description?.toLowerCase().includes(q)
            );
        }
        return true;
    });

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-20 animate-pulse rounded-xl border border-zinc-800 bg-zinc-800/40"
                    />
                ))}
            </div>
        );
    }

    if (visibleTodos.length === 0) {
        const isEmpty = optimisticTodos.length === 0;
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/50 bg-zinc-800/10 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
                    <svg
                        className="h-7 w-7 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        {isEmpty ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        )}
                    </svg>
                </div>
                <p className="text-sm font-medium text-zinc-400">
                    {isEmpty
                        ? "No tasks yet"
                        : `No ${statusFilter === "all" ? "" : statusFilter + " "}tasks found`}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                    {isEmpty
                        ? "Create your first task to get started"
                        : "Try adjusting your search or filter"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2.5">
            {visibleTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
            ))}
        </div>
    );
}