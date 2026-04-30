import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request);

    const isAuthPage = request.nextUrl.pathname.startsWith("/login")

    const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

    if (!session && isProtectedPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
    ],
};