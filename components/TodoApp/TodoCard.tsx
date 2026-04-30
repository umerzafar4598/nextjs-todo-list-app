"use client";

// components/todos/TodoCard.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTodos } from "@/hooks/useTodos";
import { getTodoStatus } from "@/store/selectors/todoSelectors";
import type { Todo } from "@/types/todos";
import { EditTodoModal } from "./EditTodoModal";

interface Props {
    todo: Todo;
    index: number;
}

const STATUS_CONFIG = {
    completed: {
        badge: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20",
        border: "border-emerald-500/20",
        dot: "bg-emerald-400",
        accent: "from-emerald-500/50 to-transparent",
        label: "Completed",
    },
    overdue: {
        badge: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/20",
        border: "border-rose-500/25",
        dot: "bg-rose-400",
        accent: "from-rose-500/50 to-transparent",
        label: "Overdue",
    },
    pending: {
        badge: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20",
        border: "border-white/8",
        dot: "bg-amber-400",
        accent: "from-violet-500/40 to-transparent",
        label: "Pending",
    },
};

export function TodoCard({ todo, index }: Props) {
    const { toggleTodo, deleteTodo } = useTodos();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const status = getTodoStatus(todo);
    const cfg = STATUS_CONFIG[status];

    const deadline = new Date(todo.deadline);
    const isToday = deadline.toDateString() === new Date().toDateString();
    const formattedDeadline = deadline.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: deadline.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    });
    const formattedTime = deadline.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ duration: 0.35, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#0f0f18] shadow-xl ${cfg.border}`}
            >
                {/* Accent line */}
                <div className={`h-0.5 w-full bg-linear-to-r ${cfg.accent}`} />

                <div className="flex flex-1 flex-col gap-3 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() => toggleTodo(todo.id, !todo.completed)}
                                className="mt-0.5 shrink-0"
                                aria-label={todo.completed ? "Mark pending" : "Mark complete"}
                            >
                                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${todo.completed
                                    ? "border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/40"
                                    : status === "overdue"
                                        ? "border-rose-500/50 hover:border-rose-400"
                                        : "border-white/20 hover:border-violet-400"
                                    }`}>
                                    <AnimatePresence mode="wait">
                                        {todo.completed && (
                                            <motion.svg
                                                key="check"
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2, ease: "backOut" }}
                                                className="h-2.5 w-2.5 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>

                            <h3 className={`min-w-0 wrap-break-words text-sm font-semibold leading-snug transition-all duration-300 ${todo.completed ? "text-white/25 line-through" : "text-white/90"
                                }`}>
                                {todo.title}
                            </h3>
                        </div>

                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}>
                            {cfg.label}
                        </span>
                    </div>

                    {/* Description */}
                    {todo.description && (
                        <p className={`text-xs leading-relaxed line-clamp-2 ${todo.completed ? "text-white/20" : "text-white/40"}`}>
                            {todo.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-1">
                        <div className={`flex items-center gap-1.5 text-[11px] ${status === "overdue" ? "text-rose-400" : isToday ? "text-amber-400" : "text-white/30"
                            }`}>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{isToday ? `Today · ${formattedTime}` : formattedDeadline}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                            <motion.button
                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                onClick={() => setIsEditOpen(true)}
                                className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                onClick={() => deleteTodo(todo.id)}
                                className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-rose-500/15 hover:text-rose-400"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isEditOpen && <EditTodoModal todo={todo} onClose={() => setIsEditOpen(false)} />}
            </AnimatePresence>
        </>
    );
}