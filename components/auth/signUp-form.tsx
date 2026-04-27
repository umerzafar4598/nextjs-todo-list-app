"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, EyeOff, Eye, } from "lucide-react";
import { useActionState, useState } from "react";



interface SignUpFormProps {
    onToggle: () => void;
}



export default function SignUpForm({ onToggle }: SignUpFormProps) {
    const [showPassword, setShowPassword] = useState(false);

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

            <form action='' className="space-y-5">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="name"
                            placeholder="Aegon The Conqueror ?"
                            className="pl-10"
                        />
                    </div>
                    {/* {state.errors?.fieldErrors?.name?.errors?.[0] && <p className="text-red-400 text-xs mt-1">{state.errors.fieldErrors.name.errors[0]}</p>} */}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                        />
                    </div>
                    {/* {state.errors?.fieldErrors?.email?.errors?.[0] && (
                        <p>{state.errors.fieldErrors.email.errors[0]}</p>
                    )} */}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 chars with uppercase & number"
                            className="pl-10 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {/* {state.errors?.fieldErrors?.password?.errors?.[0] && (
                        <p>{state.errors.fieldErrors.password.errors[0]}</p>
                    )} */}
                </div>
                <Button type="submit" className="w-full h-11"  >
                    Create Account
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
