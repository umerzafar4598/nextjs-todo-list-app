"use client";

// components/todos/TodoCard.tsx

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { getTodoStatus } from "@/store/selectors/todoSelectors";
import type { Todo } from "@/types/todos";
import { EditTodoModal } from "./EditTodoModal";

interface Props {
    todo: Todo;
}

export function TodoCard({ todo }: Props) {
    const { toggleTodo, deleteTodo } = useTodos();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const status = getTodoStatus(todo);

    const statusStyles = {
        completed:
            "border-emerald-500/30 bg-emerald-950/20 shadow-emerald-900/10",
        overdue: "border-rose-500/30 bg-rose-950/20 shadow-rose-900/10",
        pending: "border-zinc-700/50 bg-zinc-900/40 shadow-black/10",
    };

    const badgeStyles = {
        completed: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25",
        overdue: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25",
        pending: "bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/25",
    };

    const formattedDeadline = new Date(todo.deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            <div
                className={`group relative flex items-start gap-4 rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${statusStyles[status]}`}
            >
                {/* Checkbox */}
                <button
                    onClick={() => toggleTodo(todo.id, !todo.completed)}
                    className="mt-0.5 flex-shrink-0 focus:outline-none"
                    aria-label={todo.completed ? "Mark as pending" : "Mark as complete"}
                >
                    <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${todo.completed
                            ? "border-emerald-500 bg-emerald-500"
                            : status === "overdue"
                                ? "border-rose-500 hover:border-rose-400"
                                : "border-zinc-600 hover:border-zinc-400"
                            }`}
                    >
                        {todo.completed && (
                            <svg
                                className="h-3 w-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        )}
                    </div>
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3
                            className={`font-medium leading-snug transition-colors ${todo.completed
                                ? "text-zinc-500 line-through"
                                : "text-zinc-100"
                                }`}
                        >
                            {todo.title}
                        </h3>

                        <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badgeStyles[status]}`}
                        >
                            {status}
                        </span>
                    </div>

                    {todo.description && (
                        <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                            {todo.description}
                        </p>
                    )}

                    <div className="mt-2 flex items-center gap-1.5">
                        <svg
                            className={`h-3.5 w-3.5 ${status === "overdue" ? "text-rose-400" : "text-zinc-500"
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span
                            className={`text-xs ${status === "overdue" ? "text-rose-400" : "text-zinc-500"
                                }`}
                        >
                            {status === "overdue" ? "Overdue · " : "Due · "}
                            {formattedDeadline}
                        </span>
                    </div>
                </div>

                {/* Actions (show on hover) */}
                <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-700/60 hover:text-zinc-200"
                        aria-label="Edit todo"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-rose-950/50 hover:text-rose-400"
                        aria-label="Delete todo"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isEditOpen && (
                <EditTodoModal todo={todo} onClose={() => setIsEditOpen(false)} />
            )}
        </>
    );
}