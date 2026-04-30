// app/dashboard/page.tsx

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchTodosAction } from "@/actions/todosAction";
import { DashboardShell } from "@/components/TodoApp/DashboardShell";

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) redirect("/login");

    const result = await fetchTodosAction();
    const initialTodos = result.success ? result.data : [];

    return (
        <DashboardShell
            initialTodos={initialTodos}
            userName={session.user.name ?? undefined}
            userEmail={session.user.email}
            userImage={session.user.image ?? null}
        />
    );
}
