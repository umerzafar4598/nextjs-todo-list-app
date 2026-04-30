"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthActionState } from "@/types/auth-state";
import { signInAction } from "@/actions/authAction";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { authClient } from "@/lib/auth-client";


interface SignInFormProps {
    onToggle: () => void;
}

const initialState: AuthActionState = {
    success: false,
    message: '',
    errors: {},
}


export default function SignInForm({ onToggle }: SignInFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState(signInAction, initialState)

    const handleGitHubSignIn = async () => {
        setLoading(true);

        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
            });
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };



    useEffect(() => {
        if (state.success) {
            toast.success("Login Successfull", { description: state.message, position: "bottom-center" })
            router.push("/dashboard")
        }
        if (!state.success && state.message) {
            toast.error("Login Failed!.Try again", { description: state.message, position: "bottom-center" })
        }
    }, [state, router])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                <p className="text-zinc-400 text-sm">Sign in to your account to continue</p>
            </div>

            <form action={formAction} className="space-y-5 mb-2">
                <div className="space-y-1.5">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="signin-email"
                            name="signin-email"
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
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            name="password"
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

                <Button type="submit" className="w-full h-11" disabled={pending}>
                    {pending ? "Signing in..." : "Sign In"}
                </Button>
            </form>
            <Separator />
            <Button
                variant='outline'
                className="w-full h-11 mt-2"
                onClick={handleGitHubSignIn}
                disabled={loading}
            >
                {loading ? "Redirecting..." : "Sign in with Github"}
            </Button>

            <p className="text-center text-sm text-zinc-400 mt-6">
                Don&apos;t have an account?{" "}
                <button onClick={onToggle} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Sign up
                </button>
            </p>
        </motion.div>
    );
}
