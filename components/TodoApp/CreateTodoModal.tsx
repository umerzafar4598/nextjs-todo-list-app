"use client";

// components/todos/CreateTodoModal.tsx

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useTodos } from "@/hooks/useTodos";
import type { CreateTodoInput } from "@/types/todos";

interface Props {
    onClose: () => void;
}

export function CreateTodoModal({ onClose }: Props) {
    const { createTodo, isPending } = useTodos();
    const backdropRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTodoInput>({
        defaultValues: { deadline: "" },
    });

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    const onSubmit = (data: CreateTodoInput) => {
        createTodo(data);
        reset();
        onClose();
    };

    const minDatetime = new Date().toISOString().slice(0, 16);

    return (
        <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={(e) => e.target === backdropRef.current && onClose()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#13131c] shadow-2xl shadow-black/80"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20">
                            <svg className="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-semibold text-white/90">New Task</h2>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-white/50">
                            Title <span className="text-rose-400">*</span>
                        </label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            autoFocus
                            placeholder="What needs to be done?"
                            className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                        />
                        {errors.title && <p className="mt-1 text-xs text-rose-400">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-white/50">
                            Description <span className="text-white/25 font-normal">(optional)</span>
                        </label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            placeholder="Add more details..."
                            className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-white/50">
                            Deadline <span className="text-rose-400">*</span>
                        </label>
                        <input
                            {...register("deadline", { required: "Deadline is required" })}
                            type="datetime-local"
                            min={minDatetime}
                            className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white/70 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 [color-scheme:dark]"
                        />
                        {errors.deadline && <p className="mt-1 text-xs text-rose-400">{errors.deadline.message}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-white/8 bg-transparent py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/70"
                        >
                            Cancel
                        </button>
                        <motion.button
                            type="submit"
                            disabled={isPending}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-colors hover:bg-violet-500 disabled:opacity-50"
                        >
                            {isPending ? "Creating..." : "Create Task"}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}