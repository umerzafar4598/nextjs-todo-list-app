"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, EyeOff, Eye, } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { AuthActionState } from "@/types/auth-state";
import { signUpAction } from "@/actions/authAction";
import { toast } from 'sonner'
import { useRouter } from "next/navigation";


interface SignUpFormProps {
    onToggle: () => void;
}

const initialState: AuthActionState = {
    success: false,
    message: "",
    errors: {},
}

export default function SignUpForm({ onToggle }: SignUpFormProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState(signUpAction, initialState)

    useEffect(() => {
        if (!state.message) return
        if (state.success) {
            toast.success("Account Created.", { description: state.message, position: "bottom-center" })
            router.push("/dashboard")
        } else {
            toast.error("Sign Up Failed!", {
                description: state.message,
                position: "bottom-center"
            })
        }
    }, [state, router])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
                <p className="text-zinc-400 text-sm">Start managing your tasks today</p>
            </div>

            <form action={formAction} className="space-y-5">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="name"
                            placeholder="Aegon The Conqueror ?"
                            className="pl-10"
                            name="name"
                            defaultValue={state.values?.name || ""}
                        />
                    </div>
                    {state.errors?.name && (
                        <p>{state.errors.name[0]}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="signup-email"
                            name="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            defaultValue={state.values?.email || ""}
                        />
                    </div>
                    {state.errors?.email && (
                        <p id="email-error" className="text-red-500 text-sm">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 chars with uppercase & number"
                            className="pl-10 pr-10"
                            defaultValue={state.values?.password || ""}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {state.errors?.password && (
                        <p id="password-error" className="text-red-500 text-sm">
                            {state.errors.password[0]}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full h-11" disabled={pending} >
                    {pending ? "Creating..." : "Create Account"}
                </Button>
            </form>

            <p className="text-center text-sm text-zinc-400 mt-6">
                Already have an account?{" "}
                <button onClick={onToggle} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Sign in
                </button>
            </p>
        </motion.div>
    );
}
