"use client";

// components/todos/CreateTodoModal.tsx

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTodos } from "@/hooks/useTodos";
import type { CreateTodoInput } from "@/types/todos";

interface Props {
    onClose: () => void;
}

export function CreateTodoModal({ onClose }: Props) {
    const { createTodo, isPending } = useTodos();
    const backdropRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateTodoInput>({
        defaultValues: { deadline: "" },
    });

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    const onSubmit = (data: CreateTodoInput) => {
        createTodo(data);
        reset();
        onClose();
    };

    // Min datetime = now (for deadline input)
    const minDatetime = new Date().toISOString().slice(0, 16);

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === backdropRef.current && onClose()}
        >
            <div className="w-full max-w-md rounded-2xl border border-zinc-700/60 bg-zinc-900 p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-100">New Task</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                    >
                        <svg
                            className="h-5 w-5"
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
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                            Title <span className="text-rose-400">*</span>
                        </label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30"
                            placeholder="What needs to be done?"
                            autoFocus
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-rose-400">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                            Description{" "}
                            <span className="text-zinc-600 font-normal">(optional)</span>
                        </label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800/60 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30"
                            placeholder="Add more details..."
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                            Deadline <span className="text-rose-400">*</span>
                        </label>
                        <input
                            {...register("deadline", { required: "Deadline is required" })}
                            type="datetime-local"
                            min={minDatetime}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 [color-scheme:dark]"
                        />
                        {errors.deadline && (
                            <p className="mt-1 text-xs text-rose-400">{errors.deadline.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-zinc-700 bg-transparent py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Creating..." : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}