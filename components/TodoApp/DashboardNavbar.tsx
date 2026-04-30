"use client";

// components/todos/DashboardNavbar.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    userName?: string;
    userEmail?: string;
    userImage?: string | null;
    onNewTask: () => void;
}

export function DashboardNavbar({ userName, userEmail, userImage, onNewTask }: Props) {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);

    const initials = userName
        ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : userEmail?.[0]?.toUpperCase() ?? "?";

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authClient.signOut();
            toast.success("Signed out successfully");
            router.push("/login");
        } catch {
            toast.error("Failed to sign out");
            setIsLoggingOut(false);
        }
    };

    return (
        <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-40 border-b border-white/5 bg-transparent backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/40"
                    >
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </motion.div>
                    <span className="font-semibold tracking-tight text-white/90">
                        Taska
                    </span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* New task button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onNewTask}
                        className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-900/30 transition-colors hover:bg-violet-500"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">New Task</span>
                    </motion.button>

                    {/* Avatar dropdown */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAvatarOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 transition-colors hover:bg-white/10"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-indigo-500 text-[10px] font-bold text-white">
                                {userImage ? (
                                    <img src={userImage} alt={userName} className="h-6 w-6 rounded-full object-cover" />
                                ) : initials}
                            </div>
                            <span className="hidden text-xs font-medium text-white/70 sm:block">
                                {userName ?? userEmail}
                            </span>
                            <svg className="h-3 w-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>

                        <AnimatePresence>
                            {avatarOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div className="fixed inset-0 z-10" onClick={() => setAvatarOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#13131a] shadow-2xl shadow-black/60"
                                    >
                                        {/* User info */}
                                        <div className="border-b border-white/5 px-4 py-3">
                                            <p className="text-sm font-medium text-white/90 truncate">{userName}</p>
                                            <p className="text-xs text-white/40 truncate">{userEmail}</p>
                                        </div>
                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-rose-400 transition-colors hover:bg-rose-500/10 disabled:opacity-50"
                                        >
                                            {isLoggingOut ? (
                                                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            )}
                                            {isLoggingOut ? "Signing out..." : "Sign out"}
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}