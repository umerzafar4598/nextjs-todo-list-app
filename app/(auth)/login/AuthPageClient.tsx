"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SignInForm from "@/components/auth/signIn-form";
import SignUpForm from "@/components/auth/signUp-form";
import { CheckSquare, Zap, Shield, Users } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        desc: "Real-time updates with optimistic UI",
    },
    {
        icon: Shield,
        title: "Secure Auth",
        desc: "Email & password with Better Auth",
    },
    {
        icon: Users,
        title: "Multi-User",
        desc: "Each user manages their own tasks",
    },
];

export default function AuthPageClient() {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="min-h-screen flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-zinc-900 border-r border-zinc-800 overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="flex items-center gap-3 relative z-10">
                    <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/30">
                        <CheckSquare className="h-5 w-5 text-violet-400" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        Tasko
                    </span>
                </div>

                <div className="relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Manage tasks{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">
                                beautifully
                            </span>
                        </h1>
                        <p className="text-zinc-400 mt-3 text-lg leading-relaxed">
                            A powerful, multi-user task manager with smart filtering, deadlines, and real-time stats.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                                className="flex items-center gap-3"
                            >
                                <div className="p-2 rounded-lg bg-violet-600/10 border border-violet-500/20 shrink-0">
                                    <f.icon className="h-4 w-4 text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{f.title}</p>
                                    <p className="text-xs text-zinc-500">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative z-10 text-xs text-zinc-300"
                >
                    Built with Next.js · Drizzle · Better Auth · Redux Toolkit
                </motion.p>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-sm">

                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="p-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30">
                            <CheckSquare className="h-4 w-4 text-violet-400" />
                        </div>
                        <span className="font-bold text-white">TaskFlow</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {isSignIn ? (
                            <motion.div key="signin" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                <SignInForm onToggle={() => setIsSignIn(false)} />
                            </motion.div>
                        ) : (
                            <motion.div key="signup" exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                                <SignUpForm onToggle={() => setIsSignIn(true)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
