"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    selectSearchQuery,
    selectStatusFilter,
    selectTodoCounts,
} from "@/store/selectors/todoSelectors";
import { setSearchQuery, setStatusFilter } from "@/store/slices/todoSlice";
import type { TodoStatus } from "@/types/todos";

const FILTERS: { value: TodoStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" },
];

const countColors: Record<TodoStatus, string> = {
    all: "bg-zinc-700 text-zinc-300",
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
        <div className="space-y-3">
            {/* Search */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                    <svg
                        className="h-4 w-4 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search tasks..."
                    className="w-full rounded-xl border border-zinc-700/70 bg-zinc-800/50 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20"
                />
                {searchQuery && (
                    <button
                        onClick={() => dispatch(setSearchQuery(""))}
                        className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-zinc-300"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-1">
                {FILTERS.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => dispatch(setStatusFilter(value))}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${statusFilter === value
                            ? "bg-zinc-700 text-zinc-100 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        {label}
                        <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${countColors[value]}`}
                        >
                            {counts[value]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}