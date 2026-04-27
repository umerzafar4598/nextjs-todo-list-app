"use client";

import { motion } from "motion/react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";


interface SignInFormProps {
    onToggle: () => void;
}


export default function SignInForm({ onToggle }: SignInFormProps) {

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

            <form action='' className="space-y-5">
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                        />
                    </div>
                    {/* {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>} */}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            id="password"
                            //   type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                        //   value={formData.password}
                        //   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            //   onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {/* {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                        </button>
                    </div>
                    {/* {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>} */}
                </div>

                <Button type="submit" className="w-full h-11">
                    {/* {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} */}
                    Sign In
                </Button>
            </form>

            <p className="text-center text-sm text-zinc-400 mt-6">
                Don&apos;t have an account?{" "}
                <button onClick={onToggle} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Sign up
                </button>
            </p>
        </motion.div>
    );
}
