"use client";

// components/todos/TodoFilters.tsx

import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSearchQuery, selectStatusFilter, selectTodoCounts } from "@/store/selectors/todoSelectors";
import { setSearchQuery, setStatusFilter } from "@/store/slices/todoSlice";
import type { TodoStatus } from "@/types/todos";

const FILTERS: { value: TodoStatus; label: string; color: string }[] = [
    { value: "all", label: "All", color: "text-white/70" },
    { value: "pending", label: "Pending", color: "text-amber-400" },
    { value: "completed", label: "Done", color: "text-emerald-400" },
    { value: "overdue", label: "Overdue", color: "text-rose-400" },
];

const COUNT_COLORS: Record<TodoStatus, string> = {
    all: "bg-white/10 text-white/50",
    pending: "bg-amber-500/15 text-amber-400",
    completed: "bg-emerald-500/15 text-emerald-400",
    overdue: "bg-rose-500/15 text-rose-400",
};

export function TodoFilters() {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(selectSearchQuery);
    const statusFilter = useAppSelector(selectStatusFilter);
    const counts = useAppSelector(selectTodoCounts);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
            {/* Search */}
            <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                    <svg className="h-4 w-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search tasks..."
                    className="w-full rounded-xl border border-white/8 bg-white/4 py-2.5 pl-10 pr-10 text-sm text-white/80 placeholder-white/20 outline-none transition-all focus:border-violet-500/50 focus:bg-white/6 focus:ring-1 focus:ring-violet-500/20"
                />
                {searchQuery && (
                    <button
                        onClick={() => dispatch(setSearchQuery(""))}
                        className="absolute inset-y-0 right-3 flex items-center text-white/25 hover:text-white/60 transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Filter tabs */}
            <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/8 bg-white/3 p-1 flex-wrap">
                {FILTERS.map(({ value, label, color }) => (
                    <button
                        key={value}
                        onClick={() => dispatch(setStatusFilter(value))}
                        className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${statusFilter === value ? color : "text-white/30 hover:text-white/50"
                            }`}
                    >
                        {statusFilter === value && (
                            <motion.div
                                layoutId="filter-pill"
                                className="absolute inset-0 rounded-lg bg-white/8"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                            />
                        )}
                        <span className="relative">{label}</span>
                        <span className={`relative rounded-full px-1.5 py-0.5 text-[10px] font-bold ${COUNT_COLORS[value]}`}>
                            {counts[value]}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}