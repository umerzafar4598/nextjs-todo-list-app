
import { auth } from "@/lib/auth";
import AuthPageClient from "./AuthPageClient"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthPage = async () => {

    const session = await auth.api.getSession({ headers: await headers() })
    if (session) redirect("/dashboard");
    return <AuthPageClient />;
}

export default AuthPage
