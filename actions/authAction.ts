'use server'

import { auth } from '@/lib/auth'
import { AuthActionState } from '@/types/auth-state'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

function getString(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
}

export async function signUpAction(
    prevState: AuthActionState,
    formData: FormData
)
    : Promise<AuthActionState> {
    const rawData = {
        name: getString(formData, "name"),
        email: getString(formData, "signup-email"),
        password: getString(formData, "password"),
    }
    const parsed = signUpSchema.safeParse(rawData);
    if (!parsed.success) {
        const tree = z.treeifyError(parsed.error)
        return {
            success: false,
            message: "Input validations failed. Try again!",
            errors: Object.fromEntries(
                Object.entries(tree.properties ?? {}).map(([key, val]) => [key, val?.errors ?? []])
            ),
            values: rawData
        };
    }
    const { name, email, password } = parsed.data;
    let res;
    try {
        res = await auth.api.signUpEmail({
            body: { name, email, password },
            headers: await headers(),
        })
        console.log("---Response", res)
    } catch (err: unknown) {
        let message = "Signup failed";

        if (err instanceof Error) {
            if (err.message.toLowerCase().includes("exists")) {
                return {
                    success: false,
                    message: "Email already exists",
                    errors: { email: ["Email already registered"] },
                    values: rawData,
                };
            }

            message = err.message;
        }

        return {
            success: false,
            message,
        };
    }
    if (!res) {
        return {
            success: false,
            message: "Please fill the required data!",
        }
    }
    return {
        success: true,
        message: "Welcome aboard"
    }
}


export async function signInAction(
    prevState: AuthActionState,
    formData: FormData
): Promise<AuthActionState> {

    const rawData = {
        email: getString(formData, "signin-email"),
        password: getString(formData, "password")
    }
    const parsed = signInSchema.safeParse(rawData);
    if (!parsed.success) {
        const tree = z.treeifyError(parsed.error)
        return {
            success: false,
            message: "Validation Failed. Please fix the errors",
            errors: Object.fromEntries(
                Object.entries(tree.properties ?? {}).map(([key, val]) => [key, val?.errors ?? []])
            ),
            values: rawData
        };
    }
    const { email, password } = parsed.data;
    let res;
    try {
        res = await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
        })
        console.log("---Response", res)

    } catch (err: unknown) {
        let message = "Invalid Credentials."

        if (err instanceof Error) {
            message = err.message
        }
        return {
            success: false,
            message,
            errors: {
                password: ["Invalid email or password"],
            },
            values: rawData,
        }

    }
    if (!res) {
        return {
            success: false,
            message: "Sign In Failed!. Please try again.",
        }
    }
    return {
        success: true,
        message: "Welcome back!"
    }
}
