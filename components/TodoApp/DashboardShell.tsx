"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectTodoCounts } from "@/store/selectors/todoSelectors";
import { ReduxProvider } from "@/components/ReduxProvider";
import { DashboardNavbar } from "./DashboardNavbar";
import { TodoFilters } from "./TodoFilters";
import { TodoList } from "./TodoList";
import { CreateTodoModal } from "./CreateTodoModal";
import type { Todo } from "@/types/todos";

interface Props {
    initialTodos: Todo[];
    userName?: string;
    userEmail?: string;
    userImage?: string | null;
}

const STAT_CARDS = [
    {
        key: "all" as const,
        label: "Total",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
        color: "text-white/60",
        bg: "bg-white/5",
        ring: "ring-white/8"

    },
    {
        key: "pending" as const,
        label: "Pending",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        ring: "ring-amber-500/15"

    },
    {
        key: "completed" as const,
        label: "Done",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        ring: "ring-emerald-500/15"

    },
    {
        key: "overdue" as const,
        label: "Overdue",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        ring: "ring-rose-500/15"

    },
];


function DashboardContent({ userName, userEmail, userImage }: Omit<Props, "initialTodos">) {
    const counts = useAppSelector(selectTodoCounts);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#080810]">
            <Toaster
                theme="dark"
                position="bottom-right"
                gap={8}
                toastOptions={{
                    classNames: {
                        toast: "!bg-[#16161f] !border !border-white/10 !text-white/90 !shadow-2xl !rounded-2xl !font-medium",
                        title: "!text-white/90 !text-sm !font-semibold",
                        description: "!text-white/40 !text-xs",
                        success: "!border-emerald-500/25 [&>[data-icon]]:!text-emerald-400",
                        error: "!border-rose-500/25 [&>[data-icon]]:!text-rose-400",
                        icon: "!mr-3",
                    },
                }}
            />

            <DashboardNavbar
                userName={userName}
                userEmail={userEmail}
                userImage={userImage}
                onNewTask={() => setIsCreateOpen(true)}
            />

            <main className="relative mx-auto sm:mx-20 max-w-7xl px-4 py-8 sm:px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">Organize your tasks, set deadlines and stay productive.</h1>
                </motion.div>

                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {STAT_CARDS.map(({ key, label, icon, color, bg, ring }, i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex items-center gap-3 rounded-2xl p-4 ring-1 ${bg} ${ring}`}
                        >
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg} ring-1 ${ring}`}>
                                <svg className={`h-4 w-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                                </svg>
                            </div>
                            <div>
                                <motion.p
                                    key={counts[key]}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`text-xl font-bold leading-none ${color}`}
                                >
                                    {counts[key]}
                                </motion.p>
                                <p className="mt-0.5 text-xs text-white/30">{label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Filters + list */}
                <div className="mb-5">
                    <TodoFilters />
                </div>
                <TodoList />
            </main>

            <AnimatePresence>
                {isCreateOpen && <CreateTodoModal onClose={() => setIsCreateOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}

// Outer shell — owns the ReduxProvider so initialTodos seed the store
// synchronously before any child renders
export function DashboardShell({ initialTodos, userName, userEmail, userImage }: Props) {
    return (
        <ReduxProvider initialTodos={initialTodos}>
            <DashboardContent userName={userName} userEmail={userEmail} userImage={userImage} />
        </ReduxProvider>
    );
}