"use client";

// components/todos/TodoList.tsx

import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoading, selectAllTodos, selectFilteredTodos } from "@/store/selectors/todoSelectors";
import { TodoCard } from "./TodoCard";

export function TodoList() {
    const isLoading = useAppSelector(selectIsLoading);
    // Read from Redux store directly — correctly reflects setTodos on first hydration.
    // useTodos()/useOptimistic snapshots the store at render time and misses the
    // initial setTodos dispatch; individual TodoCards call useTodos() for mutations.
    const allTodos = useAppSelector(selectAllTodos);
    const visibleTodos = useAppSelector(selectFilteredTodos);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="h-40 animate-pulse rounded-2xl border border-white/5 bg-white/3"
                    />
                ))}
            </div>
        );
    }

    if (visibleTodos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 py-20 text-center"
            >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/4">
                    <svg className="h-7 w-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {allTodos.length === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        )}
                    </svg>
                </div>
                <p className="text-sm font-medium text-white/40">
                    {allTodos.length === 0 ? "No tasks yet" : "No matching tasks"}
                </p>
                <p className="mt-1 text-xs text-white/20">
                    {allTodos.length === 0
                        ? "Create your first task to get started"
                        : "Try adjusting your search or filter"}
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
            <AnimatePresence mode="popLayout">
                {visibleTodos.map((todo, index) => (
                    <TodoCard key={todo.id} todo={todo} index={index} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}