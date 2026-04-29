"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTodos, setError } from "@/store/slices/todoSlice";
import { TodoFilters } from "./TodoFilters";
import { TodoList } from "./TodoList";
import { CreateTodoModal } from "./CreateTodoModal";
import type { Todo } from "@/types/todos";

interface Props {
    initialTodos: Todo[];
    userName?: string;
}

export function DashboardShell({ initialTodos, userName }: Props) {
    const dispatch = useAppDispatch();
    const [isCreateOpen, setIsCreateOpen] = useState(false);


    useEffect(() => {
        dispatch(setTodos(initialTodos));
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
                    <div>
                        <h1 className="text-base font-semibold text-zinc-100">
                            My Tasks
                        </h1>
                        {userName && (
                            <p className="text-xs text-zinc-500">Welcome, {userName}</p>
                        )}
                    </div>

                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition-all hover:bg-indigo-500 active:scale-95"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        New Task
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-2xl px-4 py-6 space-y-5">
                <TodoFilters />
                <TodoList />
            </main>

            {/* Global error toast — simple inline version */}
            <ErrorToast />

            {isCreateOpen && (
                <CreateTodoModal onClose={() => setIsCreateOpen(false)} />
            )}
        </div>
    );
}

// ── Inline error toast ────────────────────────────────────────────────────────
function ErrorToast() {
    const dispatch = useAppDispatch();
    const error = useAppSelector((s) => s.todos.error);

    useEffect(() => {
        if (!error) return;
        const t = setTimeout(() => dispatch(setError(null)), 4000);
        return () => clearTimeout(t);
    }, [error, dispatch]);

    if (!error) return null;

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-rose-500/30 bg-rose-950/80 px-4 py-3 text-sm text-rose-300 shadow-xl backdrop-blur-md">
            {error}
        </div>
    );
}

// Need to import useAppSelector here too
import { useAppSelector } from "@/store/hooks";